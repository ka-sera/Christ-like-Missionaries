from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Missionary, Mission, Donation


class UserSerializer(serializers.ModelSerializer):
    """Serializer for Django User model"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile model"""
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'user_id', 'role', 'bio', 'phone', 'photo', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class MissionarySerializer(serializers.ModelSerializer):
    """Serializer for Missionary model"""
    class Meta:
        model = Missionary
        fields = [
            'id', 'user', 'name', 'email', 'phone', 'bio', 'photo',
            'location', 'specialization', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class DonationSerializer(serializers.ModelSerializer):
    """Serializer for Donation model"""
    supporter_username = serializers.CharField(source='supporter.username', read_only=True)

    class Meta:
        model = Donation
        fields = [
            'id', 'mission', 'supporter', 'supporter_username', 'supporter_name',
            'supporter_email', 'amount', 'message', 'transaction_id',
            'is_anonymous', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class MissionDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for Mission model with donations"""
    missionary = MissionarySerializer(read_only=True)
    donations = DonationSerializer(many=True, read_only=True)
    total_donated = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()
    donation_count = serializers.SerializerMethodField()

    class Meta:
        model = Mission
        fields = [
            'id', 'title', 'description', 'missionary', 'start_date', 'end_date',
            'status', 'location', 'target_amount', 'image', 'donations',
            'total_donated', 'progress_percentage', 'donation_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_total_donated(self, obj):
        return float(obj.total_donated())

    def get_progress_percentage(self, obj):
        return obj.progress_percentage()

    def get_donation_count(self, obj):
        return obj.donations.count()


class MissionListSerializer(serializers.ModelSerializer):
    """List serializer for Mission model (minimal fields)"""
    missionary_name = serializers.CharField(source='missionary.name', read_only=True)
    total_donated = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Mission
        fields = [
            'id', 'title', 'missionary', 'missionary_name', 'start_date',
            'end_date', 'status', 'location', 'target_amount', 'image',
            'total_donated', 'progress_percentage', 'created_at'
        ]
        read_only_fields = ['created_at']

    def get_total_donated(self, obj):
        return float(obj.total_donated())

    def get_progress_percentage(self, obj):
        return obj.progress_percentage()
