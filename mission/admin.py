from django.contrib import admin
from .models import UserProfile, Missionary, Mission, Donation


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'phone', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['user__username', 'user__email', 'phone']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Profile Details', {
            'fields': ('role', 'bio', 'phone', 'photo')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Missionary)
class MissionaryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at', 'location']
    search_fields = ['name', 'email', 'location', 'specialization']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'email', 'phone', 'user')
        }),
        ('Details', {
            'fields': ('bio', 'location', 'specialization', 'photo')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ['title', 'missionary', 'status', 'start_date', 'target_amount', 'total_donated']
    list_filter = ['status', 'start_date', 'created_at']
    search_fields = ['title', 'description', 'location', 'missionary__name']
    readonly_fields = ['created_at', 'updated_at', 'total_donated', 'progress_percentage']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'missionary')
        }),
        ('Dates & Status', {
            'fields': ('start_date', 'end_date', 'status')
        }),
        ('Fundraising', {
            'fields': ('target_amount', 'total_donated', 'progress_percentage')
        }),
        ('Details', {
            'fields': ('location', 'image')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['supporter_name', 'amount', 'mission', 'is_anonymous', 'created_at']
    list_filter = ['is_anonymous', 'created_at', 'mission']
    search_fields = ['supporter_name', 'supporter_email', 'mission__title', 'transaction_id']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Donation Information', {
            'fields': ('mission', 'amount', 'transaction_id')
        }),
        ('Supporter Details', {
            'fields': ('supporter', 'supporter_name', 'supporter_email', 'is_anonymous')
        }),
        ('Message', {
            'fields': ('message',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
