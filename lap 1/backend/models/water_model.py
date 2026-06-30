"""Water Model for database"""

class WaterModel:
    """Model สำหรับข้อมูลการใช้น้ำ"""
    
    def __init__(self, id=None, household_id=None, meter_id=None, timestamp=None, volume=None):
        self.id = id
        self.household_id = household_id
        self.meter_id = meter_id
        self.timestamp = timestamp
        self.volume = volume
    
    def to_dict(self):
        return {
            'id': self.id,
            'householdId': self.household_id,
            'meterId': self.meter_id,
            'timestamp': self.timestamp,
            'volume': self.volume,
            'unit': 'm³'
        }
