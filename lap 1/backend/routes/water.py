from flask import Blueprint, jsonify, request

water_bp = Blueprint('water', __name__, url_prefix='/water')

# Mock data for demo
water_data = [
    {
        'id': 1,
        'householdId': 1,
        'meterId': 1,
        'timestamp': '2024-06-20T10:30:00',
        'volume': 150.5,
        'unit': 'm³'
    },
    {
        'id': 2,
        'householdId': 1,
        'meterId': 1,
        'timestamp': '2024-06-19T10:30:00',
        'volume': 148.2,
        'unit': 'm³'
    }
]

@water_bp.route('/', methods=['GET'])
def get_water_data():
    """ดึงข้อมูลการใช้น้ำทั้งหมด"""
    householdId = request.args.get('householdId')
    start = request.args.get('start')
    end = request.args.get('end')
    
    filtered_data = water_data
    
    if householdId:
        filtered_data = [d for d in filtered_data if str(d['householdId']) == str(householdId)]
    
    return jsonify({
        'success': True,
        'count': len(filtered_data),
        'data': filtered_data
    })

@water_bp.route('/<int:water_id>', methods=['GET'])
def get_water_detail(water_id):
    """ดึงข้อมูลการใช้น้ำตามรหัส"""
    water = next((d for d in water_data if d['id'] == water_id), None)
    
    if not water:
        return jsonify({'error': 'Water data not found'}), 404
    
    return jsonify({
        'success': True,
        'data': water
    })

@water_bp.route('/', methods=['POST'])
def create_water_reading():
    """เพิ่มข้อมูลการใช้น้ำใหม่"""
    data = request.get_json()
    
    # Validation
    if not data or 'meterId' not in data or 'volume' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create new record
    new_record = {
        'id': len(water_data) + 1,
        'householdId': data.get('householdId', 1),
        'meterId': data['meterId'],
        'timestamp': data.get('timestamp', '2024-06-20T10:30:00'),
        'volume': data['volume'],
        'unit': 'm³'
    }
    
    water_data.append(new_record)
    
    return jsonify({
        'success': True,
        'message': 'Water reading created successfully',
        'data': new_record
    }), 201

@water_bp.route('/<int:water_id>', methods=['PUT'])
def update_water_reading(water_id):
    """แก้ไขข้อมูลการใช้น้ำ"""
    water = next((d for d in water_data if d['id'] == water_id), None)
    
    if not water:
        return jsonify({'error': 'Water data not found'}), 404
    
    data = request.get_json()
    water.update(data)
    
    return jsonify({
        'success': True,
        'message': 'Water reading updated successfully',
        'data': water
    })

@water_bp.route('/<int:water_id>', methods=['DELETE'])
def delete_water_reading(water_id):
    """ลบข้อมูลการใช้น้ำ"""
    global water_data
    water = next((d for d in water_data if d['id'] == water_id), None)
    
    if not water:
        return jsonify({'error': 'Water data not found'}), 404
    
    water_data = [d for d in water_data if d['id'] != water_id]
    
    return jsonify({
        'success': True,
        'message': 'Water reading deleted successfully'
    })
