from flask import Blueprint, jsonify, request

history_bp = Blueprint('history', __name__, url_prefix='/history')

# Mock data for demo
history_data = [
    {
        'id': 1,
        'householdId': 1,
        'date': '2024-06-20',
        'event': 'Water reading recorded',
        'volume': 150.5,
        'previousVolume': 148.2
    },
    {
        'id': 2,
        'householdId': 1,
        'date': '2024-06-19',
        'event': 'Meter maintenance',
        'volume': 148.2,
        'previousVolume': 145.8
    }
]

@history_bp.route('/', methods=['GET'])
def get_history():
    """ดึงประวัติการใช้น้ำ"""
    householdId = request.args.get('householdId')
    start = request.args.get('start')
    end = request.args.get('end')
    
    filtered_history = history_data
    
    if householdId:
        filtered_history = [h for h in filtered_history if str(h['householdId']) == str(householdId)]
    
    # TODO: Filter by date range if needed
    
    return jsonify({
        'success': True,
        'count': len(filtered_history),
        'data': filtered_history
    })

@history_bp.route('/<int:history_id>', methods=['GET'])
def get_history_detail(history_id):
    """ดึงรายละเอียดประวัติ"""
    history = next((h for h in history_data if h['id'] == history_id), None)
    
    if not history:
        return jsonify({'error': 'History record not found'}), 404
    
    return jsonify({
        'success': True,
        'data': history
    })

@history_bp.route('/', methods=['POST'])
def create_history_record():
    """สร้างบันทึกประวัติใหม่"""
    data = request.get_json()
    
    # Validation
    if not data or 'householdId' not in data or 'event' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create new record
    new_record = {
        'id': len(history_data) + 1,
        'householdId': data['householdId'],
        'date': data.get('date', '2024-06-20'),
        'event': data['event'],
        'volume': data.get('volume', 0),
        'previousVolume': data.get('previousVolume', 0)
    }
    
    history_data.append(new_record)
    
    return jsonify({
        'success': True,
        'message': 'History record created successfully',
        'data': new_record
    }), 201
