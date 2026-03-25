from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.db.models import Q, Sum, Avg, Max
from django.conf import settings
from django.core.mail import EmailMessage
from .models import UserProfile, Missionary, Mission, Donation
from .serializers import (
    UserSerializer, UserProfileSerializer, MissionarySerializer,
    MissionDetailSerializer, MissionListSerializer, DonationSerializer,
    ContactMessageSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User management and authentication"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        """Register a new user"""
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Create user profile with default role
            UserProfile.objects.create(user=user, role='supporter')
            # Generate token
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'user': serializer.data,
                'token': token.key,
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """Change user password"""
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get current user profile"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for UserProfile management"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username', 'user__email', 'role']

    def get_queryset(self):
        """Filter profiles based on user permissions"""
        if self.request.user.is_staff:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_profile(self, request):
        """Get current user's profile"""
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


class MissionaryViewSet(viewsets.ModelViewSet):
    """ViewSet for Missionary management"""
    queryset = Missionary.objects.filter(is_active=True)
    serializer_class = MissionarySerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'location', 'specialization']
    ordering_fields = ['created_at', 'name']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        """Create missionary and link to user if provided"""
        serializer.save()

    def perform_update(self, serializer):
        """Update missionary"""
        if self.request.user.is_staff or self.request.user == serializer.instance.user:
            serializer.save()

    @action(detail=True, methods=['get'])
    def missions(self, request, pk=None):
        """Get all missions for a specific missionary"""
        missionary = self.get_object()
        missions = missionary.missions.all()
        serializer = MissionListSerializer(missions, many=True)
        return Response(serializer.data)


class MissionViewSet(viewsets.ModelViewSet):
    """ViewSet for Mission management"""
    queryset = Mission.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location', 'missionary__name']
    ordering_fields = ['start_date', 'created_at', 'target_amount']
    ordering = ['-start_date']

    def get_serializer_class(self):
        """Use different serializers for list and detail views"""
        if self.action == 'retrieve':
            return MissionDetailSerializer
        return MissionListSerializer

    def perform_create(self, serializer):
        """Create mission"""
        serializer.save()

    def perform_update(self, serializer):
        """Update mission - only by staff or missionary owner"""
        mission = self.get_object()
        if self.request.user.is_staff or self.request.user == mission.missionary.user:
            serializer.save()

    @action(detail=True, methods=['get'])
    def donations(self, request, pk=None):
        """Get all donations for a mission"""
        mission = self.get_object()
        donations = mission.donations.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active missions"""
        missions = Mission.objects.filter(status='active')
        serializer = MissionListSerializer(missions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def completed(self, request):
        """Get all completed missions"""
        missions = Mission.objects.filter(status='completed')
        serializer = MissionListSerializer(missions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        """Get mission statistics"""
        mission = self.get_object()
        donations = mission.donations.all()
        return Response({
            'mission_id': mission.id,
            'mission_title': mission.title,
            'total_donations': mission.donations.count(),
            'total_amount': float(mission.total_donated()),
            'target_amount': float(mission.target_amount),
            'progress_percentage': mission.progress_percentage(),
            'average_donation': float(donations.aggregate(Avg('amount'))['amount__avg'] or 0),
            'largest_donation': float(donations.aggregate(Max('amount'))['amount__max'] or 0),
        })


class DonationViewSet(viewsets.ModelViewSet):
    """ViewSet for Donation management"""
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['supporter_name', 'supporter_email', 'mission__title']
    ordering_fields = ['amount', 'created_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        """Create donation"""
        donation = serializer.save()
        return donation

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def my_donations(self, request):
        """Get current user's donations"""
        donations = Donation.objects.filter(supporter=request.user)
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get donation statistics"""
        donations = Donation.objects.all()
        return Response({
            'total_donations': donations.count(),
            'total_amount': float(donations.aggregate(Sum('amount'))['amount__sum'] or 0),
            'average_donation': float(donations.aggregate(Avg('amount'))['amount__avg'] or 0),
            'largest_donation': float(donations.aggregate(Max('amount'))['amount__max'] or 0),
            'unique_donors': donations.filter(supporter__isnull=False).values('supporter').distinct().count(),
        })


class ContactMessageView(APIView):
    """Accept public contact form submissions and email the ministry inbox."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        recipient = settings.CONTACT_RECEIVER_EMAIL or settings.EMAIL_HOST_USER
        if not recipient:
            return Response(
                {'error': 'Contact email is not configured on the server.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        phone = data.get('phone') or 'Not provided'
        subject = f"Website Contact: {data['subject']}"
        body = (
            f"Name: {data['name']}\n"
            f"Email: {data['email']}\n"
            f"Phone: {phone}\n\n"
            f"Message:\n{data['message']}"
        )

        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient],
            reply_to=[data['email']],
        )
        email.send(fail_silently=False)

        return Response({'message': 'Your message has been sent successfully.'}, status=status.HTTP_200_OK)

