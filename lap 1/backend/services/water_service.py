"""Water Service for business logic"""

class WaterService:
    """Service สำหรับจัดการข้อมูลการใช้น้ำ"""
    
    @staticmethod
    def calculate_consumption(start_volume, end_volume):
        """คำนวณปริมาณการใช้น้ำ"""
        return max(0, end_volume - start_volume)
    
    @staticmethod
    def calculate_average_daily_usage(total_volume, days):
        """คำนวณการใช้น้ำเฉลี่ยต่อวัน"""
        if days <= 0:
            return 0
        return total_volume / days
    
    @staticmethod
    def estimate_billing(volume, rate_per_cubic_meter):
        """คำนวณค่าน้ำ"""
        return volume * rate_per_cubic_meter
