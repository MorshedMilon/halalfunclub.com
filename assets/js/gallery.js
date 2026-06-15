/* Gallery Renderer & Lightbox Controller for Halal Fun Club */

document.addEventListener('DOMContentLoaded', () => {
  const filterContainer = document.getElementById('gallery-filter-nav');
  const gridContainer = document.getElementById('gallery-grid');
  
  if (!gridContainer) return; // Exit if not on gallery page

  let activeCategory = 'all';
  let filteredItems = [...GALLERY_ITEMS];
  let currentLightboxIndex = 0;

  // Title Cleaning Helper to remove auto-generated numbers and hashes
  const cleanTitle = (title) => {
    if (!title) return '';
    const words = title.split(/[\s\-_]+/);
    const cleanWords = words.filter(word => {
      // Filter out pure numbers
      if (/^\d+$/.test(word)) return false;
      
      // Filter out base64/hash strings
      if (word.length >= 5) {
        const hasDigit = /[0-9]/.test(word);
        const hasLetter = /[a-zA-Z]/.test(word);
        if (hasDigit && hasLetter) return false;
        
        const hasLower = /[a-z]/.test(word);
        const hasUpper = /[A-Z]/.test(word);
        if (hasLower && hasUpper) {
          const upperSub = word.slice(1);
          if (/[A-Z]/.test(upperSub)) return false;
        }
      }
      return true;
    });

    const cleaned = cleanWords.join(' ').trim();
    const genericWords = ['img', 'image', 'scene', 'screenshot'];
    if (genericWords.includes(cleaned.toLowerCase())) {
      return '';
    }
    return cleaned;
  };

  // Extract a clean short heading from the description if the title is empty/raw
  const getShortHeading = (title, description) => {
    const cleanedTitle = cleanTitle(title);
    if (cleanedTitle) {
      return cleanedTitle;
    }
    
    if (description) {
      // Extract the event name from the pattern "Captured during our [Event Name] events."
      const match = description.match(/Captured during our\s+(?:our\s+)?(.*?)\s+events/i);
      if (match && match[1]) {
        let eventName = match[1].trim();
        // Capitalize the first letter of each word
        return eventName.split(/\s+/).map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
      }
    }
    
    return 'Camp Memory';
  };

  // 1. Create Lightbox HTML dynamically so it is available on the page
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <button class="lightbox-nav-btn lightbox-prev" aria-label="Previous image">&#10094;</button>
    <button class="lightbox-nav-btn lightbox-next" aria-label="Next image">&#10095;</button>
    <div class="lightbox-wrapper">
      <img src="" alt="" class="lightbox-img">
      <div class="lightbox-caption">
        <h4 class="lightbox-title"></h4>
        <p class="lightbox-desc"></p>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  // 2. Render filter navigation buttons
  const renderFilters = () => {
    if (!filterContainer) return;
    filterContainer.innerHTML = '';
    
    GALLERY_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `filter-btn ${cat.slug === activeCategory ? 'active' : ''}`;
      btn.textContent = cat.name;
      btn.setAttribute('data-category', cat.slug);
      
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        activeCategory = cat.slug;
        filterGallery();
      });
      
      filterContainer.appendChild(btn);
    });
  };

  // 3. Filter and render gallery grid items
  const filterGallery = () => {
    gridContainer.style.opacity = '0';
    
    setTimeout(() => {
      gridContainer.innerHTML = '';
      
      if (activeCategory === 'all') {
        filteredItems = [...GALLERY_ITEMS];
      } else {
        filteredItems = GALLERY_ITEMS.filter(item => item.category === activeCategory);
      }
      
      if (filteredItems.length === 0) {
        gridContainer.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--color-text-muted);">No images found in this category.</div>';
        gridContainer.style.opacity = '1';
        return;
      }
      
      filteredItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item reveal';
        const displayTitle = getShortHeading(item.title, item.description);
        itemEl.innerHTML = `
          <img src="${item.path}" alt="${item.alt}" loading="lazy">
          <div class="gallery-item-overlay">
            <h4 class="gallery-item-title">${displayTitle}</h4>
            <p class="gallery-item-desc">${item.description}</p>
          </div>
        `;
        
        itemEl.addEventListener('click', () => {
          openLightbox(index);
        });
        
        gridContainer.appendChild(itemEl);
        
        // Trigger reveal after inserting
        setTimeout(() => itemEl.classList.add('active'), 20);
      });
      
      gridContainer.style.opacity = '1';
    }, 200);
  };

  // 4. Lightbox Controls
  const openLightbox = (index) => {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showPrevImage = () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  };

  const showNextImage = () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    updateLightboxContent();
  };

  const updateLightboxContent = () => {
    const item = filteredItems[currentLightboxIndex];
    if (!item) return;
    
    // Smooth transition between images
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = item.path;
      lightboxImg.alt = item.alt;
      
      const displayTitle = getShortHeading(item.title, item.description);
      lightboxTitle.textContent = displayTitle;
      lightboxTitle.style.display = '';
      
      lightboxDesc.textContent = item.description;
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  // 5. Event Listeners for Lightbox
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  // Close when clicking overlay (outside the image container)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-wrapper')) {
      closeLightbox();
    }
  });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });

  // 6. Initialize
  renderFilters();
  filterGallery();
});
