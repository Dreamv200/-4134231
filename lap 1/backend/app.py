from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Import routes
from routes.water import water_bp
from routes.maintenance import maintenance_bp
from routes.history import history_bp

# Register blueprints
app.register_blueprint(water_bp, url_prefix='/api')
app.register_blueprint(maintenance_bp, url_prefix='/api')
app.register_blueprint(history_bp, url_prefix='/api')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'Water Management Backend',
        'version': '1.0.0'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested endpoint does not exist'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal Server Error',
        'message': str(error)
    }), 500

if __name__ == '__main__':
    debug = os.getenv('FLASK_ENV') == 'development'
    port = int(os.getenv('FLASK_PORT', 5000))
    app.run(debug=debug, port=port, host='0.0.0.0')
