## 2025-02-18 - [Fix Reverse Tabnabbing Vulnerability]
**Vulnerability:** External links with `target="_blank"` missing the `rel="noopener noreferrer"` attribute.
**Learning:** This leaves the site vulnerable to Reverse Tabnabbing, where the newly opened tab can access the original window's `window.opener` object and potentially redirect it to a malicious phishing site.
**Prevention:** Always add `rel="noopener noreferrer"` when using `target="_blank"` in links.