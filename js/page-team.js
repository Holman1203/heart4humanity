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
        { name: 'Hyelafiya Sani Hassan', role: 'Executive Director', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/ed.jpeg', bio: 'Leads HHI’s strategy, partnerships and organisational growth as a women-led, youth-driven non-profit.', bioFull: 'Hyelafiya sets the strategic direction for Heart for Humanity Initiative, builds relationships with donors and government partners, and champions a women-led, youth-driven model for humanitarian response across the Northeast and Northwest.', tags: ['Strategy', 'Partnerships', 'Governance'],
          quote: 'Every community we serve deserves dignity, not just aid — that’s the standard I hold our work to.',
          achievements: ['SDG 3 & 5 – Directed the launch of HHI as a women-led, youth-driven humanitarian organisation now active across 7 states.', 'SDG 17 – Built partnerships with government agencies, donors and community leaders that underpin HHI’s programme funding.', 'SDG 16 – Established governance structures and internal controls that keep HHI accountable to the communities it serves.'],
          education: ['B.Sc. Development Studies', 'Postgraduate training in NGO Leadership & Management'] },
        { name: 'Janada John', role: 'Programme Manager', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/pm.jpeg', bio: 'Oversees programme planning, quality and cross-sector coordination.', bioFull: 'Janada oversees programme planning, quality assurance and cross-sector coordination, working closely with thematic leads to keep delivery on track across all seven states of operation.', tags: ['Programme Planning', 'Quality Assurance', 'Coordination'],
          quote: 'Good programming starts with listening to the people we’re designing for.',
          achievements: ['SDG 3, 4 & 6 – Coordinated cross-sector programme delivery across Health, Education, WASH and Protection teams.', 'SDG 17 – Strengthened quality assurance systems that keep field delivery aligned with donor commitments.', 'SDG 5 – Championed women-led field teams across HHI’s operational states.'],
          education: ['B.Sc. Project Management', 'Certificate in Humanitarian Programme Cycle Management'] }
      ]
    },
    {
      group: 'Programmes',
      members: [
        { name: 'Dr. Grace Daniel', role: 'Health Lead', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/gd.jpeg', bio: 'Leads mobile clinics, screenings and primary health outreach.', bioFull: 'Dr. Grace coordinates HHI’s mobile clinics, health screenings and primary healthcare outreach, working closely with state health authorities to bring quality care to underserved communities.', tags: ['Primary Healthcare', 'Mobile Clinics', 'Immunisation'],
          quote: 'Healthcare shouldn’t depend on how far you live from a hospital.',
          achievements: ['SDG 3 – Led mobile clinic outreach delivering primary healthcare to underserved and hard-to-reach communities.', 'SDG 3 – Coordinated immunisation and health-screening drives reaching thousands of children and caregivers.', 'SDG 17 – Partnered with state health authorities to strengthen referral pathways for complicated cases.'],
          education: ['MBBS, College of Medicine', 'Postgraduate Diploma in Public Health'] },
        { name: 'Grace Adamu', role: 'Nutrition Lead', location: 'Konduga, Borno', tenure: 'Since 2025', bio: 'Leads community-based malnutrition screening and therapeutic feeding.', bioFull: 'Grace leads community-based management of acute malnutrition, running screening drives and therapeutic feeding programmes for children under five and pregnant and lactating women.', tags: ['Malnutrition Screening', 'IYCF', 'Therapeutic Feeding'],
          quote: 'A well-fed child is a child who gets to learn, play and grow.',
          achievements: ['SDG 2 – Ran community-based malnutrition screening reaching children under five across programme areas.', 'SDG 2 & 3 – Delivered therapeutic feeding and IYCF counselling for pregnant and lactating women.', 'SDG 17 – Trained community volunteers to sustain nutrition screening beyond programme visits.'],
          education: ['B.Sc. Nutrition and Dietetics', 'Certificate in Community Management of Acute Malnutrition (CMAM)'] },
        { name: 'Ndihyelia Sani', role: 'WASH & Food Security and Livelihoods Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/fsl.jpeg', bio: 'Leads clean water, sanitation, food distribution and livelihoods support.', bioFull: 'Ndihyelia coordinates water point construction, sanitation and hygiene promotion alongside food distributions, savings groups and vocational training — helping households recover both health and income.', tags: ['Water & Sanitation', 'Food Distribution', 'Livelihoods'],
          quote: 'Clean water and a meal on the table are where recovery begins.',
          achievements: ['SDG 6 – Coordinated construction and rehabilitation of community water points.', 'SDG 2 – Led food distributions and livelihoods support reaching vulnerable households.', 'SDG 8 – Set up savings groups and vocational training that helped households rebuild income.'],
          education: ['B.Sc. Water Resources & Environmental Engineering', 'Certificate in Livelihoods Programming'] },
        { name: 'Japari Hyelafiya', role: 'Education Officer', location: 'Yola, Adamawa', tenure: 'Since 2025', photo: 'assets/Team/ef.jpeg', bio: 'Runs scholarships, learning materials and girls’ retention programmes.', bioFull: 'Japari runs HHI’s scholarship scheme, learning-materials distribution and girls’ retention initiatives, working with schools to keep conflict-affected children in class.', tags: ['Girls’ Education', 'Scholarships', 'Learning Materials'],
          quote: 'Every extra day a girl stays in school changes the trajectory of her life.',
          achievements: ['SDG 4 – Ran a scholarship scheme supporting conflict-affected children to stay in school.', 'SDG 4 & 5 – Led girls’ retention initiatives that reduced drop-out in supported communities.', 'SDG 4 – Coordinated distribution of learning materials to under-resourced schools.'],
          education: ['B.Ed. Educational Administration', 'Certificate in Education in Emergencies'] },
        { name: 'Zainab Musa', role: 'Protection Coordinator', location: 'Jere, Borno', tenure: 'Since 2025', photo: 'assets/Team/pc.jpeg', bio: 'Directs case management, psychosocial support and safe spaces.', bioFull: 'Zainab directs case management, psychosocial support and safe-space programming for survivors of violence and vulnerable children across HHI’s protection sites.', tags: ['Case Management', 'GBV Response', 'Psychosocial Support'],
          quote: 'Safety is the first thing we owe the people we serve.',
          achievements: ['SDG 5 & 16 – Directed case management and GBV response services across protection sites.', 'SDG 16 – Established safe spaces offering psychosocial support to survivors of violence.', 'SDG 16 – Trained community volunteers on referral pathways for vulnerable children.'],
          education: ['B.Sc. Social Work', 'Certificate in Case Management & GBV Response'] },
        { name: 'Maryam Ali', role: 'Peacebuilding Lead', location: 'Dikwa, Borno', tenure: 'Since 2025', bio: 'Facilitates dialogue, youth engagement and trauma-healing initiatives.', bioFull: 'Maryam facilitates inter-community dialogue forums, youth engagement programmes and trauma-healing initiatives that help conflict-affected communities rebuild trust.', tags: ['Dialogue Facilitation', 'Youth Engagement', 'Trauma Healing'],
          quote: 'Lasting peace is built one honest conversation at a time.',
          achievements: ['SDG 16 – Facilitated inter-community dialogue forums that reduced tension in conflict-affected areas.', 'SDG 16 – Led youth engagement programmes turning at-risk youth toward constructive community roles.', 'SDG 3 – Ran trauma-healing initiatives supporting psychosocial recovery.'],
          education: ['B.Sc. Peace & Conflict Studies', 'Certificate in Trauma-Informed Community Facilitation'] }
      ]
    },
    {
      group: 'Operations & Support',
      members: [
        { name: 'Wandu Zira', role: 'HR Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', photo: 'assets/Team/HR.jpeg', bio: 'Supports recruitment, staff welfare and day-to-day HR operations.', bioFull: 'Wandu coordinates recruitment, staff welfare and day-to-day human resources administration, keeping HHI’s growing team supported across all field locations.', tags: ['Recruitment', 'Staff Welfare', 'Policy'],
          quote: 'A supported team is what makes consistent service to communities possible.',
          achievements: ['SDG 8 – Coordinated recruitment that grew HHI’s field team across seven states.', 'SDG 8 – Introduced staff welfare initiatives supporting field-based personnel.', 'SDG 5 – Supported HHI’s commitment to a women-led, gender-balanced workforce.'],
          education: ['B.Sc. Human Resource Management', 'Certificate in HR for Humanitarian Organisations'] },
        { name: 'Samuel Dauda', role: 'Finance Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Manages budgets, reporting and financial accountability.', bioFull: 'Samuel manages programme budgets, donor financial reporting and internal controls, ensuring every naira is accounted for and well spent.', tags: ['Budgeting', 'Compliance', 'Donor Reporting'],
          quote: 'Every naira accounted for is trust earned with our donors and communities.',
          achievements: ['SDG 17 – Managed programme budgets and donor financial reporting across active grants.', 'SDG 16 – Strengthened internal financial controls and compliance systems.', 'SDG 17 – Supported audit processes that maintained HHI’s financial accountability.'],
          education: ['B.Sc. Accounting', 'ICAN (in view)'] },
        { name: 'Musa Hassan', role: 'Logistics & Procurement Coordinator', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Oversees supply chains and field logistics.', bioFull: 'Musa oversees procurement, warehousing and fleet management, keeping supplies moving reliably to hard-to-reach field locations.', tags: ['Supply Chain', 'Fleet Management', 'Procurement'],
          quote: 'Supplies that don’t arrive on time are help that doesn’t happen.',
          achievements: ['SDG 9 – Oversaw procurement and warehousing systems supporting field operations.', 'SDG 9 – Managed fleet logistics keeping supplies moving to hard-to-reach locations.', 'SDG 17 – Coordinated with vendors and partners to secure reliable supply chains.'],
          education: ['B.Sc. Business Administration', 'Certificate in Humanitarian Logistics'] },
        { name: 'Esther John', role: 'MEAL Coordinator', location: 'Yola, Adamawa', tenure: 'Since 2025', bio: 'Leads monitoring, evaluation, accountability and learning.', bioFull: 'Esther leads monitoring, evaluation, accountability and learning across all programmes, turning field data into evidence that sharpens HHI’s response.', tags: ['M&E Systems', 'Data Quality', 'Learning'],
          quote: 'Data only matters if it changes how we work.',
          achievements: ['SDG 17 – Built monitoring and evaluation systems tracking programme results across all sectors.', 'SDG 17 – Led accountability mechanisms that channel community feedback into programme design.', 'SDG 4 – Strengthened field data quality through enumerator training and spot-checks.'],
          education: ['B.Sc. Statistics', 'Certificate in Monitoring, Evaluation, Accountability & Learning (MEAL)'] },
        { name: 'Abubakar Sadiq', role: 'ICT Officer', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Maintains systems, data security and digital tools.', bioFull: 'Abubakar maintains HHI’s systems, data security and digital tools, supporting field teams with the technology they need to work efficiently.', tags: ['Data Security', 'Systems Support', 'Digital Tools'],
          quote: 'Reliable systems in the background mean the field team can focus on the work that matters.',
          achievements: ['SDG 9 – Maintained data systems and digital tools supporting programme teams.', 'SDG 16 – Strengthened data security practices protecting sensitive beneficiary information.', 'SDG 9 – Supported field teams with technology troubleshooting and systems training.'],
          education: ['B.Sc. Computer Science', 'Certificate in Information Systems Security'] }
      ]
    },
    {
      group: 'Cross-Cutting Support',
      members: [
        { name: 'Ruth Peter', role: 'Communications Officer', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Tells the story of our work through media and outreach.', bioFull: 'Ruth tells the story of HHI’s work through photography, written stories and media outreach, helping donors and partners see the impact of every gift.', tags: ['Storytelling', 'Media Relations', 'Content'],
          quote: 'Every story we tell is someone’s real life — we owe it honesty and care.',
          achievements: ['SDG 17 – Produced storytelling and media content that grew donor and public engagement.', 'SDG 5 – Amplified the voices of women and youth at the centre of HHI’s programmes.', 'SDG 17 – Coordinated media outreach around key programme milestones.'],
          education: ['B.A. Mass Communication', 'Certificate in Digital Storytelling for Nonprofits'] },
        { name: 'Yakubu Umar', role: 'Information Management Officer', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Turns field data into insight for better programming.', bioFull: 'Yakubu builds dashboards and mapping tools that turn raw field data into insight, helping programme leads make faster, better-informed decisions.', tags: ['Data Analysis', 'GIS Mapping', 'Reporting'],
          quote: 'Good maps and good data help us reach the people who need us most.',
          achievements: ['SDG 17 – Built dashboards and mapping tools translating field data into programme insight.', 'SDG 9 – Introduced GIS mapping to guide targeting of underserved communities.', 'SDG 17 – Supported evidence-based reporting for donors and partners.'],
          education: ['B.Sc. Geography (GIS option)', 'Certificate in Information Management for Humanitarian Response'] },
        { name: 'Amina Lawan', role: 'Safeguarding & AAP Focal', location: 'Maiduguri, Borno', tenure: 'Since 2025', bio: 'Champions community feedback and protection from harm.', bioFull: 'Amina champions accountability to affected populations, running community feedback channels and safeguarding safeguards that protect the people HHI serves.', tags: ['Community Feedback', 'Safeguarding', 'PSEA'],
          quote: 'Accountability means the people we serve can hold us to our word.',
          achievements: ['SDG 16 – Established community feedback channels that keep programmes accountable to affected populations.', 'SDG 16 – Rolled out safeguarding protocols protecting communities from harm.', 'SDG 5 – Led PSEA awareness sessions across programme sites.'],
          education: ['B.Sc. Sociology', 'Certificate in PSEA & Safeguarding in Humanitarian Action'] },
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

  var leadershipGrid = document.getElementById('leadership-grid');
  var container = document.getElementById('team-container');
  var modal = document.getElementById('profile-modal');

  function vacantCard(m, stagger) {
    return '<div class="tprofile tprofile--vacant tprofile--staff" style="--stagger:' + stagger + 'ms">' +
      '<div class="tprofile__photo">' + photoInner(m) + '</div>' +
      '<div class="tprofile__body">' +
        '<span class="tprofile__name">' + m.name + '</span>' +
        '<span class="tprofile__role">' + m.role + '</span>' +
        '<p class="tprofile__bio">' + m.bio + '</p>' +
        '<div class="tprofile__foot"><a class="tprofile__email" href="careers.html">View openings</a><a class="tprofile__view" href="careers.html">Apply ' + ARROW + '</a></div>' +
      '</div>' +
    '</div>';
  }

  function leadCard(m, stagger) {
    m.email = m.email || slugEmail(m.name);
    return '<div class="tprofile tprofile--lead" data-open-profile="' + m.name + '" style="--stagger:' + stagger + 'ms">' +
      '<div class="tprofile__photo">' + photoInner(m) + '<span class="tprofile__badge">' + m.role + '</span></div>' +
      '<div class="tprofile__body">' +
        '<span class="tprofile__name">' + m.name + '</span>' +
        '<div class="tprofile__meta">' + PIN + '<span>' + m.location + ' · ' + m.tenure + '</span></div>' +
        '<p class="tprofile__bio">' + m.bio + '</p>' +
        '<div class="tprofile__foot">' +
          '<a class="tprofile__email" href="mailto:' + m.email + '" data-stop-open>' + m.email + '</a>' +
          '<span class="tprofile__view">View profile ' + ARROW + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function staffCard(m, stagger) {
    m.email = m.email || slugEmail(m.name);
    return '<div class="tprofile tprofile--staff" data-open-profile="' + m.name + '" style="--stagger:' + stagger + 'ms">' +
      '<div class="tprofile__photo">' + photoInner(m) + '</div>' +
      '<div class="tprofile__body">' +
        '<span class="tprofile__name">' + m.name + '</span>' +
        '<span class="tprofile__role">' + m.role + '</span>' +
        '<div class="tprofile__foot"><a class="tprofile__email" href="mailto:' + m.email + '" data-stop-open>' + MAIL + '<span>' + m.email + '</span></a></div>' +
      '</div>' +
    '</div>';
  }

  var LEADERSHIP = TEAM[0].members;
  var STAFF_GROUPS = TEAM.slice(1);

  if (leadershipGrid) {
    leadershipGrid.innerHTML = LEADERSHIP.map(function (m, i) { return leadCard(m, i * 120); }).join('');
  }

  STAFF_GROUPS.forEach(function (grp) {
    var section = document.createElement('div');
    section.className = 'team-group';
    section.setAttribute('data-reveal', '');

    var head = '<div class="team-group__head"><span class="team-group__title">' + grp.group + '</span><span class="team-group__count">' + grp.members.length + (grp.members.length === 1 ? ' member' : ' members') + '</span></div>';

    var cards = grp.members.map(function (m, i) {
      return m.vacant ? vacantCard(m, i * 80) : staffCard(m, i * 80);
    }).join('');

    section.innerHTML = head + '<div class="staff-grid">' + cards + '</div>';
    container.appendChild(section);
  });

  if (window.H4H && window.H4H.observeReveals) {
    window.H4H.observeReveals(container);
    if (leadershipGrid) window.H4H.observeReveals(leadershipGrid.closest('.page-section'));
  }

  var ALL_MEMBERS = TEAM.reduce(function (acc, grp) { return acc.concat(grp.members); }, []);

  function openProfile(name) {
    var m = ALL_MEMBERS.filter(function (x) { return x.name === name && !x.vacant; })[0];
    if (!m || !modal) return;
    modal.querySelector('.profile-modal__photo-slot').innerHTML = photoInner(m);
    modal.querySelector('.profile-modal__badge').textContent = m.role;
    modal.querySelector('.profile-modal__name').textContent = m.name;
    modal.querySelector('.profile-modal__meta').innerHTML = PIN + '<span>' + m.location + ' · ' + m.tenure + '</span>';
    modal.querySelector('.profile-modal__bio').textContent = m.bioFull || m.bio;
    modal.querySelector('.profile-modal__quotes').innerHTML = m.quote ? '<p class="profile-modal__quote">' + m.quote + '</p>' : '';
    modal.querySelector('.profile-modal__tags').innerHTML = (m.tags || []).map(function (t) { return '<span class="profile-modal__tag">' + t + '</span>'; }).join('');
    modal.querySelector('.profile-modal__achievements').innerHTML = (m.achievements || []).map(function (a) { return '<li>' + a + '</li>'; }).join('');
    modal.querySelector('.profile-modal__education').innerHTML = (m.education || []).map(function (e) { return '<li>' + e + '</li>'; }).join('');
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

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-stop-open]')) return;
    var trigger = e.target.closest('[data-open-profile]');
    if (!trigger) return;
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
