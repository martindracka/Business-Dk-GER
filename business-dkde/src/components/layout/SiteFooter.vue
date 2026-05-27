<template>
  <footer class="footer">
    <div class="container footer-inner">
      <!-- Brand & Tagline -->
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo">
          <div class="logo-badge">
            <span class="logo-top">BUSINESS</span>
            <span class="logo-bottom">REGION</span>
          </div>
        </RouterLink>
        <p class="footer-tagline">{{ t('footer.tagline') }}</p>
        
        <!-- Social Links -->
        <div class="footer-socials">
          <a href="https://www.facebook.com/dedkofficial/" target="_blank" rel="noopener" aria-label="Facebook" class="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Facebook
          </a>
          <a href="https://www.linkedin.com/company/businessdedk" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href="https://www.youtube.com/@BusinessDEDK" target="_blank" rel="noopener" aria-label="YouTube" class="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
            YouTube
          </a>
        </div>
      </div>

      <!-- Pages Column -->
      <div class="footer-col">
        <h4>{{ t('footer.pages') }}</h4>
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/network">{{ t('nav.network') }}</RouterLink>
        <RouterLink to="/interviews">{{ t('nav.interviews') }}</RouterLink>
        <RouterLink to="/events">{{ t('nav.events') }}</RouterLink>
        <RouterLink to="/about">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/advisors">{{ t('nav.advisors') }}</RouterLink>
      </div>

      <!-- Contact Column -->
      <div class="footer-col">
        <h4>{{ t('footer.contact_heading') }}</h4>
        <div class="contact-block">
          <p class="label">{{ t('contact.address') }}</p>
          <p>{{ t('contact.address_street') }}<br>{{ t('contact.address_city') }}</p>
        </div>
        <div class="contact-block">
          <p class="label">{{ t('contact.phone') }}</p>
          <a :href="`tel:+4521775916`">{{ t('contact.phone_number') }}</a>
        </div>
        <div class="contact-block">
          <p class="label">{{ t('contact.email') }}</p>
          <a href="mailto:info@business-region.eu">{{ t('contact.email_address') }}</a>
        </div>
        <RouterLink to="/newsletter" class="newsletter-link">{{ t('nav.newsletter') }}</RouterLink>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>{{ t('footer.funded') }}</p>
        <p>© {{ year }} Business DE-DK. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #0D1628;
  color: rgba(255, 255, 255, 0.85);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: auto;
  padding-top: 3.5rem;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.5fr;
  gap: 3rem;
  padding-bottom: 2.5rem;
}

/* Brand Section */

.footer-logo { text-decoration: none; display: inline-block; margin-bottom: 1rem; }
.logo-badge {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  line-height: 1.1;
  gap: 1px;
  width: fit-content;
}
.logo-top { font-size: 0.6rem; font-weight: 900; color: #F5C842; letter-spacing: 0.08em; }
.logo-bottom { font-size: 0.6rem; font-weight: 700; color: rgba(255, 255, 255, 0.75); letter-spacing: 0.06em; }

.footer-tagline { font-size: 0.88rem; line-height: 1.6; max-width: 280px; margin-bottom: 1.25rem; color: rgba(255, 255, 255, 0.75); }

.footer-socials { display: flex; gap: 0.75rem; flex-wrap: wrap; flex-direction: column; }
.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.06);
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
  width: fit-content;
}
.social-link:hover { background: rgba(255, 255, 255, 0.12); color: var(--white); }

/* Columns */
.footer-col h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--white); margin-bottom: 1rem; font-weight: 700; }

.footer-col a {
  display: block;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-bottom: 0.65rem;
  transition: color 0.2s ease;
}
.footer-col a:hover { color: var(--white); }

.contact-block {
  margin-bottom: 1rem;
}
.contact-block .label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.3rem;
}
.contact-block p {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}
.contact-block a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.88rem;
}

.newsletter-link {
  display: inline-block;
  margin-top: 0.5rem;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem 0;
  background: rgba(0, 0, 0, 0.15);
}
.footer-bottom-inner { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
.footer-bottom p { font-size: 0.78rem; color: rgba(255, 255, 255, 0.5); margin: 0; }

@media (max-width: 900px) {
  .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
}

@media (max-width: 640px) {
  .footer-inner { grid-template-columns: 1fr; gap: 1.5rem; padding-bottom: 2rem; }
  .footer-bottom-inner { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
}
</style>