/* Publications page — full library + search */
(function () {
  'use strict';
  var PUBLICATIONS = [
    { title: 'Annual Report 2025', cat: 'Annual Report', date: 'Jan 2026', image: 'assets/photo-relief.jpg' },
    { title: 'Rapid Needs Assessment — Borno State', cat: 'Assessment', date: 'Sep 2025', image: 'assets/photo-education.jpg' },
    { title: 'Livelihoods Impact Study', cat: 'Research', date: 'Jul 2025', image: 'assets/photo-training.jpg' },
    { title: "Case Study: Girls' Education Retention", cat: 'Case Study', date: 'May 2025', image: 'assets/photo-education.jpg' },
    { title: 'Learning Brief: WASH in Displacement Camps', cat: 'Learning Brief', date: 'Mar 2025', image: 'assets/photo-relief.jpg' },
    { title: 'Health Outreach Programme Review', cat: 'Assessment', date: 'Jan 2025', image: 'assets/photo-training.jpg' },
    { title: 'Annual Report 2024', cat: 'Annual Report', date: 'Jan 2025', image: 'assets/photo-relief.jpg' },
    { title: 'Nutrition Recovery Outcomes Study', cat: 'Research', date: 'Nov 2024', image: 'assets/photo-education.jpg' },
    { title: 'Case Study: Solar Boreholes in Bama', cat: 'Case Study', date: 'Sep 2024', image: 'assets/photo-training.jpg' },
    { title: 'Learning Brief: Protection Case Management', cat: 'Learning Brief', date: 'Jun 2024', image: 'assets/photo-relief.jpg' }
  ];

  var pubGrid = document.getElementById('publications-grid');
  var pubEmpty = document.getElementById('publications-empty');
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  PUBLICATIONS.forEach(function (p) {
    var card = document.createElement('article');
    card.className = 'pub-card';
    card.dataset.title = p.title.toLowerCase();
    card.dataset.cat = p.cat.toLowerCase();
    card.innerHTML =
      '<div class="pub-card__media"><img src="' + p.image + '" alt="" loading="lazy"></div>' +
      '<div class="pub-card__body">' +
        '<span class="pub-card__tag">' + p.cat + '</span>' +
        '<h3 class="pub-card__title">' + p.title + '</h3>' +
        '<span class="pub-card__date">' + p.date + '</span>' +
        '<button class="pub-card__cta" data-request-report="' + esc(p.title) + '">Download PDF ' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 20h14"/></svg></button>' +
      '</div>';
    pubGrid.appendChild(card);
  });

  pubGrid.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-request-report]');
    if (!btn) return;
    window.location.href = 'mailto:info@heart4humanityinitiative.org?subject=' + encodeURIComponent('Report request: ' + btn.dataset.requestReport);
  });

  var catFilter = 'all';
  var searchInput = document.getElementById('pub-search');
  function applyFilters() {
    var q = searchInput.value.trim().toLowerCase();
    var visible = 0;
    pubGrid.querySelectorAll('.pub-card').forEach(function (card) {
      var matchQ = !q || card.dataset.title.indexOf(q) > -1 || card.dataset.cat.indexOf(q) > -1;
      var matchCat = catFilter === 'all' || card.dataset.cat === catFilter;
      var match = matchQ && matchCat;
      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
    pubEmpty.hidden = visible > 0;
  }
  searchInput.addEventListener('input', applyFilters);
  document.getElementById('pub-filters').addEventListener('click', function (e) {
    var chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#pub-filters .filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    catFilter = chip.dataset.pubFilter;
    applyFilters();
  });
})();
