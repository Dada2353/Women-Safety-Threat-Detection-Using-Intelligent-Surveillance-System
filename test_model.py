from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Print model information
print("Model loaded successfully!")
print("Detection classes:", model.names)