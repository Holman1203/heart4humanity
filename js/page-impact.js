/* Impact page — full Dashboard + Interactive Map + Success Stories */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var DASHBOARD = [
    { num: 72000, label: 'People reached', max: 100000, suffix: '+' },
    { num: 24, label: 'Communities served', max: 40 },
    { num: 18000, label: 'Women supported', max: 25000, suffix: '+' },
    { num: 9000, label: 'Children enrolled', max: 12000, suffix: '+' },
    { num: 12, label: 'Health facilities supported', max: 20 },
    { num: 18, label: 'Water points constructed', max: 30 },
    { num: 6, label: 'Schools rehabilitated', max: 10 },
    { num: 2600, label: 'Nutrition recoveries', max: 4000, suffix: '+' }
  ];

  var STATES = [
    { name: 'Borno (BAY)', x: 66, y: 34, lgas: 6, beneficiaries: '28,000+', partners: 4, image: 'assets/photo-relief.jpg' },
    { name: 'Yobe (BAY)', x: 52, y: 26, lgas: 3, beneficiaries: '10,000+', partners: 2, image: 'assets/photo-education.jpg' },
    { name: 'Adamawa (BAY)', x: 72, y: 56, lgas: 4, beneficiaries: '14,000+', partners: 2, image: 'assets/photo-training.jpg' },
    { name: 'Bauchi (Northeast)', x: 44, y: 44, lgas: 2, beneficiaries: '6,000+', partners: 1, image: 'assets/photo-relief.jpg' },
    { name: 'Gombe (Northeast)', x: 56, y: 46, lgas: 2, beneficiaries: '5,000+', partners: 1, image: 'assets/photo-education.jpg' },
    { name: 'Kano (Northwest)', x: 34, y: 30, lgas: 2, beneficiaries: '5,000+', partners: 1, image: 'assets/photo-training.jpg' },
    { name: 'Katsina (Northwest)', x: 26, y: 22, lgas: 1, beneficiaries: '4,000+', partners: 1, image: 'assets/photo-relief.jpg' }
  ];

  var STORIES = [
    { quote: '"The scholarship didn’t just cover school fees — it told my daughter the world expected her to succeed."', name: 'Amina O.', role: 'Parent · Education programme', initials: 'AO', image: 'assets/photo-education.jpg', alt: 'Portrait connected to the education programme', video: false },
    { quote: '"The relief team reached our shelter before the rains came. My children had food that week because someone chose to show up."', name: 'Fatima B.', role: 'Mother of three · Emergency Response', initials: 'FB', image: 'assets/photo-relief.jpg', alt: 'Portrait connected to the emergency response programme', video: false },
    { quote: '"The literacy and livelihoods training gave me a trade certificate and the confidence to teach others in my community."', name: 'Ibrahim K.', role: 'Graduate · FSL programme', initials: 'IK', image: 'assets/photo-training.jpg', alt: 'Portrait connected to the FSL programme', video: false },
    { quote: '"Clean water at the camp meant my children stopped falling sick every month. That changed everything for us."', name: 'Halima S.', role: 'Beneficiary · WASH programme', initials: 'HS', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80', alt: 'Portrait connected to the WASH programme', video: true }
  ];

  /* Dashboard */
  var dashboardGrid = document.getElementById('dashboard-grid');
  DASHBOARD.forEach(function (d) {
    var pct = Math.min(100, Math.round((d.num / d.max) * 100));
    var card = document.createElement('div');
    card.className = 'dash-card';
    card.innerHTML =
      '<span class="dash-card__num" data-count="' + d.num + '"' + (d.suffix ? ' data-suffix="' + d.suffix + '"' : '') + '>0</span>' +
      '<span class="dash-card__label">' + d.label + '</span>' +
      '<div class="dash-card__bar"><div class="dash-card__bar-fill" data-width="' + pct + '%"></div></div>' +
      '<span class="dash-card__goal"><strong>' + pct + '%</strong> of ' + d.max.toLocaleString('en-US') + ' goal</span>';
    dashboardGrid.appendChild(card);
  });
  var dashIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { document.querySelectorAll('.dash-card__bar-fill').forEach(function (bar) { bar.style.width = bar.dataset.width; }); dashIo.disconnect(); }
    });
  }, { threshold: 0.15 });
  dashIo.observe(document.getElementById('dashboard'));

  /* Map */
  var mapPins = document.getElementById('map-pins');
  var mapPanel = document.getElementById('map-panel');
  STATES.forEach(function (s, i) {
    var pin = document.createElement('button');
    pin.className = 'map-pin';
    pin.style.left = s.x + '%';
    pin.style.top = s.y + '%';
    pin.setAttribute('aria-label', s.name);
    pin.addEventListener('click', function () { selectState(i); });
    pin.addEventListener('mouseenter', function () { selectState(i); });
    mapPins.appendChild(pin);
  });
  function selectState(i) {
    var s = STATES[i];
    Array.prototype.forEach.call(mapPins.children, function (p, k) { p.classList.toggle('is-active', k === i); });
    mapPanel.innerHTML =
      '<span class="map-panel__state">' + s.name + '</span>' +
      '<img class="map-panel__photo" src="' + s.image + '" alt="Field photo from ' + s.name + '" loading="lazy">' +
      '<div class="map-panel__stats">' +
        '<div class="map-panel__stat"><span class="map-panel__stat-num">' + s.lgas + '</span><span class="map-panel__stat-label">LGAs</span></div>' +
        '<div class="map-panel__stat"><span class="map-panel__stat-num">' + s.beneficiaries + '</span><span class="map-panel__stat-label">Beneficiaries</span></div>' +
        '<div class="map-panel__stat"><span class="map-panel__stat-num">' + s.partners + '</span><span class="map-panel__stat-label">Partners</span></div>' +
      '</div>';
  }
  selectState(0);

  /* Stories */
  var storyPhoto = document.getElementById('story-photo');
  var storyPlay = document.getElementById('story-play');
  var storyQuote = document.getElementById('story-quote');
  var storyName = document.getElementById('story-name');
  var storyRole = document.getElementById('story-role');
  var storyInitials = document.getElementById('story-initials');
  var storyViewport = document.querySelector('.stories__viewport');
  var storyDots = document.getElementById('story-dots');
  var activeStory = 0;
  var storyTimer = null;

  STORIES.forEach(function (s, i) {
    var dot = document.createElement('button');
    dot.className = 'stories__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Story ' + (i + 1) + ' — ' + s.name);
    dot.addEventListener('click', function () { showStory(i, true); });
    storyDots.appendChild(dot);
  });
  function renderStory(i) {
    var s = STORIES[i];
    storyPhoto.src = s.image; storyPhoto.alt = s.alt;
    storyPlay.hidden = !s.video;
    storyQuote.textContent = s.quote;
    storyName.textContent = s.name;
    storyRole.textContent = s.role;
    storyInitials.textContent = s.initials;
    var dots = storyDots.children;
    for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('is-active', d === i);
  }
  function showStory(i, user) {
    var next = (i + STORIES.length) % STORIES.length;
    if (next === activeStory) { if (user) restartStoryAutoplay(); return; }
    activeStory = next;
    storyViewport.classList.add('is-fading');
    storyPhoto.classList.add('is-fading');
    setTimeout(function () { renderStory(activeStory); storyViewport.classList.remove('is-fading'); storyPhoto.classList.remove('is-fading'); }, 250);
    if (user) restartStoryAutoplay();
  }
  function restartStoryAutoplay() { clearInterval(storyTimer); if (!reduceMotion) storyTimer = setInterval(function () { showStory(activeStory + 1, false); }, 7000); }
  document.getElementById('story-prev').addEventListener('click', function () { showStory(activeStory - 1, true); });
  document.getElementById('story-next').addEventListener('click', function () { showStory(activeStory + 1, true); });
  renderStory(0);
  restartStoryAutoplay();
  storyPlay.addEventListener('click', function () { if (window.H4H.openVideoModal) window.H4H.openVideoModal(STORIES[activeStory].name + ' — video testimonial'); });
})();
