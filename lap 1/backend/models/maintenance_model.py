"""Maintenance Model for database"""

class MaintenanceModel:
    """Model สำหรับบันทึกการบำรุงรักษา"""
    
    def __init__(self, id=None, meter_id=None, date=None, description=None, status=None, technician=None):
        self.id = id
        self.meter_id = meter_id
        self.date = date
        self.description = description
        self.status = status  # pending, in-progress, completed
        self.technician = technician
    
    def to_dict(self):
        return {
            'id': self.id,
            'meterId': self.meter_id,
            'date': self.date,
            'description': self.description,
            'status': self.status,
            'technician': self.technician
        }
