/* Heart for Humanity Initiative — homepage-only interactions
   (shared chrome — nav, theme, donate modal, chatbot, reveals, counters — lives in common.js) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = window.H4H.fmt;

  /* ============================================================
     ICONS (thematic areas)
     ============================================================ */
  var ICONS = {
    health: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/><path d="M3.5 12h4l1.5-3 2.5 6 1.5-3h5"/></svg>',
    nutrition: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 0 16 0Z"/><path d="M4 13h16"/><path d="M12 13V7a3 3 0 0 1 3-3"/></svg>',
    wash: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5s6.5 7.4 6.5 12A6.5 6.5 0 0 1 5.5 14.5C5.5 9.9 12 2.5 12 2.5Z"/></svg>',
    education: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11.5V17c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5"/><path d="M22 9v6"/></svg>',
    protection: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v6c0 4.6 3.2 7.9 7.5 9 4.3-1.1 7.5-4.4 7.5-9V6L12 3Z"/><path d="m9.5 12 1.8 1.8L15 10"/></svg>',
    fsl: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V10"/><path d="M12 10c-2 0-4-2-4-5 3 0 4 1.5 4 3 0-1.5 1-3 4-3 0 3-2 5-4 5Z"/><rect x="3" y="14" width="18" height="6" rx="1.5"/></svg>',
    peacebuilding: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>'
  };

  /* ============================================================
     DATA
     ============================================================ */
  var HERO_SLIDES = [
    { kicker: 'EDUCATION', title: 'Every child deserves <em>a classroom.</em>', image: 'assets/photo-education.jpg', alt: 'Children learning in a classroom' },
    { kicker: 'WASH', title: 'Clean water <em>changes everything.</em>', image: 'assets/other/wash/sa1.jpeg', alt: 'HHI volunteers leading a community sanitation exercise' },
    { kicker: 'HEALTH', title: 'Care that reaches <em>the last mile.</em>', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80', alt: 'Community healthcare outreach' },
    { kicker: 'NUTRITION', title: 'Every child, <em>nourished to thrive.</em>', image: 'https://images.unsplash.com/photo-1694286068158-836b3aec0599?auto=format&fit=crop&w=1600&q=80', alt: 'Nutrition support activity for children' },
    { kicker: 'PROTECTION', title: 'Safety and dignity <em>for every family.</em>', image: 'assets/photo-training.jpg', alt: 'Community protection and empowerment session' },
    { kicker: 'EMERGENCY RESPONSE', title: 'There <em>when crisis strikes.</em>', image: 'assets/photo-relief.jpg', alt: 'Emergency relief distribution to displaced families' },
    { kicker: 'FSL', title: 'From relief today <em>to lasting income.</em>', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80', alt: 'Food security and livelihoods support' },
    { kicker: 'PEACEBUILDING', title: 'Peace that holds, <em>communities that heal.</em>', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=80', alt: 'Community members joining hands in unity' }
  ];

  var THEMATIC = [
    { key: 'health', title: 'Health', desc: 'Mobile clinics, screenings and health education that bring care to families far from a hospital.', page: 'programs-health.html' },
    { key: 'nutrition', title: 'Nutrition', desc: 'Community-based recovery programmes that treat and prevent malnutrition in children under five.', page: 'programs-nutrition.html' },
    { key: 'wash', title: 'WASH', desc: 'Clean water points, sanitation facilities and hygiene promotion for displaced and host communities.', page: 'programs-wash.html' },
    { key: 'education', title: 'Education', desc: 'Scholarships, learning materials and mentorship that keep children — especially girls — in school.', page: 'programs-education.html' },
    { key: 'protection', title: 'Protection', desc: 'Case management, psychosocial support and safe spaces for women, children and survivors of crisis.', page: 'programs-protection.html' },
    { key: 'fsl', title: 'FSL', desc: 'Food Security &amp; Livelihoods — emergency food, savings groups and vocational training for lasting incomes.', page: 'programs-fsl.html' },
    { key: 'peacebuilding', title: 'Peacebuilding', desc: 'Conflict resolution, social cohesion and trauma healing — dialogue and youth engagement that rebuild trust after crisis.', page: 'programs-peacebuilding.html' }
  ];

  var PROJECTS = [
    { title: 'Mobile Health Outreach for IDP Camps', cat: 'health', pill: 'HEALTH', location: 'Maiduguri, Borno', donor: 'WHO', duration: 'Jan – Dec 2025', desc: 'Mobile clinics bringing screenings and primary care to families sheltering in displacement camps.', progress: 72, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80' },
    { title: 'Community-Based Nutrition Recovery', cat: 'nutrition', pill: 'NUTRITION', location: 'Konduga, Borno', donor: 'UNICEF', duration: 'Jan – Aug 2025', desc: 'Screening and treatment for acute malnutrition in children under five, with caregiver education.', progress: 58, image: 'https://images.unsplash.com/photo-1694286068158-836b3aec0599?auto=format&fit=crop&w=900&q=80' },
    { title: "Girls' Education & School Feeding", cat: 'education', pill: 'EDUCATION', location: 'Maiduguri, Borno', donor: 'Education First Foundation', duration: 'Jul 2025 – Jul 2026', desc: 'Keeping girls in school with scholarships, meals, learning materials and mentorship.', progress: 40, image: 'assets/photo-education.jpg' },
    { title: 'Child Protection Case Management', cat: 'protection', pill: 'PROTECTION', location: 'Jere, Borno', donor: 'UN Foundation', duration: 'Mar – Dec 2025', desc: 'Case workers supporting unaccompanied and separated children toward safe, stable care.', progress: 65, image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=80' },
    { title: 'Solar-Powered Borehole Rehabilitation', cat: 'wash', pill: 'WASH', location: 'Bama, Borno', donor: 'Green Earth Initiative', duration: 'Feb – Nov 2025', desc: 'Rehabilitating boreholes with solar pumps to bring reliable clean water to host communities.', progress: 80, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80' },
    { title: "Women's Savings Groups & Microfinance", cat: 'fsl', pill: 'FSL', location: 'Dikwa, Borno', donor: 'Local Community Bank', duration: 'Jan 2025 – ongoing', desc: 'Savings circles and small loans helping women build steady, independent household incomes.', progress: 55, image: 'assets/photo-training.jpg' },
    { title: 'Enhancing Security & Peacebuilding in Dikwa', cat: 'peacebuilding', pill: 'PEACEBUILDING', location: 'Dikwa, Borno', donor: 'Community-led', duration: '2025', desc: 'Capacity building for female leaders, women groups and youth to enhance security and peacebuilding across eight communities in Dikwa LGA.', progress: 45, image: 'assets/photo-training.jpg' }
  ];

  var DASHBOARD = [
    { num: 72000, label: 'People reached' },
    { num: 18000, label: 'Women supported' },
    { num: 9000, label: 'Children enrolled' },
    { num: 18, label: 'Water points constructed' }
  ];

  var STORIES = [
    { quote: '"The scholarship didn’t just cover school fees — it told my daughter the world expected her to succeed."', name: 'Amina O.', role: 'Parent · Education programme', initials: 'AO', image: 'assets/photo-education.jpg', alt: 'Portrait connected to the education programme', video: false },
    { quote: '"The relief team reached our shelter before the rains came. My children had food that week because someone chose to show up."', name: 'Fatima B.', role: 'Mother of three · Emergency Response', initials: 'FB', image: 'assets/photo-relief.jpg', alt: 'Portrait connected to the emergency response programme', video: false },
    { quote: '"The literacy and livelihoods training gave me a trade certificate and the confidence to teach others in my community."', name: 'Ibrahim K.', role: 'Graduate · FSL programme', initials: 'IK', image: 'assets/photo-training.jpg', alt: 'Portrait connected to the FSL programme', video: false },
    { quote: '"Clean water at the camp meant my children stopped falling sick every month. That changed everything for us."', name: 'Halima S.', role: 'Beneficiary · WASH programme', initials: 'HS', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=900&q=80', alt: 'Portrait connected to the WASH programme', video: true }
  ];

  var NEWS_FEATURED = { pill: 'FIELD UPDATE', date: 'July 28, 2025', title: 'Relief outreach brings food support to displaced families', desc: 'Our volunteers delivered food packages to families sheltering in temporary accommodation around Maiduguri — part of our ongoing commitment to the communities most affected by displacement.', image: 'assets/photo-relief.jpg' };
  var NEWS = [
    { pill: 'PARTNERSHIP', date: 'Jul 12, 2025', title: 'New partnership expands mobile health outreach', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80' },
    { pill: 'ANNOUNCEMENT', date: 'Jun 30, 2025', title: 'Applications open for 2025 girls’ scholarship cohort', image: 'assets/photo-education.jpg' },
    { pill: 'FIELD UPDATE', date: 'Jun 18, 2025', title: 'Solar boreholes restore water access in Bama', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80' }
  ];

  var PARTNERS = [
    { name: 'United Nations Foundation', role: 'FUNDING PARTNER' },
    { name: 'World Health Organization', role: 'IMPLEMENTATION PARTNER' },
    { name: 'Local Community Bank', role: 'CORPORATE PARTNER' },
    { name: 'Education First Foundation', role: 'STRATEGIC PARTNER' },
    { name: 'Green Earth Initiative', role: 'IMPLEMENTATION PARTNER' },
    { name: 'Tech for Good Alliance', role: 'STRATEGIC PARTNER' }
  ];

  var CAREERS = [
    { title: 'Programme Officer — WASH', tag: 'VACANCY', meta: 'Maiduguri, Borno · Full-time' },
    { title: 'Monitoring & Evaluation Intern', tag: 'INTERNSHIP', meta: 'Maiduguri, Borno · 6 months' }
  ];

  var PRESET_VALUES = [10000, 25000, 50000, 100000];

  /* ============================================================
     HERO — humanitarian slider
     ============================================================ */
  var heroSlidesEl = document.getElementById('hero-slides');
  var heroTitle = document.getElementById('hero-title');
  var heroBars = document.getElementById('hero-bars');
  var activeHero = 0;
  var heroTimer = null;

  HERO_SLIDES.forEach(function (s, i) {
    var slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' is-active' : '');
    var img = document.createElement('img');
    img.src = s.image; img.alt = s.alt;
    slide.appendChild(img);
    heroSlidesEl.appendChild(slide);

    var bar = document.createElement('button');
    bar.className = 'hero__bar' + (i === 0 ? ' is-active' : '');
    bar.setAttribute('aria-label', 'Slide ' + (i + 1) + ' — ' + s.kicker);
    bar.appendChild(document.createElement('span'));
    bar.addEventListener('click', function () { showHero(i, true); });
    heroBars.appendChild(bar);
  });

  function renderHero(i, animate) {
    heroTitle.innerHTML = HERO_SLIDES[i].title;
    if (animate && !reduceMotion) {
      heroTitle.style.animation = 'none';
      void heroTitle.offsetWidth;
      heroTitle.style.animation = 'fadeUp .6s ease both';
    }
    var slides = heroSlidesEl.children;
    for (var k = 0; k < slides.length; k++) slides[k].classList.toggle('is-active', k === i);
    var bars = heroBars.children;
    for (var b = 0; b < bars.length; b++) { bars[b].classList.toggle('is-active', b === i); bars[b].classList.toggle('is-done', b < i); }
  }
  function showHero(i, user) { activeHero = (i + HERO_SLIDES.length) % HERO_SLIDES.length; renderHero(activeHero, true); if (user) restartHero(); }
  function restartHero() { clearInterval(heroTimer); if (!reduceMotion) heroTimer = setInterval(function () { showHero(activeHero + 1, false); }, 6000); }
  renderHero(0, false);
  restartHero();

  /* ============================================================
     THEMATIC AREAS
     ============================================================ */
  var thematicGrid = document.getElementById('thematic-grid');
  THEMATIC.forEach(function (t) {
    var card = document.createElement('a');
    card.className = 'theme-card';
    card.href = t.page;
    card.innerHTML =
      '<span class="theme-card__icon">' + ICONS[t.key] + '</span>' +
      '<span class="theme-card__title">' + t.title + '</span>' +
      '<span class="theme-card__desc">' + t.desc + '</span>' +
      '<span class="theme-card__link">Learn More <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>';
    thematicGrid.appendChild(card);
  });

  /* ============================================================
     FEATURED PROJECTS + FILTER
     ============================================================ */
  var projectsGrid = document.getElementById('projects-grid');
  PROJECTS.forEach(function (p) {
    var card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.cat = p.cat;
    card.innerHTML =
      '<div class="project-card__media"><img src="' + p.image + '" alt="" loading="lazy"><span class="project-card__pill">' + p.pill + '</span></div>' +
      '<div class="project-card__body">' +
        '<div class="project-card__meta"><span>' + p.location + '</span><span>· Donor: ' + p.donor + '</span><span>· ' + p.duration + '</span></div>' +
        '<h3 class="project-card__title">' + p.title + '</h3>' +
        '<p class="project-card__desc">' + p.desc + '</p>' +
        '<div class="project-card__progress"><div class="project-card__progress-bar"><div class="project-card__progress-fill" data-width="' + p.progress + '%"></div></div><span class="project-card__progress-label">' + p.progress + '% funded</span></div>' +
        '<button class="project-card__cta" data-donate>View Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>' +
      '</div>';
    projectsGrid.appendChild(card);
  });

  document.getElementById('project-filters').addEventListener('click', function (e) {
    var chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#project-filters .filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    var filter = chip.dataset.filter;
    projectsGrid.querySelectorAll('.project-card').forEach(function (card) {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });

  var projIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { document.querySelectorAll('.project-card__progress-fill').forEach(function (bar) { bar.style.width = bar.dataset.width; }); projIo.disconnect(); }
    });
  }, { threshold: 0.15 });
  projIo.observe(document.getElementById('projects'));

  /* ============================================================
     IMPACT TEASER (4 headline stats — full dashboard lives on impact.html)
     ============================================================ */
  var dashboardGrid = document.getElementById('dashboard-grid');
  DASHBOARD.forEach(function (d) {
    var card = document.createElement('div');
    card.className = 'dash-card';
    card.innerHTML = '<span class="dash-card__num" data-count="' + d.num + '">0</span><span class="dash-card__label">' + d.label + '</span>';
    dashboardGrid.appendChild(card);
  });
  if (window.H4H.scanCounters) window.H4H.scanCounters();

  /* ============================================================
     SUCCESS STORIES — carousel + video modal
     ============================================================ */
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

  /* ============================================================
     NEWS TEASER
     ============================================================ */
  var newsFeaturedEl = document.getElementById('news-featured');
  newsFeaturedEl.innerHTML =
    '<article class="news-feature">' +
      '<div class="news-feature__media"><img src="' + NEWS_FEATURED.image + '" alt=""></div>' +
      '<div class="news-feature__body">' +
        '<div class="news-feature__meta"><span class="news-feature__pill">' + NEWS_FEATURED.pill + '</span><span class="news-feature__date">' + NEWS_FEATURED.date + '</span></div>' +
        '<h3 class="news-feature__title">' + NEWS_FEATURED.title + '</h3>' +
        '<p class="news-feature__desc">' + NEWS_FEATURED.desc + '</p>' +
      '</div>' +
    '</article>';
  var newsGrid = document.getElementById('news-grid');
  NEWS.forEach(function (n) {
    var card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = '<div class="news-card__media"><img src="' + n.image + '" alt="" loading="lazy"></div><div class="news-card__body"><span class="news-card__pill">' + n.pill + '</span><h4 class="news-card__title">' + n.title + '</h4><span class="news-card__date">' + n.date + '</span></div>';
    newsGrid.appendChild(card);
  });

  /* ============================================================
     PARTNERS — marquee
     ============================================================ */
  var partnersTrack = document.getElementById('partners-track');
  var partnerHtml = PARTNERS.map(function (p) { return '<div class="partner-card"><span class="partner-card__name">' + p.name + '</span><span class="partner-card__role">' + p.role + '</span></div>'; }).join('');
  partnersTrack.innerHTML = partnerHtml + partnerHtml;

  /* ============================================================
     CAREERS TEASER
     ============================================================ */
  var careersGrid = document.getElementById('careers-grid');
  CAREERS.forEach(function (c) {
    var card = document.createElement('div');
    card.className = 'career-card';
    card.innerHTML = '<div class="career-card__info"><span class="career-card__tag">' + c.tag + '</span><span class="career-card__title">' + c.title + '</span><span class="career-card__meta">' + c.meta + '</span></div><a class="ds-btn ds-btn--secondary ds-btn--md" href="mailto:info@heart4humanityinitiative.org?subject=' + encodeURIComponent('Application: ' + c.title) + '">Apply</a>';
    careersGrid.appendChild(card);
  });

  /* ============================================================
     DONATE — calculator + tabs + panel
     ============================================================ */
  var calcSlider = document.getElementById('calc-slider');
  var calcAmount = document.getElementById('calc-amount');
  var calcImpact = document.getElementById('calc-impact');
  function calcImpactText(v) {
    if (v < 15000) return fmt(v) + ' packs school supplies for two children and helps fund a classroom day.';
    if (v < 40000) return fmt(v) + ' covers health check-ups for five people at a mobile clinic.';
    if (v < 80000) return fmt(v) + ' opens clean water access for a family for an entire year.';
    if (v < 150000) return fmt(v) + ' funds one child’s education for a full year.';
    return fmt(v) + ' builds long-term community resilience — clean water, health and livelihoods together.';
  }
  function renderCalc() { var v = Number(calcSlider.value); calcAmount.textContent = fmt(v); calcImpact.textContent = calcImpactText(v); }
  calcSlider.addEventListener('input', renderCalc);
  renderCalc();

  var DONATE_TABS = {
    once: 'A single gift, right where it’s needed today. Choose an amount below to get started.',
    monthly: 'Steady monthly support lets us plan programmes with confidence all year round.',
    emergency: 'Fast-tracked to our active emergency response fund for displaced and crisis-affected families.',
    corporate: 'Co-fund a programme, sponsor a project, or match employee giving. Contact us to discuss a corporate partnership.'
  };
  var donateTabBody = document.getElementById('donate-tab-body');
  var donatePanelPresets = document.getElementById('donate-panel-presets');
  var donatePanelCta = document.getElementById('donate-panel-cta');
  var activeDonateTab = 'once';
  var activePanelPreset = 1;

  function renderDonatePanel() {
    donateTabBody.innerHTML = '<p>' + DONATE_TABS[activeDonateTab] + '</p>';
    if (activeDonateTab === 'corporate') {
      donatePanelPresets.style.display = 'none';
      donatePanelCta.textContent = 'Contact Us About Partnering';
      donatePanelCta.removeAttribute('data-donate');
      donatePanelCta.onclick = function () { window.location.href = 'mailto:info@heart4humanityinitiative.org?subject=Corporate%20Partnership'; };
    } else {
      donatePanelPresets.style.display = 'grid';
      donatePanelCta.setAttribute('data-donate', '');
      donatePanelCta.onclick = null;
      donatePanelCta.textContent = activeDonateTab === 'emergency' ? 'Give to Emergency Appeal' : 'Donate Now';
    }
  }
  PRESET_VALUES.forEach(function (v, i) {
    var btn = document.createElement('button');
    btn.className = 'donate-preset' + (i === activePanelPreset ? ' is-selected' : '');
    btn.textContent = fmt(v);
    btn.dataset.idx = String(i);
    btn.addEventListener('click', function () {
      activePanelPreset = i;
      donatePanelPresets.querySelectorAll('.donate-preset').forEach(function (b) { b.classList.remove('is-selected'); });
      btn.classList.add('is-selected');
      donatePanelCta.dataset.preset = String(i);
    });
    donatePanelPresets.appendChild(btn);
  });
  donatePanelCta.dataset.preset = String(activePanelPreset);
  document.querySelectorAll('.donate__tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.donate__tab').forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      activeDonateTab = tab.dataset.donateTab;
      renderDonatePanel();
    });
  });
  renderDonatePanel();
})();
