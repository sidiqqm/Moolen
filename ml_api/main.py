from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from datetime import datetime
from PIL import Image
import io
import mysql.connector

# Load model dan face detector
model = load_model('model/ResNet50V2_Model.h5')
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Label mapping
labels_dict = {
    0: 'Angry', 1: 'Disgust', 2: 'Fear',
    3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'
}

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'virgie04',   
    'database': 'klien_db'   
}

def insert_mood_to_db(mood, confidence, timestamp):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = "INSERT INTO mood_records (mood, confidence, timestamp) VALUES (%s, %s, %s)"
        values = (mood, confidence, timestamp)
        cursor.execute(query, values)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        raise Exception(f"MySQL Error: {str(e)}")

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    image_bytes = file.read()

    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img_np = np.array(image)
        frame = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, 1.3, 3)
        if len(faces) == 0:
            return jsonify({'error': 'No face detected'}), 400

        x, y, w, h = faces[0]
        face = frame[y:y+h, x:x+w]
        resized = cv2.resize(cv2.cvtColor(face, cv2.COLOR_BGR2RGB), (224, 224))
        normalized = resized / 255.0
        reshaped = np.reshape(normalized, (1, 224, 224, 3))

        result = model.predict(reshaped)
        label = int(np.argmax(result))
        confidence = float(np.max(result))
        mood = labels_dict[label]
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return jsonify({
            'mood': mood,
            'confidence': round(confidence * 100, 2),
            'timestamp': timestamp
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/save-mood', methods=['POST'])
def save_mood():
    data = request.get_json()
    if not data or 'mood' not in data or 'timestamp' not in data:
        return jsonify({'error': 'Missing mood or timestamp'}), 400

    try:
        mood = data['mood']
        confidence = data.get('confidence', None)  # optional
        timestamp = data['timestamp']

        insert_mood_to_db(mood, confidence, timestamp)
        return jsonify({'message': 'Mood saved to database'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)