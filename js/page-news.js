/* News page — featured article + filterable grid + load more */
(function () {
  'use strict';
  var NEWS_FEATURED = { pill: 'FIELD UPDATE', date: 'July 28, 2025', title: 'Relief outreach brings food support to displaced families', desc: 'Our volunteers delivered food packages to families sheltering in temporary accommodation around Maiduguri — part of our ongoing commitment to the communities most affected by displacement.', image: 'assets/photo-relief.jpg' };

  var NEWS = [
    { pill: 'FIELD UPDATE', date: 'Aug 6, 2025', title: 'WASH kits distributed to displaced households in Zone A', image: 'assets/other/wash/kit2.jpeg', cat: 'field' },
    { pill: 'FIELD UPDATE', date: 'Jul 30, 2025', title: 'Volunteers join community-wide sanitation exercise across Maiduguri', image: 'assets/other/wash/sa1.jpeg', cat: 'field' },
    { pill: 'PARTNERSHIP', date: 'Jul 12, 2025', title: 'New partnership expands mobile health outreach', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80', cat: 'partnership' },
    { pill: 'ANNOUNCEMENT', date: 'Jun 30, 2025', title: 'Applications open for 2025 girls’ scholarship cohort', image: 'assets/photo-education.jpg', cat: 'announcement' },
    { pill: 'FIELD UPDATE', date: 'Jun 18, 2025', title: 'Solar boreholes restore water access in Bama', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80', cat: 'field' },
    { pill: 'FIELD UPDATE', date: 'May 22, 2025', title: 'Nutrition teams reach 3,000 children in outreach drive', image: 'https://images.unsplash.com/photo-1694286068158-836b3aec0599?auto=format&fit=crop&w=700&q=80', cat: 'field' },
    { pill: 'PARTNERSHIP', date: 'Apr 30, 2025', title: 'Green Earth Initiative joins our climate resilience work', image: 'assets/photo-training.jpg', cat: 'partnership' },
    { pill: 'ANNOUNCEMENT', date: 'Mar 14, 2025', title: 'Heart for Humanity opens second field office', image: 'assets/photo-relief.jpg', cat: 'announcement' },
    { pill: 'FIELD UPDATE', date: 'Feb 20, 2025', title: 'Protection teams open two new safe spaces', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=700&q=80', cat: 'field' },
    { pill: 'PARTNERSHIP', date: 'Jan 15, 2025', title: 'Tech for Good Alliance backs our M&E systems', image: 'assets/photo-education.jpg', cat: 'partnership' }
  ];

  document.getElementById('news-featured').innerHTML =
    '<article class="news-feature">' +
      '<div class="news-feature__media"><img src="' + NEWS_FEATURED.image + '" alt=""></div>' +
      '<div class="news-feature__body">' +
        '<div class="news-feature__meta"><span class="news-feature__pill">' + NEWS_FEATURED.pill + '</span><span class="news-feature__date">' + NEWS_FEATURED.date + '</span></div>' +
        '<h3 class="news-feature__title">' + NEWS_FEATURED.title + '</h3>' +
        '<p class="news-feature__desc">' + NEWS_FEATURED.desc + '</p>' +
      '</div>' +
    '</article>';

  var newsGrid = document.getElementById('news-grid');
  var PAGE_SIZE = 4;
  NEWS.forEach(function (n, i) {
    var card = document.createElement('article');
    card.className = 'news-card' + (i >= PAGE_SIZE ? ' is-hidden' : '');
    card.dataset.cat = n.cat;
    card.dataset.page = String(Math.floor(i / PAGE_SIZE));
    card.innerHTML = '<div class="news-card__media"><img src="' + n.image + '" alt="" loading="lazy"></div><div class="news-card__body"><span class="news-card__pill">' + n.pill + '</span><h4 class="news-card__title">' + n.title + '</h4><span class="news-card__date">' + n.date + '</span></div>';
    newsGrid.appendChild(card);
  });

  var newsMoreBtn = document.getElementById('news-more');
  var visiblePages = 1;
  var totalPages = Math.ceil(NEWS.length / PAGE_SIZE);
  function applyNewsFilter(filter) {
    newsGrid.querySelectorAll('.news-card').forEach(function (card) {
      var catMatch = filter === 'all' || card.dataset.cat === filter;
      var pageMatch = Number(card.dataset.page) < visiblePages;
      card.classList.toggle('is-hidden', !catMatch || !pageMatch);
    });
    newsMoreBtn.hidden = visiblePages >= totalPages;
  }
  document.getElementById('news-filters').addEventListener('click', function (e) {
    var chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('#news-filters .filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
    chip.classList.add('is-active');
    visiblePages = 1;
    applyNewsFilter(chip.dataset.newsFilter);
  });
  newsMoreBtn.addEventListener('click', function () {
    visiblePages++;
    var activeFilter = document.querySelector('#news-filters .filter-chip.is-active').dataset.newsFilter;
    applyNewsFilter(activeFilter);
  });
  applyNewsFilter('all');
})();
