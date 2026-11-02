# Women Safety Threat Detection Using Intelligent Surveillance System

An **educational computer-vision prototype** with a responsive browser dashboard, Flask API, and YOLOv8 object detection. Upload images or capture a webcam frame to identify common objects for human review.

> **Safety limitation:** The default pretrained `yolov8n.pt` model recognizes general objects (for example people and cars), **not** harassment, distress, assault, or dangerous behavior. Object detections are not evidence of a threat. This project is not a validated safety-monitoring or emergency-response system.

## Features
- Responsive HTML/CSS/JavaScript dashboard
- Upload an image or capture a webcam frame
- Flask API (`/api/detect`) returns labels, confidence, and bounding boxes
- Annotated bounding boxes on the image
- No persistent storage of uploaded images in this demo

## Requirements
- Python 3.10+ (64-bit recommended)
- Internet access for first-time YOLO model download
- Webcam requires localhost or HTTPS in modern browsers

## Run on Windows (PowerShell)

```powershell
cd Women-Safety-Threat-Detection-Using-Intelligent-Surveillance-System
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

If PowerShell blocks activation, run `.\.venv\Scripts\python.exe -m pip install -r requirements.txt` then `.\.venv\Scripts\python.exe app.py` instead.

Open **http://127.0.0.1:5000** in your browser.

## Folder layout

```
app.py
requirements.txt
README.md
.gitignore
templates/index.html
static/style.css
static/app.js
```

## GitHub upload

Create an empty repository first, then from the project folder:

```powershell
git init
git add .
git commit -m "Initial project"
git branch -M main
git remote add origin https://github.com/Dada2353/Women-Safety-Threat-Detection-Using-Intelligent-Surveillance-System.git
git push -u origin main
```

If the repository already has a remote, use `git remote -v` and avoid adding it twice.

## Future improvements
- Train and evaluate a specialized model on a consented, representative dataset
- Measure precision, recall, false positives, and performance across conditions
- Human-in-the-loop review and privacy safeguards
- Secure authentication before any real-world deployment
