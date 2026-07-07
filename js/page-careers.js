/* Careers page — filterable openings grid */
(function () {
  'use strict';
  var CAREERS = [
    { title: 'Programme Officer — WASH', tag: 'vacancy', label: 'VACANCY', meta: 'Maiduguri, Borno · Full-time' },
    { title: 'Health Programme Manager', tag: 'vacancy', label: 'VACANCY', meta: 'Maiduguri, Borno · Full-time' },
    { title: 'Monitoring & Evaluation Intern', tag: 'internship', label: 'INTERNSHIP', meta: 'Maiduguri, Borno · 6 months' },
    { title: 'Communications Intern', tag: 'internship', label: 'INTERNSHIP', meta: 'Remote · 3 months' },
    { title: 'Community Health Volunteer', tag: 'volunteer', label: 'VOLUNTEER', meta: 'Borno State · Flexible' },
    { title: 'Distribution Day Volunteer', tag: 'volunteer', label: 'VOLUNTEER', meta: 'Maiduguri, Borno · Ad hoc' },
    { title: 'Nutrition Assessment Consultant', tag: 'consultancy', label: 'CONSULTANCY', meta: 'Remote / Field · 3 months' },
    { title: 'Livelihoods Impact Evaluator', tag: 'consultancy', label: 'CONSULTANCY', meta: 'Remote / Field · 2 months' }
  ];

  var grid = document.getElementById('careers-full-grid');
  CAREERS.forEach(function (c) {
    var card = document.createElement('div');
    card.className = 'career-card';
    card.dataset.tag = c.tag;
    card.innerHTML =
      '<div class="career-card__info"><span class="career-card__tag">' + c.label + '</span><span class="career-card__title">' + c.title + '</span><span class="career-card__meta">' + c.meta + '</span></div>' +
      '<a class="ds-btn ds-btn--secondary ds-btn--md" href="mailto:info@heart4humanityinitiative.org?subject=' + encodeURIComponent('Application: ' + c.title) + '">Apply</a>';
    grid.appendChild(card);
  });

  document.getElementById('careers-filters').addEventListener('click', function (e) {
    var chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#careers-filters .filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    var filter = chip.dataset.careerFilter;
    grid.querySelectorAll('.career-card').forEach(function (card) {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.tag !== filter);
    });
  });
})();
