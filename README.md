Terravoz website
================

The Terravoz one-page site: plain HTML, CSS and a little vanilla JavaScript, with no build step and no frameworks. It is static, so it can be served by GitHub Pages straight from the root of the `master` branch.

The layout and styles (`assets/css/site.css`) were written from scratch. They recreate the look of the earlier Drupal 7 site (full-width photographs with translucent panels laid over them) without using any code or images from its commercial Porto theme. The text, logo, background photographs, project pictures, team photos and client logos are Terravoz's own.

Structure
---------

- `index.html`: all the content, in sections (About, Technology, Portfolio, Team, Clients, Contact).
- `assets/css/site.css`: styles.
- `assets/js/site.js`: mobile menu, menu highlighting and the contact form.
- `assets/img/`: logo, background photographs, project pictures, team photos, client logos.
- `assets/docs/`: the VoIP Drupal fact sheet (PDF).

Preview locally:

    python3 -m http.server

then open http://localhost:8000/.

Contact form
------------

GitHub Pages can't run PHP, so the form posts to [FormSubmit](https://formsubmit.co), a free third-party service that forwards each message by email to info@terravoz.net. There is no account or API key.

- `assets/js/site.js` checks the form (name required, valid email, message of at least 10 characters) and sends it with a `fetch` POST to `https://formsubmit.co/ajax/info@terravoz.net`. If that fails, the visitor is asked to write to info@terravoz.net instead.
- Without JavaScript, the form's `action` posts to FormSubmit directly and `_next` brings the visitor back to `#contact`. If the site moves to another address, update `_next` in `index.html`.
- Hidden `_subject`, `_template` and `_captcha` fields configure the email. `_honey` is a hidden spam trap that real visitors never fill.
- **One-time activation:** the first submission ever sent to an address makes FormSubmit email an activation link to info@terravoz.net. Until someone clicks it, messages are not delivered. After the site is live, send one test message and click the link.
- FormSubmit is free but third-party: messages pass through their servers, and the service has its own rate and spam limits and could change or disappear.
