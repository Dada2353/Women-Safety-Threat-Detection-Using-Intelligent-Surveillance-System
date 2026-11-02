
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

let selectedFile = null;
let previewUrl = null;

fileInput.addEventListener("change", function () {
    selectedFile = fileInput.files[0];

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = null;
    }

    preview.innerHTML = "";
    result.innerHTML = "";

    if (!selectedFile) {
        preview.textContent = "No file selected.";
        return;
    }

    previewUrl = URL.createObjectURL(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = previewUrl;
        img.alt = "Selected image preview";
        preview.appendChild(img);
    }
    else if (selectedFile.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = previewUrl;
        video.controls = true;
        preview.appendChild(video);
    }
    else {
        preview.textContent = "Please select an image or video.";
        selectedFile = null;
    }
});

analyzeBtn.addEventListener("click", function () {
    if (!selectedFile) {
        result.textContent = "Please select an image or video first.";
        return;
    }

    result.textContent =
        "File selected successfully: " + selectedFile.name +
        ". This is only a frontend preview. Connect your Python YOLOv8 backend to perform real AI detection.";
});
