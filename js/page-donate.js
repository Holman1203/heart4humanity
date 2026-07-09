/* Donate page — "Choose Your Impact" amount tiles + payment method + bank transfer details */
(function () {
  'use strict';
  var fmt = window.H4H.fmt;

  var TILES = [
    { amount: 10000, desc: 'Feed a family for a week — all seven of them.' },
    { amount: 25000, desc: 'School supplies for 5 displaced children.' },
    { amount: 50000, desc: 'Clean water for one household for a season.' },
    { amount: 100000, desc: 'A complete healthcare kit for 10 beneficiaries.' },
    { amount: 250000, desc: 'Sponsor an entire WASH outreach for a week.' },
    { amount: 'custom', label: 'Custom', desc: 'Every naira, every decision counts.' }
  ];
  var METHODS = [
    { id: 'card', label: 'Card', icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>' },
    { id: 'bank', label: 'Bank', icon: '<path d="M3 21h18"/><path d="M4 21V10l8-6 8 6v11"/><path d="M9 21v-6h6v6"/>' },
    { id: 'ussd', label: 'USSD', icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/>' }
  ];

  var tilesEl = document.getElementById('impact-tiles');
  var customWrap = document.getElementById('impact-custom-wrap');
  var customInput = document.getElementById('impact-custom');
  var bannerEl = document.getElementById('impact-banner');
  var methodsEl = document.getElementById('impact-methods');
  var bankEl = document.getElementById('impact-bank');
  var secureEl = document.getElementById('impact-secure');
  var ctaEl = document.getElementById('impact-cta');
  if (!tilesEl) return;

  var state = { tileIdx: 1, custom: '', method: 'ussd' };

  function icon(inner) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  function effAmount() {
    var t = TILES[state.tileIdx];
    if (t.amount === 'custom') {
      var v = parseFloat(state.custom);
      return isNaN(v) || v <= 0 ? 0 : v;
    }
    return t.amount;
  }

  function render() {
    var amt = effAmount();
    var tile = TILES[state.tileIdx];

    tilesEl.querySelectorAll('.impact-tile').forEach(function (el, i) { el.classList.toggle('is-selected', i === state.tileIdx); });
    customWrap.hidden = tile.amount !== 'custom';

    if (tile.amount === 'custom') {
      bannerEl.innerHTML = icon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>') + '<span>' + (amt > 0 ? tile.desc : 'Enter an amount above to continue.') + '</span>';
    } else {
      bannerEl.innerHTML = icon('<circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>') + '<span>' + tile.desc + '</span>';
    }

    methodsEl.querySelectorAll('.impact-method').forEach(function (el) { el.classList.toggle('is-selected', el.dataset.method === state.method); });
    var isBank = state.method === 'bank';
    bankEl.hidden = !isBank;
    secureEl.hidden = isBank;

    if (isBank) {
      ctaEl.textContent = 'I’ve Sent My Transfer';
      ctaEl.onclick = function () { window.location.href = 'mailto:info@heart4humanityinitiative.org?subject=' + encodeURIComponent('Bank Transfer Notification — ' + (amt > 0 ? fmt(amt) : '')); };
      ctaEl.disabled = false;
    } else {
      ctaEl.textContent = amt > 0 ? 'Donate ' + fmt(amt) + ' via Paystack' : 'Choose an amount';
      ctaEl.disabled = amt <= 0;
      ctaEl.onclick = function () {
        if (amt > 0 && window.H4H.openDonateAmount) window.H4H.openDonateAmount(amt);
      };
    }
  }

  TILES.forEach(function (t, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'impact-tile';
    btn.innerHTML = '<span class="impact-tile__amount">' + (t.amount === 'custom' ? 'Custom' : fmt(t.amount)) + '</span><span class="impact-tile__desc">' + t.desc + '</span>';
    btn.addEventListener('click', function () { state.tileIdx = i; render(); if (t.amount === 'custom') customInput.focus(); });
    tilesEl.appendChild(btn);
  });

  customInput.addEventListener('input', function () { state.custom = customInput.value; render(); });

  METHODS.forEach(function (m) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'impact-method';
    btn.dataset.method = m.id;
    btn.innerHTML = icon(m.icon) + '<span>' + m.label + '</span>';
    btn.addEventListener('click', function () { state.method = m.id; render(); });
    methodsEl.appendChild(btn);
  });

  bankEl.addEventListener('click', function (e) {
    var copyBtn = e.target.closest('[data-copy]');
    if (!copyBtn) return;
    var text = copyBtn.getAttribute('data-copy');
    var done = function () { var orig = copyBtn.textContent; copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = orig; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  });

  render();
})();
