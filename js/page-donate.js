/* Donate page — calculator + tabs + panel */
(function () {
  'use strict';
  var fmt = window.H4H.fmt;
  var PRESET_VALUES = [10000, 25000, 50000, 100000];

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
