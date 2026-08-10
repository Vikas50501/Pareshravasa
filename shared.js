// shared.js — RAVASA Shah Paresh & Associates
// Injects topbar, nav, footer into every page

const LOGO_SRC = 'assets/logo.png';

function getPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function renderTopbar() {
  document.getElementById('topbar-mount').outerHTML = `
  <div class="topbar">
    <div class="container">
      <span class="topbar-left">Independent Tax Litigation Chamber &nbsp;·&nbsp; Mumbai, Maharashtra</span>
      <div class="topbar-right">
        <span>Meetings by Prior Appointment</span>
        <a href="contact.html">Enquire Now</a>
      </div>
    </div>
  </div>`;
}

function renderNav() {
  const page = getPage();
  const isInsightsPage = page === 'insights.html' || page === 'blog.html' || page.startsWith('blog-') || page.startsWith('insight-');
  const isResourcesPage = page === 'resources.html' || page === 'transition-compliance-calendar.html' || page === 'lic-library.html';
  const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'practice-areas.html', label: 'Practice Areas' },
    { href: 'contributions.html', label: 'Publications' },
    { href: 'insights.html', label: 'Insights' },
    { href: 'resources.html', label: 'Resources' },
    { href: 'contact.html', label: 'Contact' },
  ];
  const navLinks = links.map(l =>
    `<a href="${l.href}" class="${page === l.href || (l.href === 'insights.html' && isInsightsPage) || (l.href === 'resources.html' && isResourcesPage) ? 'active' : ''}">${l.label}</a>`
  ).join('');
  const mobileLinks = links.map(l =>
    `<a href="${l.href}" onclick="closeMobile()">${l.label}</a>`
  ).join('');

  document.getElementById('nav-mount').outerHTML = `
  <nav>
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="${LOGO_SRC}" alt="RAVASA — Shah Paresh & Associates" class="logo-img"
             onerror="this.style.display='none';this.closest('.nav-logo').querySelector('.logo-fallback').style.display='flex'"/>
        <div class="logo-fallback">
          <span class="r">RAVASA</span>
          <span class="s">Shah Paresh &amp; Associates</span>
          <span class="s">Independent Tax Litigation Chamber</span>
        </div>
      </a>
      <div class="nav-links">${navLinks}</div>
      <a href="contact.html" class="nav-cta">Enquire</a>
      <div class="hamburger" onclick="toggleMobile()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">${mobileLinks}</div>`;
}

function renderFooter() {
  document.getElementById('footer-mount').outerHTML = `
  <footer>
    <div class="footer-main">
      <div class="container">
        <div class="footer-brand">
          <img src="${LOGO_SRC}" alt="RAVASA" class="logo-img"
               onerror="this.style.display='none'"/>
          <div style="font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:4px">Independent Tax Litigation Chamber</div>
          <p>Specialised, independent representation in Income-tax and State tax (now GST) disputes, appellate proceedings and tax controversy matters. Mumbai, since 1987.</p>
          <div style="font-size:12px;font-style:italic;color:var(--accent);margin-bottom:16px">Independent representation in tax disputes.</div>
          <div class="footer-social">
            <a href="https://wa.me/919820238263" target="_blank" class="fsoc-btn fsoc-wa" title="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/pareshravasa" target="_blank" class="fsoc-btn fsoc-li" title="LinkedIn" style="background:transparent">
              <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7.2 19.5H4V9.4h3.2v10.1zM5.6 8a1.86 1.86 0 1 1 0-3.72A1.86 1.86 0 0 1 5.6 8zM20 19.5h-3.2v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59v4.98H10.1V9.4h3.07v1.38h.04a3.37 3.37 0 0 1 3.03-1.66c3.24 0 3.84 2.13 3.84 4.9v5.48z"/></svg>
            </a>
            <a href="https://g.page/r/Cfb920R5pvLsEBM/review" target="_blank" class="fsoc-btn fsoc-gm" title="Google Business">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </a>
          </div>
          <div class="footer-values" style="margin-top:20px;display:flex;gap:24px;color:var(--accent);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:14px">
            <span>Yukti</span>
            <span>Nishtha</span>
          </div>
        </div>
        <div class="footer-col">
          <h4>Practice</h4>
          <ul>
            <li><a href="practice-areas.html">Income-Tax Litigation</a></li>
            <li><a href="practice-areas.html">State tax (now GST) Disputes</a></li>
            <li><a href="practice-areas.html">Tax Controversy</a></li>
            <li><a href="practice-areas.html">Writ &amp; High Court</a></li>
            <li><a href="practice-areas.html">Our Team with something more accurate.
</a></li>
 <li><a href="practice-areas.html">Writ & Constitutional Matters
</a></li>
<li><a href="practice-areas.html">Appellate & Remand Proceedings
</a></li>
<li><a href="practice-areas.html">Writ Proceedings
</a></li>
<li><a href="practice-areas.html">Judicial Review Matters
</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Chamber</h4>
          <ul>
            <li><a href="about.html">About the Chamber</a></li>
            <li><a href="about.html#team">Professional Leadership</a></li>
            <li><a href="contributions.html">Publications</a></li>
            <li><a href="insights.html">Insights</a></li>
            <li><a href="resources.html">Resources</a></li>
            <li><a href="contributions.html">Speaking</a></li>
            <li><a href="contributions.html">Associations</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <div class="footer-contact-item">
            <span class="label">Location</span>
            <span class="val">Mumbai, Maharashtra, India</span>
          </div>
          <div class="footer-contact-item">
            <span class="label">WhatsApp</span>
            <span class="val"><a href="https://wa.me/919820238263" target="_blank">+91 98202 38263</a></span>
          </div>
          <div class="footer-contact-item">
            <span class="label">LinkedIn</span>
            <span class="val"><a href="https://www.linkedin.com/in/pareshravasa" target="_blank">Shah Paresh &amp; Associates</a></span>
          </div>
          <div class="footer-contact-item">
            <span class="label">Google Business</span>
            <span class="val"><a href="https://g.page/r/Cfb920R5pvLsEBM/review" target="_blank">View on Google Maps</a></span>
          </div>
          <div class="footer-contact-item">
            <span class="label">Meetings</span>
            <span class="val">By Prior Appointment</span>
          </div>
          <a href="contact.html" class="btn btn-accent" style="margin-top:10px;font-size:10px;padding:9px 18px;display:inline-block">Enquire Now</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 Tax Litigation Chamber. All Rights Reserved.</p>
        <p>RAVASA — Independent Tax Litigation Chamber, Mumbai</p>
      </div>
    </div>
  </footer>
  <!-- FLOATING WHATSAPP -->
  <a href="https://wa.me/919820238263" target="_blank" class="wa-float" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    <span class="wa-label">WhatsApp Enquiry</span>
  </a>`;
}

function toggleMobile() { document.getElementById('mobileNav').classList.toggle('open'); }
function closeMobile() { document.getElementById('mobileNav').classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('topbar-mount')) renderTopbar();
  if (document.getElementById('nav-mount')) renderNav();
  if (document.getElementById('footer-mount')) renderFooter();
});
