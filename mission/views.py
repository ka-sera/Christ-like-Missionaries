from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMessage, send_mail
from django.db.models import Avg, Max, Sum
from django.utils import timezone

from rest_framework import filters, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    UserProfile,
    Missionary,
    Mission,
    Donation,
    PrayerRequest,
)

from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    MissionarySerializer,
    MissionDetailSerializer,
    MissionListSerializer,
    DonationSerializer,
    ContactMessageSerializer,
    PrayerRequestSerializer,
)


# ============================================================
# USER VIEWSET
# ============================================================

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for user management and authentication.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.SearchFilter]
    search_fields = [
        "username",
        "email",
        "first_name",
        "last_name",
    ]

    def get_permissions(self):
        """
        Allow anyone to register.
        All other user actions require authentication.
        """

        if self.action == "register":
            return [AllowAny()]

        return [IsAuthenticated()]

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[AllowAny],
    )
    def register(self, request):
        """
        Register a new user.
        """

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            # Create the user's profile.
            UserProfile.objects.get_or_create(
                user=user,
                defaults={
                    "role": "supporter",
                },
            )

            # Generate authentication token.
            token, _ = Token.objects.get_or_create(
                user=user
            )

            # Notify the ministry registration email.
            try:
                send_mail(
                    subject="New Christ-Like Missionaries Registration",
                    message=(
                        "A new user has registered on the "
                        "Christ-Like Missionaries website.\n\n"
                        f"Username: {user.username}\n"
                        f"Email: {user.email}\n"
                        f"First Name: {user.first_name}\n"
                        f"Last Name: {user.last_name}\n\n"
                        "The user account has been successfully created."
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[
                        "register@christ-likemissionaries.org"
                    ],
                    fail_silently=True,
                )

            except Exception as exc:
                print(
                    f"Registration notification email failed: {exc}"
                )

            return Response(
                {
                    "user": serializer.data,
                    "token": token.key,
                    "message": "User registered successfully",
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[IsAuthenticated],
    )
    def change_password(self, request):
        """
        Change the authenticated user's password.
        """

        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password:
            return Response(
                {
                    "error": "Old password is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not new_password:
            return Response(
                {
                    "error": "New password is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.check_password(old_password):
            return Response(
                {
                    "error": "Old password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response(
            {
                "message": "Password changed successfully."
            },
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[IsAuthenticated],
    )
    def me(self, request):
        """
        Return the currently authenticated user.
        """

        serializer = UserSerializer(request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


# ============================================================
# USER PROFILE VIEWSET
# ============================================================

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for UserProfile management.
    """

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [filters.SearchFilter]

    search_fields = [
        "user__username",
        "user__email",
        "role",
    ]

    def get_queryset(self):
        """
        Staff users can view all profiles.
        Regular users can only view their own profile.
        """

        if self.request.user.is_staff:
            return UserProfile.objects.all()

        return UserProfile.objects.filter(
            user=self.request.user
        )

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[IsAuthenticated],
    )
    def my_profile(self, request):
        """
        Return the authenticated user's profile.
        """

        try:
            profile = UserProfile.objects.get(
                user=request.user
            )

            serializer = UserProfileSerializer(profile)

            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        except UserProfile.DoesNotExist:
            return Response(
                {
                    "error": "Profile not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )


# ============================================================
# MISSIONARY VIEWSET
# ============================================================

class MissionaryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for missionary management.
    """

    queryset = Missionary.objects.filter(
        is_active=True
    )

    serializer_class = MissionarySerializer
    permission_classes = [AllowAny]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "name",
        "email",
        "location",
        "specialization",
    ]

    ordering_fields = [
        "created_at",
        "name",
    ]

    ordering = ["-created_at"]

    def perform_create(self, serializer):
        """
        Create a missionary.
        """

        serializer.save()

    def perform_update(self, serializer):
        """
        Update a missionary.
        """

        missionary = serializer.instance

        if (
            self.request.user.is_staff
            or self.request.user == missionary.user
        ):
            serializer.save()

    @action(
        detail=True,
        methods=["get"],
    )
    def missions(self, request, pk=None):
        """
        Return all missions belonging to a missionary.
        """

        missionary = self.get_object()

        missions = missionary.missions.all()

        serializer = MissionListSerializer(
            missions,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


# ============================================================
# MISSION VIEWSET
# ============================================================

class MissionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for mission management.
    """

    queryset = Mission.objects.all()

    serializer_class = MissionListSerializer

    permission_classes = [AllowAny]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "title",
        "description",
        "location",
        "missionary__name",
    ]

    ordering_fields = [
        "start_date",
        "created_at",
        "target_amount",
    ]

    ordering = ["-start_date"]

    def get_serializer_class(self):
        """
        Use the detailed serializer for individual missions.
        Use the list serializer elsewhere.
        """

        if self.action == "retrieve":
            return MissionDetailSerializer

        return MissionListSerializer

    def perform_create(self, serializer):
        """
        Create a mission.
        """

        serializer.save()

    def perform_update(self, serializer):
        """
        Update a mission.
        """

        mission = serializer.instance

        if (
            self.request.user.is_staff
            or (
                hasattr(mission, "missionary")
                and mission.missionary
                and self.request.user == mission.missionary.user
            )
        ):
            serializer.save()

    @action(
        detail=True,
        methods=["get"],
    )
    def donations(self, request, pk=None):
        """
        Return all donations associated with a mission.
        """

        mission = self.get_object()

        donations = mission.donations.all()

        serializer = DonationSerializer(
            donations,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["get"],
    )
    def active(self, request):
        """
        Return all active missions.
        """

        missions = Mission.objects.filter(
            status="active"
        )

        serializer = MissionListSerializer(
            missions,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["get"],
    )
    def completed(self, request):
        """
        Return all completed missions.
        """

        missions = Mission.objects.filter(
            status="completed"
        )

        serializer = MissionListSerializer(
            missions,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=True,
        methods=["get"],
    )
    def statistics(self, request, pk=None):
        """
        Return statistics for an individual mission.
        """

        mission = self.get_object()

        donations = mission.donations.all()

        average_donation = donations.aggregate(
            Avg("amount")
        )["amount__avg"] or 0

        largest_donation = donations.aggregate(
            Max("amount")
        )["amount__max"] or 0

        return Response(
            {
                "mission_id": mission.id,
                "mission_title": mission.title,
                "total_donations": donations.count(),
                "total_amount": float(
                    mission.total_donated()
                ),
                "target_amount": float(
                    mission.target_amount
                ),
                "progress_percentage": (
                    mission.progress_percentage()
                ),
                "average_donation": float(
                    average_donation
                ),
                "largest_donation": float(
                    largest_donation
                ),
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# DONATION VIEWSET
# ============================================================

class DonationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for donation management.
    """

    queryset = Donation.objects.all()

    serializer_class = DonationSerializer

    permission_classes = [AllowAny]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "supporter_name",
        "supporter_email",
        "mission__title",
    ]

    ordering_fields = [
        "amount",
        "created_at",
    ]

    ordering = ["-created_at"]

    def perform_create(self, serializer):
        """
        Create a donation.
        """

        serializer.save()

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[IsAuthenticated],
    )
    def my_donations(self, request):
        """
        Return donations belonging to the authenticated user.
        """

        donations = Donation.objects.filter(
            supporter=request.user
        )

        serializer = DonationSerializer(
            donations,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=["get"],
    )
    def statistics(self, request):
        """
        Return overall donation statistics.
        """

        donations = Donation.objects.all()

        total_amount = donations.aggregate(
            Sum("amount")
        )["amount__sum"] or 0

        average_donation = donations.aggregate(
            Avg("amount")
        )["amount__avg"] or 0

        largest_donation = donations.aggregate(
            Max("amount")
        )["amount__max"] or 0

        unique_donors = (
            donations
            .filter(supporter__isnull=False)
            .values("supporter")
            .distinct()
            .count()
        )

        return Response(
            {
                "total_donations": donations.count(),
                "total_amount": float(total_amount),
                "average_donation": float(
                    average_donation
                ),
                "largest_donation": float(
                    largest_donation
                ),
                "unique_donors": unique_donors,
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# CONTACT MESSAGE API
# ============================================================

class ContactMessageView(APIView):
    """
    Accept public contact form submissions
    and email the ministry inbox.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        """
        Submit a contact message.
        """

        serializer = ContactMessageSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = serializer.validated_data

        recipient = (
            getattr(
                settings,
                "CONTACT_RECEIVER_EMAIL",
                None,
            )
            or getattr(
                settings,
                "EMAIL_HOST_USER",
                None,
            )
        )

        if not recipient:
            return Response(
                {
                    "error": (
                        "Contact email is not "
                        "configured on the server."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        phone = data.get("phone") or "Not provided"

        subject = (
            f"Website Contact: {data['subject']}"
        )

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
            reply_to=[data["email"]],
        )

        email.send(
            fail_silently=False
        )

        return Response(
            {
                "message": (
                    "Your message has been "
                    "sent successfully."
                )
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# PRAYER REQUEST API
# ============================================================

class PrayerRequestView(APIView):
    """
    Accept public prayer requests,
    save them, and email the prayer room.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        """
        Submit a prayer request.
        """

        serializer = PrayerRequestSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = serializer.validated_data

        prayer_request = serializer.save()

        recipient = (
            "prayerroom@christ-likemissionaries.org"
        )

        subject = (
            f"New Prayer Request from {data['name']}"
        )

        phone = data.get("phone") or "Not provided"

        privacy = (
            "Private"
            if data.get("is_private")
            else "Public"
        )

        body = (
            "New prayer request submitted through "
            "the Christ-Like Missionaries website.\n\n"
            f"Name: {data['name']}\n"
            f"Email: {data['email']}\n"
            f"Phone: {phone}\n"
            f"Privacy: {privacy}\n"
            f"Submitted: {prayer_request.created_at}\n\n"
            "Prayer Request:\n"
            f"{data['request']}\n\n"
            "Please keep this request in prayer."
        )

        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient],
            reply_to=[data["email"]],
        )

        email.send(
            fail_silently=False
        )

        return Response(
            {
                "message": (
                    "Your prayer request has been "
                    "received. Thank you for allowing "
                    "us to pray with you."
                )
            },
            status=status.HTTP_201_CREATED,
        )


# ============================================================
# ADMIN DASHBOARD API
# ============================================================

class AdminDashboardView(APIView):
    """
    Dashboard data for ministry administrators only.
    """

    permission_classes = [IsAdminUser]

    def get(self, request):
        """
        Return administrator dashboard statistics
        and recently registered users.
        """

        now = timezone.now()

        seven_days_ago = (
            now - timedelta(days=7)
        )

        users = User.objects.all().order_by(
            "-date_joined"
        )

        total_users = users.count()

        active_users = users.filter(
            is_active=True
        ).count()

        staff_users = users.filter(
            is_staff=True
        ).count()

        new_users = users.filter(
            date_joined__gte=seven_days_ago
        ).count()

        recent_users = []

        for user in users[:10]:

            profile = (
                UserProfile.objects
                .filter(user=user)
                .first()
            )

            recent_users.append(
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "date_joined": user.date_joined,
                    "last_login": user.last_login,
                    "is_active": user.is_active,
                    "is_staff": user.is_staff,
                    "role": (
                        profile.role
                        if profile
                        else "supporter"
                    ),
                }
            )

        return Response(
            {
                "statistics": {
                    "total_users": total_users,
                    "active_users": active_users,
                    "staff_users": staff_users,
                    "new_users": new_users,
                },
                "recent_users": recent_users,
            },
            status=status.HTTP_200_OK,
        )