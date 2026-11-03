Terravoz website
================

The Terravoz one-page site: plain HTML, CSS and jQuery, with no build step.
It is static and served by GitHub Pages from the root of the `master` branch
at https://terravoz.github.io/terravoz_site/.

Preview locally:

    python3 -m http.server

then open http://localhost:8000/.

Contact form
------------

GitHub Pages can't run PHP, so the form posts to [FormSubmit](https://formsubmit.co),
a free third-party service that forwards each message by email to
info@terravoz.net. There is no account or API key.

- `js/contact.js` validates the form (name required, valid email, message of
  at least 10 characters) and sends it with an AJAX POST to
  `https://formsubmit.co/ajax/info@terravoz.net`. If that fails, the visitor is
  asked to write to info@terravoz.net instead.
- Without JavaScript, the form's `action` posts to FormSubmit directly and
  `_next` brings the visitor back to `#contact`.
- Hidden `_subject`, `_template` and `_captcha` fields configure the email.
  `_honey` is a hidden spam trap that real visitors never fill.
- **One-time activation:** the first submission ever sent to an address makes
  FormSubmit email an activation link to info@terravoz.net. Until someone
  clicks it, messages are not delivered. After the site is live, send one test
  message and click the link.
- FormSubmit is free but third-party: messages pass through their servers,
  and the service has its own rate and spam limits and could change or
  disappear. The "Or write to us" mail link under the form is the fallback.
