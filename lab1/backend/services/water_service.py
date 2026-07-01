from models.database import Database

class WaterService:
    def __init__(self, db=None):
        self.db = db or Database()

    def get_status(self):
        return self.db.water
