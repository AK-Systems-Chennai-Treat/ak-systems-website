// Mobile menu
(function () {
  var body = document.body, open = document.querySelector('[data-menu-open]'), close = document.querySelector('[data-menu-close]');
  function set(on) { body.classList.toggle('menu-open', on); if (open) open.setAttribute('aria-expanded', String(on)); if (on && close) close.focus(); }
  if (open) open.addEventListener('click', function () { set(true); });
  if (close) close.addEventListener('click', function () { set(false); if (open) open.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('menu-open')) set(false); });
})();

// Contact form: posts to the configured endpoint, or opens the email app with the message filled in.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var msg = form.querySelector('.form-msg');
  var topic = new URLSearchParams(location.search).get('topic');
  if (topic) { var r = form.querySelector('input[name="topic"][value="' + topic.replace(/"/g, '') + '"]'); if (r) r.checked = true; }
  function show(kind, text) { msg.className = 'form-msg ' + kind; msg.textContent = text; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    if (d.get('_gotcha')) return;
    var name = (d.get('name') || '').trim(), email = (d.get('email') || '').trim(), text = (d.get('message') || '').trim();
    if (!name || !text || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show('err', 'Please fill in your name, a valid email and a message.'); return; }
    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      var subject = '[Website] ' + d.get('topic') + ' from ' + name;
      var lines = ['Topic: ' + d.get('topic'), 'Name: ' + name, 'Company: ' + (d.get('company') || '-'), 'Email: ' + email, 'Mobile: ' + (d.get('phone') || '-'), '', text];
      location.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      show('ok', 'Your email app should open with the message ready. Press send there to reach us.');
      return;
    }
    var btn = form.querySelector('button[type="submit"]'); btn.disabled = true;
    fetch(endpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(); form.reset(); show('ok', 'Thank you. We have your message and will reply within one working day.'); })
      .catch(function () { show('err', 'Sorry, the message could not be sent. Please email ' + form.dataset.email + ' instead.'); })
      .then(function () { btn.disabled = false; });
  });
})();
