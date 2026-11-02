const file = document.getElementById('file');
const camera = document.getElementById('camera');
const capture = document.getElementById('capture');
const analyze = document.getElementById('analyze');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const empty = document.getElementById('empty');
const statusEl = document.getElementById('status');
const detectionsEl = document.getElementById('detections');
let imageBlob = null;
let stream = null;
let originalImage = null;
function showImage(img) {
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  empty.hidden = true; video.hidden = true; canvas.hidden = false;
  originalImage = img; analyze.disabled = false;
  statusEl.textContent = 'Ready to analyze'; detectionsEl.replaceChildren();
}
file.addEventListener('change', () => {
  const selected = file.files[0]; if (!selected) return;
  imageBlob = selected; const url = URL.createObjectURL(selected);
  const img = new Image(); img.onload = () => { showImage(img); URL.revokeObjectURL(url); }; img.src = url;
});
camera.addEventListener('click', async () => {
  try {
    if (stream) stream.getTracks().forEach(t => t.stop());
    stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
    video.srcObject = stream; video.hidden = false; canvas.hidden = true; empty.hidden = true;
    capture.hidden = false; analyze.disabled = true;
    statusEl.textContent = 'Camera running. Capture a frame.';
  } catch(e) { statusEl.textContent = 'Camera unavailable: ' + e.message; }
});
capture.addEventListener('click', () => {
  canvas.width = video.videoWidth; canvas.height = video.videoHeight;
  ctx.drawImage(video,0,0,canvas.width,canvas.height);
  canvas.toBlob(blob => { imageBlob = blob; }, 'image/jpeg', .9);
  originalImage = null; canvas.hidden = false; video.hidden = true;
  stream?.getTracks().forEach(t=>t.stop()); stream = null;
  capture.hidden = true; analyze.disabled = false; statusEl.textContent = 'Frame captured. Ready to analyze.';
});
analyze.addEventListener('click', async () => {
  if (!imageBlob) return;
  analyze.disabled = true; statusEl.textContent = 'Analyzing…'; detectionsEl.replaceChildren();
  const data = new FormData(); data.append('image', imageBlob, 'image.jpg');
  try {
    const response = await fetch('/api/detect', {method:'POST', body:data});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Detection failed');
    if (originalImage) ctx.drawImage(originalImage,0,0,canvas.width,canvas.height);
    for (const d of result.detections) {
      const item = document.createElement('div'); item.className='detection';
      item.textContent = `${d.label} — ${Math.round(d.confidence*100)}% confidence`;
      detectionsEl.appendChild(item);
      const [x1,y1,x2,y2] = d.box;
      ctx.strokeStyle='#64e4ca';ctx.lineWidth=Math.max(2,canvas.width/250);
      ctx.strokeRect(x1,y1,x2-x1,y2-y1);
      ctx.fillStyle='#64e4ca';ctx.font=`${Math.max(13,canvas.width/45)}px sans-serif`;
      ctx.fillText(d.label,x1,Math.max(20,y1-5));
    }
    statusEl.textContent = result.detections.length ? `${result.detections.length} object(s) detected` : 'No objects detected';
  } catch(e) { statusEl.textContent = 'Error: ' + e.message; }
  finally { analyze.disabled = false; }
});
