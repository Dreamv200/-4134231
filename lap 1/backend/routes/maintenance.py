from flask import Blueprint, jsonify, request
from datetime import datetime

maintenance_bp = Blueprint('maintenance', __name__, url_prefix='/maintenance')

# Mock data for demo
maintenance_logs = [
    {
        'id': 1,
        'meterId': 1,
        'date': '2024-06-20',
        'description': 'ซ่อมมิเตอร์บ้าน #001',
        'status': 'completed',
        'technician': 'สมชาย'
    },
    {
        'id': 2,
        'meterId': 2,
        'date': '2024-06-18',
        'description': 'ตรวจสอบระบบท่อ',
        'status': 'completed',
        'technician': 'สมหวัง'
    }
]

@maintenance_bp.route('/', methods=['GET'])
def get_maintenance_logs():
    """ดึงบันทึกการบำรุงรักษาทั้งหมด"""
    status = request.args.get('status')
    
    filtered_logs = maintenance_logs
    if status:
        filtered_logs = [log for log in filtered_logs if log['status'] == status]
    
    return jsonify({
        'success': True,
        'count': len(filtered_logs),
        'data': filtered_logs
    })

@maintenance_bp.route('/<int:log_id>', methods=['GET'])
def get_maintenance_detail(log_id):
    """ดึงบันทึกการบำรุงรักษาตามรหัส"""
    log = next((l for l in maintenance_logs if l['id'] == log_id), None)
    
    if not log:
        return jsonify({'error': 'Maintenance log not found'}), 404
    
    return jsonify({
        'success': True,
        'data': log
    })

@maintenance_bp.route('/', methods=['POST'])
def create_maintenance_log():
    """สร้างบันทึกการบำรุงรักษาใหม่"""
    data = request.get_json()
    
    # Validation
    if not data or 'description' not in data or 'meterId' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create new record
    new_log = {
        'id': len(maintenance_logs) + 1,
        'meterId': data['meterId'],
        'date': data.get('date', datetime.now().strftime('%Y-%m-%d')),
        'description': data['description'],
        'status': data.get('status', 'pending'),
        'technician': data.get('technician', 'Unknown')
    }
    
    maintenance_logs.append(new_log)
    
    return jsonify({
        'success': True,
        'message': 'Maintenance log created successfully',
        'data': new_log
    }), 201

@maintenance_bp.route('/<int:log_id>', methods=['PUT'])
def update_maintenance_log(log_id):
    """แก้ไขบันทึกการบำรุงรักษา"""
    log = next((l for l in maintenance_logs if l['id'] == log_id), None)
    
    if not log:
        return jsonify({'error': 'Maintenance log not found'}), 404
    
    data = request.get_json()
    log.update(data)
    
    return jsonify({
        'success': True,
        'message': 'Maintenance log updated successfully',
        'data': log
    })

@maintenance_bp.route('/<int:log_id>', methods=['DELETE'])
def delete_maintenance_log(log_id):
    """ลบบันทึกการบำรุงรักษา"""
    global maintenance_logs
    log = next((l for l in maintenance_logs if l['id'] == log_id), None)
    
    if not log:
        return jsonify({'error': 'Maintenance log not found'}), 404
    
    maintenance_logs = [l for l in maintenance_logs if l['id'] != log_id]
    
    return jsonify({
        'success': True,
        'message': 'Maintenance log deleted successfully'
    })
