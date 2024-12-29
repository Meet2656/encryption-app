# encryption-app
A simple encryption app built using Flask (Python) and React, enabling users to securely encrypt and decrypt messages using symmetric encryption with Fernet. The app provides a user-friendly interface for generating encryption keys, encrypting messages, and decrypting them securely. Ideal for learning and practicing basic encryption concepts.

## Prerequisites
- Python (3.6+)
- Flask - For backend API
- React - For frontend user interface
- Base64 - Required for encoding encrypted messages

## Features
- Generate secure encryption keys
- Encrypt messages using Fernet symmetric encryption
- Decrypt messages with the correct key
- User-friendly web interface
- Real-time error handling and feedback

## Technologies Used

### Backend
- Python 3.x
- Flask: Web framework for the API
- Flask-CORS: Handling Cross-Origin Resource Sharing
- cryptography: For encryption and decryption operations

### Frontend
- React: UI library for building the user interface
- Next.js: React framework for server-side rendering and routing
- Tailwind CSS: Utility-first CSS framework for styling
- shadcn/ui: React components built with Radix UI and Tailwind

## Usage
- Open your browser and go to https://vnspobxfkbwz8shd.vercel.app/ to access the app.
- Make sure your backend is running then go to http://127.0.0.1:5000/generate-key.
- Use the "Generate Key" button in app to create a new encryption key.
- Enter a message, choose to encrypt or decrypt, and view the results.

### Encryption
- Enter your message and the encryption key.
- Click "Encrypt" to generate the encrypted message.
- The encrypted message will be displayed and can be copied.

### Decryption
- Enter the previously encrypted message and the corresponding key.
- Click "Decrypt" to get the original message.

## License
This project is licensed under the MIT License.

## Contact & Support
For any issues or questions, please reach out to:
Meet Soni - meetsony1111@gmail.com
