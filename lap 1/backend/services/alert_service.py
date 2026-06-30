"""Alert Service for notifications"""

class AlertService:
    """Service สำหรับแจ้งเตือน"""
    
    # Alert thresholds
    ALERT_THRESHOLDS = {
        'high_usage': 75,  # % of limit
        'very_high_usage': 90,
        'unusual_pattern': 120,  # % increase from average
    }
    
    @staticmethod
    def check_usage_alert(current_usage, limit):
        """ตรวจสอบแจ้งเตือนการใช้น้ำสูง"""
        percentage = (current_usage / limit) * 100
        
        if percentage >= AlertService.ALERT_THRESHOLDS['very_high_usage']:
            return {
                'alert': True,
                'level': 'critical',
                'message': f'การใช้น้ำเกินขีดจำกัด: {percentage:.1f}%'
            }
        elif percentage >= AlertService.ALERT_THRESHOLDS['high_usage']:
            return {
                'alert': True,
                'level': 'warning',
                'message': f'การใช้น้ำสูง: {percentage:.1f}%'
            }
        
        return {
            'alert': False,
            'level': 'normal',
            'message': 'การใช้น้ำปกติ'
        }
    
    @staticmethod
    def check_leak_alert(daily_usage_trend):
        """ตรวจสอบแจ้งเตือนรั่วไหล"""
        if not daily_usage_trend or len(daily_usage_trend) < 2:
            return {'alert': False}
        
        # Compare recent usage with average
        recent = sum(daily_usage_trend[-7:]) / 7  # Last 7 days average
        historical = sum(daily_usage_trend[:-7]) / len(daily_usage_trend[:-7]) if len(daily_usage_trend) > 7 else recent
        
        increase_percent = ((recent - historical) / historical) * 100 if historical > 0 else 0
        
        if increase_percent > AlertService.ALERT_THRESHOLDS['unusual_pattern']:
            return {
                'alert': True,
                'level': 'warning',
                'message': f'ตรวจพบการเพิ่มขึ้นของการใช้น้ำ: {increase_percent:.1f}%'
            }
        
        return {'alert': False}
