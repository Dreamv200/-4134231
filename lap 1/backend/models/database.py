"""Database connection helper"""
import sqlite3
from contextlib import contextmanager

class Database:
    """Database connection manager"""
    
    def __init__(self, db_path='water_management.db'):
        self.db_path = db_path
    
    @contextmanager
    def get_connection(self):
        """Context manager สำหรับการเชื่อมต่อ database"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()
    
    def init_db(self):
        """Initialize database tables"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            # Create tables
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS households (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    address TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS meters (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    serial TEXT UNIQUE NOT NULL,
                    household_id INTEGER NOT NULL,
                    installed_at TIMESTAMP,
                    FOREIGN KEY (household_id) REFERENCES households(id)
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS readings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    meter_id INTEGER NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    volume REAL NOT NULL,
                    FOREIGN KEY (meter_id) REFERENCES meters(id)
                )
            ''')

# Global database instance
db = Database()
