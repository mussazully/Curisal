document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomReset = document.getElementById('zoomReset');

    let currentScale = 1;
    const ZOOM_STEP = 0.2;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 3;

    function updateImageScale() {
        modalImage.style.transform = `scale(${currentScale})`;
    }

    function handleZoomIn() {
        if (currentScale < MAX_SCALE) {
            currentScale += ZOOM_STEP;
            updateImageScale();
        }
    }

    function handleZoomOut() {
        if (currentScale > MIN_SCALE) {
            currentScale -= ZOOM_STEP;
            updateImageScale();
        }
    }

    function handleZoomReset() {
        currentScale = 1;
        updateImageScale();
    }

    function openModal(imageSrc, title, description) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        currentScale = 1;
        updateImageScale();
    }

    function closeModalHandler() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        currentScale = 1;
        updateImageScale();
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            const title = item.dataset.title;
            const description = item.dataset.description;
            openModal(image.src, title, description);
        });
    });

    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModalHandler();
        }
    });

    zoomIn.addEventListener('click', handleZoomIn);
    zoomOut.addEventListener('click', handleZoomOut);
    zoomReset.addEventListener('click', handleZoomReset);

    // Mouse wheel zoom
    modalImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    let currentImages = [];
    let currentIndex = 0;

    function openModal(images, title, description) {
        currentImages = images;
        currentIndex = 0;
        modalImage.src = currentImages[currentIndex].src;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showNextImage() {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            modalImage.src = currentImages[currentIndex].src;
        }
    }

    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            modalImage.src = currentImages[currentIndex].src;
        }
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const images = item.querySelectorAll('img');
            const title = item.dataset.title;
            const description = item.dataset.description;
            openModal(images, title, description);
        });
    });

    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
});


// Gallery items data
const galleryData = [
    {
        id: 1,
        image: 'mywork/brochure real copy.png',
        title: 'Curix-Tech Brochure',
        description: 'A Four Face brochure with a well detailed explanation of the company'
    },
    // Add more items as needed
];

// Function to create gallery items
function createGalleryItems() {
    const gallery = document.getElementById('gallery');
    
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        // Add click event for modal
        galleryItem.addEventListener('click', () => openModal(item));
        
        gallery.appendChild(galleryItem);
    });
}

// Modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const caption = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];

function openModal(item) {
    modal.style.display = 'block';
    modalImg.src = item.image;
    caption.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
}

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Initialize gallery
document.addEventListener('DOMContentLoaded', createGalleryItems);