from flask import Flask, request, jsonify
from flask_cors import CORS
from cryptography.fernet import Fernet
import base64

app = Flask(__name__)
CORS(app)

@app.route('/generate-key', methods=['GET'])
def generate_key():
    """Generate a random encryption key."""
    key = Fernet.generate_key()
    return jsonify({"key": key.decode()})

@app.route('/encrypt', methods=['POST'])
def encrypt():
    """Encrypt a message using the provided key."""
    data = request.json
    message = data.get('message')
    key = data.get('key')
    
    if not message or not key:
        return jsonify({"error": "Message and key are required"}), 400
    
    try:
        f = Fernet(key.encode())
        encrypted_message = f.encrypt(message.encode())
        return jsonify({"encrypted": base64.urlsafe_b64encode(encrypted_message).decode()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/decrypt', methods=['POST'])
def decrypt():
    """Decrypt a message using the provided key."""
    data = request.json
    encrypted_message = data.get('encrypted')
    key = data.get('key')
    
    if not encrypted_message or not key:
        return jsonify({"error": "Encrypted message and key are required"}), 400
    
    try:
        f = Fernet(key.encode())
        decrypted_message = f.decrypt(base64.urlsafe_b64decode(encrypted_message))
        return jsonify({"decrypted": decrypted_message.decode()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)

