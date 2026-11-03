(function () {
	// Mobile menu
	var toggle = document.querySelector('.menu-toggle');
	var nav = document.getElementById('site-nav');
	toggle.addEventListener('click', function () {
		var open = nav.classList.toggle('open');
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	});
	nav.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') {
			nav.classList.remove('open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	});

	// Highlight the menu link of the section being read
	var links = {};
	[].forEach.call(nav.querySelectorAll('a'), function (a) {
		links[a.getAttribute('href').slice(1)] = a;
	});
	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				var link = links[entry.target.id];
				if (link && entry.isIntersecting) {
					Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
					link.classList.add('active');
				}
			});
		}, { rootMargin: '-40% 0px -55% 0px' });
		Object.keys(links).forEach(function (id) {
			var section = document.getElementById(id);
			if (section) { observer.observe(section); }
		});
	}

	// Contact form: validate, then send through FormSubmit (https://formsubmit.co)
	var form = document.getElementById('contact-form');
	var note = document.getElementById('note');
	var endpoint = 'https://formsubmit.co/ajax/info@terravoz.net';

	function show(kind, html) {
		note.className = kind;
		note.innerHTML = html;
	}

	function fail() {
		show('error', 'Sorry, your message could not be sent. Please write to us at <a href="mailto:info@terravoz.net">info@terravoz.net</a> instead.');
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var name = form.elements.name.value.trim();
		var email = form.elements.email.value.trim();
		var message = form.elements.message.value.trim();
		var errors = [];

		if (!name) { errors.push('Please enter your name.'); }
		if (!email) {
			errors.push('Please enter an e-mail address.');
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.push('Please enter a valid e-mail address.');
		}
		if (message.length < 10) { errors.push('Please enter your message. It should have at least 10 characters.'); }

		if (errors.length) {
			show('error', errors.join('<br>'));
			return;
		}

		note.className = '';
		note.innerHTML = '';
		var button = form.querySelector('button');
		button.disabled = true;

		fetch(endpoint, {
			method: 'POST',
			headers: { 'Accept': 'application/json' },
			body: new FormData(form)
		}).then(function (response) {
			return response.json();
		}).then(function (result) {
			if (result && (result.success === true || result.success === 'true')) {
				form.hidden = true;
				show('ok', 'Your message has been sent. Thank you!');
			} else {
				fail();
			}
		}).catch(fail).then(function () {
			button.disabled = false;
		});
	});

	// Project popups
	var dialogs = [].slice.call(document.querySelectorAll('dialog.project'));
	function openDialog(d) {
		if (typeof d.showModal === 'function') { d.showModal(); }
		else { d.setAttribute('open', ''); }
	}
	[].forEach.call(document.querySelectorAll('.card-open'), function (button) {
		button.addEventListener('click', function () {
			openDialog(document.getElementById(button.getAttribute('data-dialog')));
		});
	});
	dialogs.forEach(function (d, i) {
		d.addEventListener('click', function (e) {
			// a click on the dimmed backdrop lands on the dialog element itself
			if (e.target === d || e.target.hasAttribute('data-close')) { d.close(); }
		});
		d.querySelector('[data-prev]').addEventListener('click', function () {
			d.close();
			openDialog(dialogs[(i + dialogs.length - 1) % dialogs.length]);
		});
		d.querySelector('[data-next]').addEventListener('click', function () {
			d.close();
			openDialog(dialogs[(i + 1) % dialogs.length]);
		});
	});
})();
