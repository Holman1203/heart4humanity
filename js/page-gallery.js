/* Gallery page — filterable photo grid + lightbox */
(function () {
  'use strict';
  var PHOTOS = [
    { src: 'assets/photo-relief.jpg', cat: 'emergency', caption: 'Food distribution day, Maiduguri' },
    { src: 'assets/photo-education.jpg', cat: 'education', caption: 'Classroom session, Borno State' },
    { src: 'assets/photo-training.jpg', cat: 'fsl', caption: 'Vocational training graduation' },
    { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80', cat: 'health', caption: 'Mobile clinic outreach' },
    { src: 'https://images.unsplash.com/photo-1694286068158-836b3aec0599?auto=format&fit=crop&w=900&q=80', cat: 'nutrition', caption: 'Nutrition screening for children' },
    { src: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80', cat: 'wash', caption: 'Community borehole rehabilitation' },
    { src: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=80', cat: 'protection', caption: 'Community support session' },
    { src: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80', cat: 'fsl', caption: 'Small business supported by a microloan' },
    { src: 'assets/photo-relief.jpg', cat: 'emergency', caption: 'Volunteers packing relief kits' },
    { src: 'assets/photo-education.jpg', cat: 'education', caption: 'Scholarship recipients, 2025 cohort' },
    { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80', cat: 'health', caption: 'Health worker training session' },
    { src: 'assets/photo-training.jpg', cat: 'community', caption: 'Community gathering after graduation day' }
  ];

  var grid = document.getElementById('gallery-grid');
  PHOTOS.forEach(function (p, i) {
    var item = document.createElement('button');
    item.className = 'gallery-item';
    item.dataset.cat = p.cat;
    item.dataset.idx = String(i);
    item.innerHTML = '<img src="' + p.src + '" alt="' + p.caption + '" loading="lazy"><span class="gallery-item__overlay"><span class="gallery-item__caption">' + p.caption + '</span></span>';
    item.addEventListener('click', function () { openLightbox(i); });
    grid.appendChild(item);
  });

  document.getElementById('gallery-filters').addEventListener('click', function (e) {
    var chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#gallery-filters .filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    var filter = chip.dataset.galleryFilter;
    grid.querySelectorAll('.gallery-item').forEach(function (item) {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.cat !== filter);
    });
  });

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var activeIdx = 0;

  function openLightbox(i) {
    activeIdx = i;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function renderLightbox() {
    var p = PHOTOS[activeIdx];
    lightboxImg.src = p.src;
    lightboxImg.alt = p.caption;
    lightboxCaption.textContent = p.caption;
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }
  function showNext(dir) {
    activeIdx = (activeIdx + dir + PHOTOS.length) % PHOTOS.length;
    renderLightbox();
  }

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', function () { showNext(-1); });
  document.getElementById('lightbox-next').addEventListener('click', function () { showNext(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
})();
