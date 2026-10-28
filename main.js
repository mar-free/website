(function () {
  'use strict';
  var S = window.SITE;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ICONS = {
    network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M11 7.3 6 16.8M13 7.3l5 9.5M7.5 19h9"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10l3 2-3 2M13 15h4"/>',
    code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 7h6"/>',
    bank: '<path d="M3 10l9-6 9 6zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M17 14c2.5 0 4.5 1.8 4.5 5"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="10" y="10" width="4" height="4"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    github: '<path d="M9 19c-4 1.2-4-2-6-2.5M15 21v-3.2c0-.9.1-1.3-.5-1.9 2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.400 11.400 0 0 0-6 0C7.000 3.200 6 3.500 6 3.500a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4.600 9.900c0 4.600 2.800 5.700 5.500 6-.6.600-.6 1.200-.5 1.900V21"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11v6M8 7.500v.01M12 17v-6M12 13.500c0-1.700 1.200-2.500 2.500-2.500s2.500.8 2.500 2.500V17"/>'
  };
  function icon(n) { return '<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || ICONS.code) + '</svg></span>'; }
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  function $(id) { return document.getElementById(id); }
  function isUrl(u) { return /^https?:\/\//i.test(u || ''); }

  /* site-wide text */
  document.querySelectorAll('[data-site]').forEach(function (n) { if (S[n.dataset.site]) n.textContent = S[n.dataset.site]; });
  $('year').textContent = new Date().getFullYear();

  /* profile photo */
  if (S.photo) {
    var fig = document.querySelector('.photo');
    fig.innerHTML = '<img src="' + esc(S.photo) + '" alt="Portrait of ' + esc(S.name) + '">';
  }

  /* skills */
  $('skillGrid').innerHTML = S.skills.map(function (g) {
    return '<article class="card rv">' + icon(g.icon) + '<h3>' + esc(g.group) + '</h3><ul>' +
      g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></article>';
  }).join('');

  /* projects */
  $('projectGrid').innerHTML = S.projects.map(function (p, i) {
    var tags = p.stack.length ? p.stack.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('')
      : '<span class="tag empty">Tech stack: to be added</span>';
    return '<article class="card hover rv">' + icon(p.icon) + '<h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) +
      '</p><div class="tags">' + tags + '</div><button class="linkbtn" data-i="' + i + '" aria-haspopup="dialog">View details</button></article>';
  }).join('');

  /* certifications */
  $('certGrid').innerHTML = S.certs.map(function (c) {
    function row(label, v) { return '<span>' + label + ': ' + (v ? esc(v) : '<span class="ph">not added yet</span>') + '</span>'; }
    var img = c.image ? '<img class="cert-img" src="' + esc(c.image) + '" alt="Certificate: ' + esc(c.title) + '">' : '';
    var ver = isUrl(c.verify) ? '<a href="' + esc(c.verify) + '" target="_blank" rel="noopener noreferrer">Verify credential</a>'
      : '<span class="off">Verification link not added yet</span>';
    return '<article class="card hover rv">' + icon(c.icon) + '<h3>' + esc(c.title) + '</h3>' + img +
      '<div class="cert-meta">' + row('Issuer', c.issuer) + row('Completed', c.date) + '</div>' + ver + '</article>';
  }).join('');

  /* contact + footer links */
  var links = [
    ['mail', 'Email', S.email, S.email ? 'mailto:' + S.email : ''],
    ['github', 'GitHub', S.github, S.github],
    ['linkedin', 'LinkedIn', S.linkedin, S.linkedin]
  ];
  $('contactList').innerHTML = links.map(function (l) {
    var ok = l[3] && (l[0] === 'mail' || isUrl(l[3]));
    var body = ok ? '<a href="' + esc(l[3]) + '"' + (l[0] === 'mail' ? '' : ' target="_blank" rel="noopener noreferrer"') + '>' + esc(l[2]) + '</a>'
      : '<span class="ph">' + l[1] + ' not added yet</span>';
    return '<li>' + icon(l[0]) + body + '</li>';
  }).join('');
  $('footSocial').innerHTML = links.filter(function (l) { return l[3] && (l[0] === 'mail' || isUrl(l[3])); })
    .map(function (l) { return '<a href="' + esc(l[3]) + '"' + (l[0] === 'mail' ? '' : ' target="_blank" rel="noopener noreferrer"') + '>' + l[1] + '</a>'; }).join('');

  /* project modal */
  var modal = $('modal'), mBody = $('mBody'), lastBtn = null;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.linkbtn');
    if (!b) return;
    var p = S.projects[+b.dataset.i];
    lastBtn = b;
    var feats = p.features.length ? '<ul>' + p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>'
      : '<p class="ph-box">Features not added yet. List only what you have actually built in <code>js/data.js</code>.</p>';
    var stack = p.stack.length ? '<div class="tags">' + p.stack.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>'
      : '<p class="ph-box">Technology stack not added yet.</p>';
    var shot = p.screenshot ? '<img class="shot" src="' + esc(p.screenshot) + '" alt="Screenshot of ' + esc(p.title) + '">' : '';
    var btns = (isUrl(p.repo) ? '<a class="btn" href="' + esc(p.repo) + '" target="_blank" rel="noopener noreferrer">GitHub repository</a>' : '') +
      (isUrl(p.demo) ? '<a class="btn" href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">Live demo</a>' : '');
    if (!btns) btns = '<p class="muted">Repository and demo links not added yet.</p>';
    mBody.innerHTML = icon(p.icon) + '<h3 id="mTitle">' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
      '<h4>Technologies</h4>' + stack + '<h4>Features</h4>' + feats + shot + '<div class="m-links">' + btns + '</div>';
    modal.showModal();
  });
  $('mClose').addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', function () { if (lastBtn) lastBtn.focus(); });

  /* mobile menu */
  var btn = $('menuBtn'), nav = $('navLinks');
  function setMenu(open) { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); }
  btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* active nav link + reveal */
  if ('IntersectionObserver' in window) {
    var navA = nav.querySelectorAll('a');
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) navA.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { so.observe(s); });
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rv').forEach(function (n) { ro.observe(n); });
  } else {
    document.querySelectorAll('.rv').forEach(function (n) { n.classList.add('in'); });
  }

  /* contact form */
  var form = $('form'), status = $('status');
  function setErr(id, inputId, msg) {
    $(id).textContent = msg;
    $(inputId).setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) $(inputId).setAttribute('aria-describedby', id); else $(inputId).removeAttribute('aria-describedby');
    return !msg;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('fName').value.trim(), m = $('fEmail').value.trim(), t = $('fMsg').value.trim();
    var ok = setErr('eName', 'fName', n ? '' : 'Enter your name.');
    ok = setErr('eEmail', 'fEmail', !m ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m) ? '' : 'Enter a valid email address, like name@example.com.') && ok;
    ok = setErr('eMsg', 'fMsg', t.length >= 10 ? '' : 'Write a message of at least 10 characters.') && ok;
    status.className = 'status';
    if (!ok) { status.textContent = 'Fix the highlighted fields and try again.'; status.classList.add('warn'); return; }
    if (S.email) {
      location.href = 'mailto:' + encodeURIComponent(S.email).replace('%40', '@') + '?subject=' + encodeURIComponent('Portfolio message from ' + n) +
        '&body=' + encodeURIComponent(t + '\n\nFrom: ' + n + ' (' + m + ')');
      status.textContent = 'Your email app should open with the message ready. The message is only sent when you send it from there.';
      status.classList.add('ok');
    } else {
      status.textContent = 'No message was sent. This form is not connected to an email service yet. The site owner needs to add one (see README).';
      status.classList.add('warn');
    }
  });

  /* network background */
  var cv = $('net'), ctx = cv.getContext('2d'), nodes = [], W, H, raf;
  function size() {
    var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(60, Math.max(18, W * H / 22000)));
    nodes = [];
    for (var i = 0; i < count; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
      for (var j = i + 1; j < nodes.length; j++) {
        var b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 150) { ctx.strokeStyle = 'rgba(76,154,255,' + (0.22 * (1 - d / 150)) + ')'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(34,211,238,.55)'; ctx.beginPath(); ctx.arc(a.x, a.y, 2, 0, 6.283); ctx.fill();
    }
    if (!reduce) raf = requestAnimationFrame(draw);
  }
  size(); draw();
  window.addEventListener('resize', function () { cancelAnimationFrame(raf); size(); draw(); });
  document.addEventListener('visibilitychange', function () {
    if (reduce) return;
    if (document.hidden) cancelAnimationFrame(raf); else { cancelAnimationFrame(raf); draw(); }
  });
})();
