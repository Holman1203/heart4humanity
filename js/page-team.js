/* Team page — grouped member profile cards + profile modal */
(function () {
  'use strict';

  var EMAIL_DOMAIN = 'heart4humanityinitiative.org';

  function slugEmail(name) {
    var parts = name.toLowerCase().replace(/[^a-z\s]/g, '').trim().split(/\s+/);
    return parts.join('.') + '@' + EMAIL_DOMAIN;
  }

  var TEAM = [
    {
      group: 'Leadership',
      members: [
        { name: 'Rebecca Yakubu', role: 'Executive Director', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/pc.jpeg', bio: 'Leads HHI’s strategy, partnerships and organisational growth as a women-led, youth-driven non-profit.', bioFull: 'Rebecca sets the strategic direction for Heart for Humanity Initiative, builds relationships with donors and government partners, and champions a women-led, youth-driven model for humanitarian response across the Northeast and Northwest.', tags: ['Strategy', 'Partnerships', 'Governance'] },
        { name: 'Hyelafiya Sani', role: 'Head of Office & Programmes', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/sani.jpeg', bio: 'Oversees programme design and delivery across all thematic sectors and field locations.', bioFull: 'Hyelafiya leads day-to-day programme design, quality and delivery across Health, Nutrition, WASH, Education, Protection, FSL and Peacebuilding, coordinating field teams across all seven states of operation.', tags: ['Programme Design', 'Field Operations', 'MEAL'], phone: '+2348038666193' }
      ]
    },
    {
      group: 'Programmes',
      members: [
        { name: 'Aisha Bukar', role: 'Health Lead', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Coordinates mobile clinics, screenings and primary health outreach.', bioFull: 'Aisha coordinates HHI’s mobile clinics, health screenings and primary healthcare outreach, working closely with state health authorities to reach underserved communities.', tags: ['Primary Healthcare', 'Mobile Clinics', 'Immunisation'] },
        { name: 'Grace Adamu', role: 'Nutrition Lead', location: 'Konduga, Borno', tenure: 'Since 2025', bio: 'Leads community-based malnutrition screening and therapeutic feeding.', bioFull: 'Grace leads community-based management of acute malnutrition, running screening drives and therapeutic feeding programmes for children under five and pregnant and lactating women.', tags: ['Malnutrition Screening', 'IYCF', 'Therapeutic Feeding'] },
        { name: 'Ibrahim Modu', role: 'WASH Lead', location: 'Bama, Borno', tenure: 'Since 2025', bio: 'Manages clean water, sanitation and hygiene promotion in camps and host communities.', bioFull: 'Ibrahim manages the construction and rehabilitation of water points, latrines and hygiene promotion campaigns across displacement camps and host communities.', tags: ['Water Systems', 'Hygiene Promotion', 'Sanitation'] },
        { name: 'Fatima Bello', role: 'Education Lead', location: 'Yola, Adamawa', tenure: 'Since 2025', bio: 'Runs scholarships, learning materials and girls’ retention programmes.', bioFull: 'Fatima runs HHI’s scholarship scheme, learning-materials distribution and girls’ retention initiatives, working with schools to keep conflict-affected children in class.', tags: ['Girls’ Education', 'Scholarships', 'Learning Materials'] },
        { name: 'Zainab Musa', role: 'Protection Lead', location: 'Jere, Borno', tenure: 'Since 2025', bio: 'Directs case management, psychosocial support and safe spaces.', bioFull: 'Zainab directs case management, psychosocial support and safe-space programming for survivors of violence and vulnerable children across HHI’s protection sites.', tags: ['Case Management', 'GBV Response', 'Psychosocial Support'] },
        { name: 'Emmanuel Yusuf', role: 'Food Security & Livelihoods Lead', location: 'Dikwa, Borno', tenure: 'Since 2025', photo: 'assets/Team/pm.jpeg', bio: 'Leads food distribution, savings groups and vocational training.', bioFull: 'Emmanuel leads food and cash distributions, village savings and loan associations, and vocational training that helps households rebuild sustainable livelihoods.', tags: ['Food Distribution', 'Livelihoods', 'VSLA'] },
        { name: 'Maryam Ali', role: 'Peacebuilding Lead', location: 'Dikwa, Borno', tenure: 'Since 2025', bio: 'Facilitates dialogue, youth engagement and trauma-healing initiatives.', bioFull: 'Maryam facilitates inter-community dialogue forums, youth engagement programmes and trauma-healing initiatives that help conflict-affected communities rebuild trust.', tags: ['Dialogue Facilitation', 'Youth Engagement', 'Trauma Healing'] }
      ]
    },
    {
      group: 'Operations & Support',
      members: [
        { name: 'Halima Kolo', role: 'HR & Admin Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Supports recruitment, welfare and day-to-day operations.', bioFull: 'Halima manages recruitment, staff welfare and day-to-day administration, keeping HHI’s growing team supported and its offices running smoothly.', tags: ['Recruitment', 'Staff Welfare', 'Policy'] },
        { name: 'Samuel Dauda', role: 'Finance Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Manages budgets, reporting and financial accountability.', bioFull: 'Samuel manages programme budgets, donor financial reporting and internal controls, ensuring every naira is accounted for and well spent.', tags: ['Budgeting', 'Compliance', 'Donor Reporting'] },
        { name: 'Musa Hassan', role: 'Logistics & Procurement Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Oversees supply chains and field logistics.', bioFull: 'Musa oversees procurement, warehousing and fleet management, keeping supplies moving reliably to hard-to-reach field locations.', tags: ['Supply Chain', 'Fleet Management', 'Procurement'] },
        { name: 'Esther John', role: 'MEAL Coordinator', location: 'Yola, Adamawa', tenure: 'Since 2025', bio: 'Leads monitoring, evaluation, accountability and learning.', bioFull: 'Esther leads monitoring, evaluation, accountability and learning across all programmes, turning field data into evidence that sharpens HHI’s response.', tags: ['M&E Systems', 'Data Quality', 'Learning'] },
        { name: 'Abubakar Sadiq', role: 'ICT Officer', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Maintains systems, data security and digital tools.', bioFull: 'Abubakar maintains HHI’s systems, data security and digital tools, supporting field teams with the technology they need to work efficiently.', tags: ['Data Security', 'Systems Support', 'Digital Tools'] }
      ]
    },
    {
      group: 'Cross-Cutting Support',
      members: [
        { name: 'Ruth Peter', role: 'Communications Officer', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Tells the story of our work through media and outreach.', bioFull: 'Ruth tells the story of HHI’s work through photography, written stories and media outreach, helping donors and partners see the impact of every gift.', tags: ['Storytelling', 'Media Relations', 'Content'] },
        { name: 'Yakubu Umar', role: 'Information Management Officer', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Turns field data into insight for better programming.', bioFull: 'Yakubu builds dashboards and mapping tools that turn raw field data into insight, helping programme leads make faster, better-informed decisions.', tags: ['Data Analysis', 'GIS Mapping', 'Reporting'] },
        { name: 'Amina Lawan', role: 'Safeguarding & AAP Focal', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Champions community feedback and protection from harm.', bioFull: 'Amina champions accountability to affected populations, running community feedback channels and safeguarding safeguards that protect the people HHI serves.', tags: ['Community Feedback', 'Safeguarding', 'PSEA'] },
        { name: 'Grants & Partnerships Officer', role: 'Position open', location: 'Maiduguri, Borno', tenure: 'Join our team', bio: 'We’re looking for someone to grow our donor and partner relationships.', bioFull: 'This role will grow HHI’s donor and partner relationships, lead proposal development, and help translate field impact into compelling funding partnerships.', tags: ['Fundraising', 'Grant Writing', 'Partnerships'], vacant: true }
      ]
    }
  ];

  function initials(name) {
    var parts = name.trim().split(/\s+/);
    return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
  }
  function icon(path, size) {
    size = size || 12;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }
  var PIN = icon('<path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.4"/>', 12);
  var MAIL = icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', 13);
  var PHONE = icon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>', 13);
  var ARROW = icon('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>', 13);

  function photoInner(m) {
    if (m.photo) return '<img src="' + m.photo + '" alt="' + m.name + '">';
    return '<span class="tprofile__initials">' + (m.vacant ? '+' : initials(m.name)) + '</span>';
  }

  var container = document.getElementById('team-container');
  var modal = document.getElementById('profile-modal');

  TEAM.forEach(function (grp) {
    var section = document.createElement('div');
    section.className = 'team-group';
    section.setAttribute('data-reveal', '');

    var head = '<div class="team-group__head"><span class="team-group__title">' + grp.group + '</span><span class="team-group__count">' + grp.members.length + (grp.members.length === 1 ? ' member' : ' members') + '</span></div>';

    var cards = grp.members.map(function (m) {
      if (m.vacant) {
        return '<div class="tprofile tprofile--vacant">' +
          '<div class="tprofile__photo">' + photoInner(m) + '<span class="tprofile__badge">' + m.role + '</span></div>' +
          '<div class="tprofile__body">' +
            '<span class="tprofile__name">' + m.name + '</span>' +
            '<div class="tprofile__meta">' + PIN + '<span>' + m.location + ' · ' + m.tenure + '</span></div>' +
            '<p class="tprofile__bio">' + m.bio + '</p>' +
            '<div class="tprofile__foot"><a class="tprofile__email" href="careers.html">View openings</a><a class="tprofile__view" href="careers.html">Apply ' + ARROW + '</a></div>' +
          '</div>' +
        '</div>';
      }
      m.email = m.email || slugEmail(m.name);
      return '<div class="tprofile" data-member="' + m.name + '">' +
        '<div class="tprofile__photo" data-open-profile="' + m.name + '">' + photoInner(m) + '<span class="tprofile__badge">' + m.role + '</span></div>' +
        '<div class="tprofile__body">' +
          '<span class="tprofile__name">' + m.name + '</span>' +
          '<div class="tprofile__meta">' + PIN + '<span>' + m.location + ' · ' + m.tenure + '</span></div>' +
          '<p class="tprofile__bio">' + m.bio + '</p>' +
          '<div class="tprofile__foot"><a class="tprofile__email" href="mailto:' + m.email + '">' + m.email + '</a><button class="tprofile__view" type="button" data-open-profile="' + m.name + '">View profile ' + ARROW + '</button></div>' +
        '</div>' +
      '</div>';
    }).join('');

    section.innerHTML = head + '<div class="team-grid">' + cards + '</div>';
    container.appendChild(section);
  });

  if (window.H4H && window.H4H.observeReveals) window.H4H.observeReveals(container);

  var ALL_MEMBERS = TEAM.reduce(function (acc, grp) { return acc.concat(grp.members); }, []);

  function openProfile(name) {
    var m = ALL_MEMBERS.filter(function (x) { return x.name === name && !x.vacant; })[0];
    if (!m || !modal) return;
    modal.querySelector('.profile-modal__photo-slot').innerHTML = photoInner(m);
    modal.querySelector('.profile-modal__badge').textContent = m.role;
    modal.querySelector('.profile-modal__name').textContent = m.name;
    modal.querySelector('.profile-modal__meta').innerHTML = PIN + '<span>' + m.location + ' · ' + m.tenure + '</span>';
    modal.querySelector('.profile-modal__bio').textContent = m.bioFull || m.bio;
    modal.querySelector('.profile-modal__tags').innerHTML = (m.tags || []).map(function (t) { return '<span class="profile-modal__tag">' + t + '</span>'; }).join('');
    var contacts = '<a class="profile-modal__contact" href="mailto:' + m.email + '">' + MAIL + '<span>' + m.email + '</span></a>';
    if (m.phone) contacts += '<a class="profile-modal__contact" href="tel:' + m.phone + '">' + PHONE + '<span>' + m.phone + '</span></a>';
    modal.querySelector('.profile-modal__contacts').innerHTML = contacts;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeProfile() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  container.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-profile]');
    if (!trigger) return;
    e.preventDefault();
    openProfile(trigger.getAttribute('data-open-profile'));
  });

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-profile-close]')) closeProfile();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeProfile();
    });
  }
})();
