// Theme switching
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Gallery functionality
const gallery = document.querySelector('.gallery');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');
const downloadBtn = document.getElementById('downloadBtn');
const embedCode = document.getElementById('embedCode');
const copyBtn = document.getElementById('copyBtn');

// Sample images - replace with your actual images
const images = [
    { url: 'img/1.png', alt: 'Image 1' },
    { url: 'img/2.png', alt: 'Image 2' },
    { url: 'img/3.png', alt: 'Image 3' },
    { url: 'img/4.png', alt: 'Image 4' },
    { url: 'img/5.png', alt: 'Image 5' },
    { url: 'img/6.png', alt: 'Image 6' },
    { url: 'img/7.png', alt: 'Image 7' },
    { url: 'img/8.png', alt: 'Image 8' },
    { url: 'img/9.png', alt: 'Image 9' },
    { url: 'img/10.png', alt: 'Image 10' },
    { url: 'img/11.png', alt: 'Image 11' },
    { url: 'img/12.png', alt: 'Image 12' }
];

// Create gallery items
images.forEach((image, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    imgElement.alt = image.alt;
    imgElement.dataset.index = index;
    gallery.appendChild(imgElement);
});

// Modal functionality
function openModal(imgElement) {
    modal.style.display = 'flex';
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    
    // Generate embed code
    const embedHTML = `<img src="${imgElement.src}" alt="${imgElement.alt}" style="max-width: 100%;">`;
    embedCode.textContent = embedHTML;
}

function closeModal() {
    modal.style.display = 'none';
}

// Event listeners
gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        openModal(e.target);
    }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Download functionality
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = modalImg.src;
    link.download = `image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Copy embed code
copyBtn.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    textArea.value = embedCode.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Visual feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
}); 