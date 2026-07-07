/* Events page — Upcoming / Past tabs */
(function () {
  'use strict';
  var UPCOMING = [
    { day: '15', month: 'AUG', title: 'Community Health Fair', meta: 'Maiduguri, Borno · 9:00 AM', desc: 'Free health screenings, nutrition counselling and vaccination drives open to the public.' },
    { day: '05', month: 'SEP', title: "Girls' Education Fundraiser Gala", meta: 'Abuja, FCT · 6:00 PM', desc: 'An evening of stories and giving to support our 2026 scholarship cohort.' },
    { day: '12', month: 'OCT', title: 'Clean Water Advocacy Walk', meta: 'Bama, Borno · 7:00 AM', desc: 'A community walk raising awareness for WASH infrastructure needs across Borno State.' }
  ];
  var PAST = [
    { day: '20', month: 'JUN', title: 'Annual Report Launch', meta: 'Maiduguri, Borno', desc: 'Sharing our 2025 impact report with partners and the community.' },
    { day: '10', month: 'APR', title: 'Volunteer Appreciation Day', meta: 'Maiduguri, Borno', desc: 'Celebrating the 240+ volunteers who make our work possible.' },
    { day: '08', month: 'FEB', title: 'Partnership Signing: Green Earth Initiative', meta: 'Maiduguri, Borno', desc: 'Formalizing our climate resilience partnership for the year ahead.' }
  ];

  function renderList(container, events, isPast) {
    events.forEach(function (e) {
      var card = document.createElement('div');
      card.className = 'event-card' + (isPast ? ' event-card__past' : '');
      card.innerHTML =
        '<div class="event-card__date"><span class="event-card__day">' + e.day + '</span><span class="event-card__month">' + e.month + '</span></div>' +
        '<div class="event-card__body"><span class="event-card__title">' + e.title + '</span><span class="event-card__meta">' + e.meta + '</span><span class="event-card__desc">' + e.desc + '</span></div>' +
        (isPast
          ? '<span class="ds-btn ds-btn--secondary ds-btn--md event-card__cta" style="pointer-events:none;opacity:.7">Completed</span>'
          : '<a class="ds-btn ds-btn--primary ds-btn--md event-card__cta" href="mailto:info@heart4humanityinitiative.org?subject=' + encodeURIComponent('RSVP: ' + e.title) + '">RSVP</a>');
      container.appendChild(card);
    });
  }

  var upcomingList = document.getElementById('events-upcoming');
  var pastList = document.getElementById('events-past');
  renderList(upcomingList, UPCOMING, false);
  renderList(pastList, PAST, true);

  document.querySelectorAll('.events__tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.events__tab').forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var target = tab.dataset.eventsTab;
      upcomingList.classList.toggle('is-hidden', target !== 'upcoming');
      pastList.classList.toggle('is-hidden', target !== 'past');
    });
  });
})();
