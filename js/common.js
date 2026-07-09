/* Heart for Humanity Initiative — shared site chrome (every page)
   Nav, theme toggle, donate modal, chatbot, reveals, counters, floating UI. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EMAIL_RE = /.+@.+\..+/;
  function fmt(v) { return '₦' + (Number.isInteger(v) ? v.toLocaleString('en-US') : v.toFixed(2)); }
  window.H4H = window.H4H || {};
  window.H4H.fmt = fmt;

  /* ============================================================
     DARK MODE
     ============================================================ */
  var themeToggle = document.getElementById('theme-toggle');
  var storedTheme = null;
  try { storedTheme = localStorage.getItem('h4h-theme'); } catch (e) {}
  if (storedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('h4h-theme', isDark ? 'light' : 'dark'); } catch (e) {}
    });
  }

  /* ============================================================
     HEADER — scroll state, dropdown nav, mobile menu
     ============================================================ */
  var header = document.getElementById('site-header');
  if (header) {
    function updateHeaderScroll() { header.classList.toggle('is-scrolled', window.scrollY > 60); }
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();
  }

  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));
  navItems.forEach(function (item) {
    var btn = item.querySelector('.nav-link--btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !item.classList.contains('is-open');
      navItems.forEach(function (i) { i.classList.remove('is-open'); });
      if (willOpen) item.classList.add('is-open');
    });
  });
  document.addEventListener('click', function () { navItems.forEach(function (i) { i.classList.remove('is-open'); }); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') navItems.forEach(function (i) { i.classList.remove('is-open'); }); });

  var burger = document.getElementById('nav-burger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('button')) {
        mobileMenu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================
     GENERIC ANIMATED COUNTERS — any [data-count] element
     ============================================================ */
  function animateOne(el) {
    var target = Number(el.dataset.count);
    function text(v, final) { return v.toLocaleString('en-US') + (final ? (el.dataset.suffix || '') : ''); }
    if (reduceMotion) { el.textContent = text(target, true); return; }
    var start = performance.now();
    var dur = 1700;
    function tick(now) {
      var k = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = text(Math.round(target * e), k >= 1);
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    setTimeout(function () { el.textContent = text(target, true); }, dur + 700);
  }
  window.H4H.animateOne = animateOne;

  (function setupCounters() {
    var nums = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (!nums.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) { nums.forEach(animateOne); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateOne(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ============================================================
     SCROLL REVEALS — any [data-reveal] element
     ============================================================ */
  var revealIO = null;
  function reveal(el) { el.classList.add('is-revealed'); }
  function observeReveals(root) {
    var scope = root || document;
    var els = Array.prototype.slice.call(scope.querySelectorAll('[data-reveal]'));
    if (root && root.hasAttribute && root.hasAttribute('data-reveal')) els.push(root);
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(reveal); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); revealIO.unobserve(en.target); } });
      }, { threshold: 0.12 });
    }
    var vh = window.innerHeight;
    els.forEach(function (el) {
      if (el.classList.contains('is-revealed')) return;
      if (el.getBoundingClientRect().top <= vh * 0.88) reveal(el);
      else revealIO.observe(el);
    });
  }
  window.H4H.observeReveals = observeReveals;
  observeReveals();

  /* ============================================================
     FLOATING UI — donate button + back to top
     ============================================================ */
  var floatingDonate = document.getElementById('floating-donate');
  var backToTop = document.getElementById('back-to-top');
  if (floatingDonate || backToTop) {
    window.addEventListener('scroll', function () {
      if (floatingDonate) floatingDonate.hidden = window.scrollY < window.innerHeight * 0.7;
      if (backToTop) backToTop.hidden = window.scrollY < 500;
    }, { passive: true });
  }
  if (backToTop) backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ============================================================
     NEWSLETTER (footer, present on every page)
     ============================================================ */
  var subEmail = document.getElementById('sub-email');
  var subBtn = document.getElementById('sub-btn');
  if (subEmail && subBtn) {
    subEmail.addEventListener('input', function () { subBtn.disabled = !EMAIL_RE.test(subEmail.value); });
    subBtn.addEventListener('click', function () {
      if (!EMAIL_RE.test(subEmail.value)) return;
      document.getElementById('newsletter-form').hidden = true;
      document.getElementById('newsletter-done').hidden = false;
    });
    subEmail.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !subBtn.disabled) subBtn.click(); });
  }

  /* ============================================================
     CONTACT FORM (contact.html)
     ============================================================ */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('cf-success').hidden = false;
      this.reset();
    });
  }

  /* ============================================================
     DONATE MODAL — 4-step flow (global on every page)
     ============================================================ */
  var modal = document.getElementById('donate-modal');
  if (modal) {
    var PRESET_VALUES = [10000, 25000, 50000, 100000];
    var IMPACT_TEXT = [
      'Provides school supplies for two children.',
      'Covers health check-ups for five people.',
      'Opens clean water access for a family.',
      'Seeds a small-business grant for one woman.'
    ];

    var modalCard = modal.querySelector('.modal');
    var steps = modal.querySelectorAll('.modal__step');
    var progress = document.getElementById('modal-progress');
    var segs = modal.querySelectorAll('.modal__seg');
    var labs = modal.querySelectorAll('.modal__seg-labels span');
    var presetGrid = document.getElementById('preset-grid');
    var customInput = document.getElementById('custom-amt');
    var impactLine = document.getElementById('impact-line');
    var step1Next = document.getElementById('step1-next');
    var step2Next = document.getElementById('step2-next');
    var step3Next = document.getElementById('step3-next');
    var freqOnce = document.getElementById('freq-once');
    var freqMonthly = document.getElementById('freq-monthly');
    var freqLine = document.getElementById('freq-line');
    var nameInput = document.getElementById('don-name');
    var emailInput = document.getElementById('don-email');
    var honorInput = document.getElementById('don-honor');
    var anonInput = document.getElementById('don-anon');
    var processingBox = document.getElementById('modal-processing');
    var doneBox = document.getElementById('modal-done');

    var DEFAULT_PRESET_IDX = 1;
    var donation = { step: 1, presetIdx: DEFAULT_PRESET_IDX, custom: '', useCustom: false, freq: 'once', done: false };
    var processTimer = null;
    var lastFocused = null;

    PRESET_VALUES.forEach(function (v, i) {
      var card = document.createElement('button');
      card.className = 'preset-card';
      card.dataset.idx = String(i);
      card.innerHTML = '<span class="preset-card__amount">' + fmt(v) + '</span><span class="preset-card__impact">' + IMPACT_TEXT[i] + '</span>';
      card.addEventListener('click', function () {
        donation.presetIdx = i; donation.useCustom = false; donation.custom = ''; customInput.value = ''; renderModal();
      });
      presetGrid.appendChild(card);
    });

    customInput.addEventListener('input', function () { donation.custom = customInput.value; donation.useCustom = true; renderModal(); });
    customInput.addEventListener('focus', function () { donation.useCustom = true; renderModal(); });

    function effAmount() {
      if (donation.useCustom) {
        var v = parseFloat(donation.custom);
        return isNaN(v) || v <= 0 ? 0 : v;
      }
      return PRESET_VALUES[donation.presetIdx];
    }

    function renderModal() {
      var amt = effAmount();
      steps.forEach(function (s) { s.classList.toggle('is-active', Number(s.dataset.step) === donation.step); });
      progress.hidden = donation.step >= 4;
      segs.forEach(function (seg) { seg.classList.toggle('is-on', donation.step >= Number(seg.dataset.seg)); });
      labs.forEach(function (lab) { lab.classList.toggle('is-on', donation.step === Number(lab.dataset.lab)); });
      var cards = presetGrid.children;
      for (var c = 0; c < cards.length; c++) cards[c].classList.toggle('is-selected', !donation.useCustom && donation.presetIdx === Number(cards[c].dataset.idx));
      impactLine.textContent = donation.useCustom
        ? (amt > 0 ? 'Every naira of your ' + fmt(amt) + ' goes where it’s needed most.' : 'Enter an amount to see its impact.')
        : IMPACT_TEXT[donation.presetIdx];
      step1Next.textContent = amt > 0 ? 'Continue with ' + fmt(amt) : 'Choose an amount';
      step1Next.disabled = amt <= 0;
      freqOnce.classList.toggle('is-selected', donation.freq === 'once');
      freqMonthly.classList.toggle('is-selected', donation.freq === 'monthly');
      freqLine.textContent = donation.freq === 'monthly' ? fmt(amt) + ' a month keeps programmes running all year.' : 'One-time gifts fund the most urgent needs first.';
      var detailsOk = nameInput.value.trim() !== '' && EMAIL_RE.test(emailInput.value);
      step3Next.textContent = 'Complete ' + (donation.freq === 'monthly' ? 'monthly' : 'one-time') + ' gift · ' + fmt(amt);
      step3Next.disabled = !detailsOk;
    }

    function openDonate(presetIdx) {
      lastFocused = document.activeElement;
      donation.step = 1;
      donation.done = false;
      if (typeof presetIdx === 'number' && !isNaN(presetIdx)) {
        donation.presetIdx = presetIdx; donation.useCustom = false; donation.custom = ''; customInput.value = '';
      }
      processingBox.hidden = false;
      doneBox.hidden = true;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      renderModal();
      modalCard.scrollTop = 0;
      var firstBtn = presetGrid.querySelector('.is-selected') || presetGrid.firstChild;
      if (firstBtn) firstBtn.focus();
    }
    window.H4H.openDonate = openDonate;

    function closeModal() {
      clearTimeout(processTimer);
      modal.hidden = true;
      document.body.style.overflow = '';
      if (donation.done) {
        donation = { step: 1, presetIdx: DEFAULT_PRESET_IDX, custom: '', useCustom: false, freq: 'once', done: false };
        customInput.value = ''; nameInput.value = ''; emailInput.value = ''; honorInput.value = ''; anonInput.checked = false;
      }
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function goNext() {
      if (donation.step === 1 && effAmount() > 0) donation.step = 2;
      else if (donation.step === 2) donation.step = 3;
      else if (donation.step === 3 && nameInput.value.trim() && EMAIL_RE.test(emailInput.value)) {
        donation.step = 4;
        renderModal();
        processingBox.hidden = false;
        doneBox.hidden = true;
        processTimer = setTimeout(finishDonation, 1100);
        return;
      }
      renderModal();
    }

    function finishDonation() {
      donation.done = true;
      var amt = effAmount();
      var first = anonInput.checked ? 'friend' : (nameInput.value.trim().split(' ')[0] || 'friend');
      document.getElementById('thanks-heading').textContent = 'Thank you, ' + first + '.';
      document.getElementById('thanks-summary').textContent = fmt(amt) + ' · ' + (donation.freq === 'monthly' ? 'Monthly' : 'One-time') + ' gift to Heart for Humanity Initiative';
      var honor = honorInput.value.trim();
      var honorEl = document.getElementById('thanks-honor');
      honorEl.hidden = !honor;
      if (honor) honorEl.textContent = 'Dedicated in honor of ' + honor;
      processingBox.hidden = true;
      doneBox.hidden = false;
    }

    step1Next.addEventListener('click', goNext);
    step2Next.addEventListener('click', goNext);
    step3Next.addEventListener('click', goNext);
    modal.querySelectorAll('[data-back]').forEach(function (b) { b.addEventListener('click', function () { donation.step = Math.max(1, donation.step - 1); renderModal(); }); });
    freqOnce.addEventListener('click', function () { donation.freq = 'once'; renderModal(); });
    freqMonthly.addEventListener('click', function () { donation.freq = 'monthly'; renderModal(); });
    [nameInput, emailInput].forEach(function (inp) { inp.addEventListener('input', renderModal); });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-done-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-donate]');
      if (!btn) return;
      var preset = btn.dataset.preset !== undefined ? Number(btn.dataset.preset) : undefined;
      openDonate(preset);
    });
  }

  /* ============================================================
     VIDEO PLACEHOLDER MODAL (used on impact.html stories)
     ============================================================ */
  var videoModal = document.getElementById('video-modal');
  if (videoModal) {
    document.getElementById('video-modal-close').addEventListener('click', function () { videoModal.hidden = true; });
    videoModal.addEventListener('click', function (e) { if (e.target === videoModal) videoModal.hidden = true; });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !videoModal.hidden) videoModal.hidden = true; });
    window.H4H.openVideoModal = function (title) {
      document.getElementById('video-modal-title').textContent = title || 'Video testimonial';
      videoModal.hidden = false;
    };
  }

  /* ============================================================
     CHATBOT — floating assistant with canned, keyword-matched replies
     ============================================================ */
  var chatToggle = document.getElementById('chat-toggle');
  if (chatToggle) {
    var chatPanel = document.getElementById('chat-panel');
    var chatBody = document.getElementById('chat-body');
    var chatForm = document.getElementById('chat-form');
    var chatInput = document.getElementById('chat-input');
    var chatBadge = document.getElementById('chat-badge');

    var RULES = [
      { test: /donat|give|gift|contribut/i, reply: 'You can give a one-time or monthly gift on our <a href="donate.html">Donate page</a> — every amount is tracked to a programme. Want me to open the quick-donate form instead?', quick: 'Open donate form' },
      { test: /volunteer/i, reply: 'We\'d love your help! Community Health Volunteer roles are usually open in Borno State — see <a href="careers.html">Careers</a> for current opportunities, or email us directly.' },
      { test: /program|programme|work|health|nutrition|wash|water|education|school|protection|fsl|food|livelihood/i, reply: 'We work across six areas — Health, Nutrition, WASH, Education, Protection and FSL. Check out our <a href="programs-health.html">Health</a>, <a href="programs-nutrition.html">Nutrition</a>, <a href="programs-wash.html">WASH</a>, <a href="programs-education.html">Education</a>, <a href="programs-protection.html">Protection</a> or <a href="programs-fsl.html">FSL</a> pages.' },
      { test: /contact|reach|email|phone|call/i, reply: 'You can reach us at <a href="mailto:info@heart4humanityinitiative.org">info@heart4humanityinitiative.org</a> or +234 706 875 5825 — or use our <a href="contact.html">Contact page</a>.' },
      { test: /career|job|vacanc|intern|consult|apply/i, reply: 'Current vacancies, internships and consultancies are listed on our <a href="careers.html">Careers page</a>.' },
      { test: /partner/i, reply: 'We partner with UN agencies, government, INGOs, foundations and corporates. See <a href="partners.html">Partners</a> or email us to start a conversation.' },
      { test: /report|publication|research|assessment/i, reply: 'Our reports and research are on the <a href="publications.html">Publications</a> page — you can search by title or category there.' },
      { test: /impact|result|number|statistic|beneficiar/i, reply: 'Our full Impact Dashboard — people reached, water points built, schools rehabilitated and more — is on the <a href="impact.html">Impact page</a>.' },
      { test: /about|who|mission|vision|history|story/i, reply: 'We\'re a non-profit based in Maiduguri, Borno State. Read more on our <a href="about.html">About page</a>.' },
      { test: /hi|hello|hey/i, reply: 'Hello! I can help with donations, programmes, careers, or getting in touch. What would you like to know?' }
    ];
    var FALLBACK = 'I might not have a canned answer for that yet — this is a demo assistant. For anything specific, please <a href="mailto:info@heart4humanityinitiative.org">email our team</a> and we\'ll get right back to you.';

    var QUICK_REPLIES = ['How do I donate?', 'What programmes do you run?', 'How can I volunteer?', 'Contact information'];

    function addMessage(text, from) {
      var row = document.createElement('div');
      row.className = 'chat-msg chat-msg--' + from;
      row.innerHTML = text;
      chatBody.appendChild(row);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function respond(text) {
      addMessage(esc(text), 'user');
      var matched = RULES.find(function (r) { return r.test.test(text); });
      setTimeout(function () {
        addMessage(matched ? matched.reply : FALLBACK, 'bot');
      }, 420);
    }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

    var opened = false;
    chatToggle.addEventListener('click', function () {
      opened = !opened;
      chatPanel.classList.toggle('is-open', opened);
      chatToggle.setAttribute('aria-expanded', String(opened));
      if (opened && chatBadge) chatBadge.hidden = true;
      if (opened) chatInput.focus();
    });
    document.getElementById('chat-close').addEventListener('click', function () {
      opened = false;
      chatPanel.classList.remove('is-open');
      chatToggle.setAttribute('aria-expanded', 'false');
    });

    var quickWrap = document.getElementById('chat-quick-replies');
    QUICK_REPLIES.forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat-quick';
      b.textContent = q;
      b.addEventListener('click', function () { respond(q); });
      quickWrap.appendChild(b);
    });

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = chatInput.value.trim();
      if (!v) return;
      respond(v);
      chatInput.value = '';
    });
  }
})();
