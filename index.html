from flask import Flask, render_template, request, jsonify
from ultralytics import YOLO
from PIL import Image
import io

app = Flask(__name__)
model = None

def get_model():
    global model
    if model is None:
        model = YOLO('yolov8n.pt')
    return model

@app.get('/')
def home():
    return render_template('index.html')

@app.get('/api/health')
def health():
    return jsonify(status='ok')

@app.post('/api/detect')
def detect():
    file = request.files.get('image')
    if not file:
        return jsonify(error='Please upload an image'), 400
    try:
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        results = get_model().predict(image, conf=0.3, verbose=False)[0]
        detections = []
        for box in results.boxes:
            idx = int(box.cls[0])
            detections.append({
                'label': results.names[idx],
                'confidence': round(float(box.conf[0]), 3),
                'box': [round(float(v), 1) for v in box.xyxy[0].tolist()]
            })
        return jsonify(detections=detections, width=image.width, height=image.height,
                       note='Object detection only. Results do not establish a safety threat.')
    except Exception as exc:
        return jsonify(error=f'Could not process image: {exc}'), 400

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
