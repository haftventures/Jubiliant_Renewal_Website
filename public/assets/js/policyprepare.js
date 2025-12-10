/**
 * Policy Viewer JavaScript (routes/policyprepare.js)
 * Includes image loading, display, rotation, pan (drag), and Ctrl + Scroll zoom.
 */

// --- Global State Variables ---
let scale = 1;
let rotation = 0;
let translateX = 0;
let translateY = 0;
let currentIndex = 0;
let imageList = []; // Stores the URLs of all images

// --- Drag/Pan State ---
let isDragging = false;
let startX = 0;
let startY = 0;
let startTranslateX = 0;
let startTranslateY = 0;
let rafPending = false; // For smooth requestAnimationFrame updates

// --- DOM Elements ---
const img = document.getElementById('policyImage');
const imageListContainer = document.getElementById('imageListContainer');
const fileInput = document.getElementById('fileInput'); // From your original HTML
const form = document.getElementById('uploadForm'); // From your original HTML

// --- Utility Functions ---

/**
 * Updates the CSS transform property on the image element.
 */
function updateTransform() {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
}

/**
 * Resets all transformations (scale, rotation, pan) to default.
 */
function resetTransform() {
    scale = 1;
    rotation = 0;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

/**
 * Highlights the active image button in the list container.
 */
function highlightActiveButton() {
    const buttons = imageListContainer.querySelectorAll('.image-name-btn');
    buttons.forEach((btn, i) => btn.classList.toggle('active', i === currentIndex));
}

// --- Image Viewer Controls ---

function zoomIn() { 
    scale += 0.1; 
    updateTransform(); 
}

function zoomOut() { 
    if (scale > 0.2) scale -= 0.1; 
    updateTransform(); 
}

function rotateLeft() { 
    rotation -= 90; 
    updateTransform(); 
}

function rotateRight() { 
    rotation += 90; 
    updateTransform(); 
}

/**
 * Changes the image source, resets transforms, and updates the active button.
 */
function showImage() {
    if (imageList.length > 0) {
        img.src = imageList[currentIndex];
        resetTransform();
        highlightActiveButton();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        showImage();
    }
}

function nextImage() {
    if (currentIndex < imageList.length - 1) {
        currentIndex++;
        showImage();
    }
}


// --- Gallery and List Rendering ---

/**
 * Fetches the list of image paths from the server.
 */
async function loadImages(user, vehicleno) {
    // NOTE: Ensure your Express route is set up to handle /get-images/:user/:vehicleno
    const res = await fetch(`/get-images/${user}/${vehicleno}`);
    const data = await res.json();

    if (data.success && data.images.length > 0) {
        imageList = data.images;
        currentIndex = 0;
        showImage(); // Display the first image
        renderImageList();
    } else {
        img.src = '';
        imageList = [];
        imageListContainer.innerHTML = '<p>No images found for this vehicle.</p>';
    }
}

/**
 * Creates and renders the clickable buttons for each image in the list.
 */
function renderImageList() {
    imageListContainer.innerHTML = '';
    imageList.forEach((imagePath, index) => {
        const imageName = imagePath.split('/').pop();
        const btn = document.createElement('button');
        btn.textContent = imageName;
        btn.classList.add('image-name-btn');
        if (index === currentIndex) btn.classList.add('active');
        
        btn.addEventListener('click', () => {
            currentIndex = index;
            showImage();
        });
        imageListContainer.appendChild(btn);
    });
}


// --- Form and File Input Logic ---

// Handles form submission (Upload button)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    // NOTE: This assumes an Express route handles '/upload'
    const res = await fetch('/upload', { method: 'POST', body: formData });
    const data = await res.json();
    alert(data.message);

    if (data.file && data.file.path) {
        // After successful upload, you should reload the image list
        // Replace placeholders with actual dynamic values!
        const user = 'user'; 
        const vehicleno = document.getElementById('vehicleNo').value || 'vehicleno'; 
        await loadImages(user, vehicleno);
    }
});

// Handles file input change (local preview before upload)
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            img.src = ev.target.result;
            resetTransform(); // Reset view for the new preview
        };
        reader.readAsDataURL(file);
    }
});


// --- Interaction Handlers (Pan & Zoom) ---

// 1. Mouse Down (Start Pan)
img.addEventListener('mousedown', (e) => {
    // Only handle pan (normal drag) if Ctrl is not pressed
    if (!e.ctrlKey) { 
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startTranslateX = translateX;
        startTranslateY = translateY;
        img.style.cursor = 'grabbing';
        e.preventDefault();
    }
});

// 2. Mouse Up (End Pan)
window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        // Restore cursor based on zoom level
        img.style.cursor = scale > 1 ? 'grab' : 'default'; 
    }
});

// 3. Mouse Move (Execute Pan)
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    if (!rafPending && isDragging && !e.ctrlKey) { 
        rafPending = true;
        requestAnimationFrame(() => {
            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;
            translateX = startTranslateX + diffX;
            translateY = startTranslateY + diffY;
            updateTransform();
            rafPending = false;
        });
    }
});


// 4. Wheel Scroll (Zoom In / Out with Mouse Only)
img.addEventListener('wheel', (e) => {
    e.preventDefault(); // Stop the page from scrolling

    const zoomStep = 0.1; // adjust for sensitivity
    const zoomAmount = e.deltaY < 0 ? zoomStep : -zoomStep;

    scale += zoomAmount;
    if (scale < 0.2) scale = 0.2; // Prevent disappearing
    if (scale > 5) scale = 5;     // Optional: limit max zoom

    // Optional: zoom toward mouse position
    requestAnimationFrame(updateTransform);
}, { passive: false });



// 5. Cursor Feedback (Keyboard)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Control' && scale > 1) img.style.cursor = 'grab';
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'Control' && !isDragging)
        img.style.cursor = scale > 1 ? 'grab' : 'default';
});


// --- Initial Load ---
window.addEventListener('DOMContentLoaded', () => {
    // NOTE: You must replace 'user' and 'vehicleno' with values dynamically obtained 
    // from your server-side rendering or API calls.
    const user = 'user';
    const vehicleno = 'vehicleno';
    loadImages(user, vehicleno);
});