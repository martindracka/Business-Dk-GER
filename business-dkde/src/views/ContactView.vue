<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">{{ $t('contact.label') }}</span>
        <h1>{{ $t('contact.title') }}</h1>
        <p>{{ $t('contact.intro') }}</p>
      </div>
    </div>

    <section class="section">
      <div class="container contact-layout">
        <!-- Info -->
        <aside class="contact-info">
          <div class="info-block">
            <span class="info-icon">📍</span>
            <div>
              <h4>{{ $t('contact.address') }}</h4>
              <p>{{ $t('contact.address_street') }}<br>{{ $t('contact.address_city') }}</p>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon">📞</span>
            <div>
              <h4>{{ $t('contact.phone') }}</h4>
              <a :href="`tel:${$t('contact.phone_number').replace(/\\s/g, '')}`">{{ $t('contact.phone_number') }}</a>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon">✉️</span>
            <div>
              <h4>{{ $t('contact.email') }}</h4>
              <a :href="`mailto:${$t('contact.email_address')}`">{{ $t('contact.email_address') }}</a>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon">🕐</span>
            <div>
              <h4>{{ $t('contact.hours') }}</h4>
              <p>{{ $t('contact.hours_weekdays') }}</p>
              <p>{{ $t('contact.hours_friday') }}</p>
              <p class="note">{{ $t('contact.hours_note') }}</p>
            </div>
          </div>
        </aside>

        <!-- Form -->
        <div class="contact-form-col">
          <h2 style="margin-bottom:1.5rem;font-size:1.3rem;">{{ $t('contact.form_heading') }}</h2>
          <form @submit.prevent="submitForm" v-if="!sent">
            <div class="form-group">
              <label>{{ $t('contact.form_name') }}</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>{{ $t('contact.form_email') }}</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-group">
              <label>{{ $t('contact.form_subject') }}</label>
              <input v-model="form.subject" type="text" required />
            </div>
            <div class="form-group">
              <label>{{ $t('contact.form_message') }}</label>
              <textarea v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-dark" style="width:100%">{{ $t('contact.form_submit') }}</button>
          </form>
          <div v-else class="success-msg">
            <div class="success-icon">{{ $t('contact.success_icon') }}</div>
            <p>{{ $t('contact.success_text') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const sent = ref(false)
const form = reactive({ name: '', email: '', subject: '', message: '' })
function submitForm() { sent.value = true }
</script>

<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 4rem;
  align-items: start;
}
.contact-info { display: flex; flex-direction: column; gap: 1.25rem; }
.info-block {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
}
.info-icon { font-size: 1.2rem; flex-shrink: 0; }
.info-block h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--grey-400); margin-bottom: 0.3rem; }
.info-block p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }
.info-block a { font-size: 0.88rem; color: var(--navy); }
.info-block a:hover { text-decoration: underline; }
.note { font-size: 0.78rem !important; color: var(--grey-400) !important; margin-top: 0.25rem; }

.success-msg { text-align: center; padding: 3rem 0; }
.success-icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: var(--navy); color: var(--white);
  font-size: 1.5rem; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
}
.success-msg p { font-size: 0.95rem; }

@media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; gap: 2rem; } }
@media (max-width: 640px) {
  .contact-info { gap: 0.75rem; }
  .info-block { padding: 1rem; }
}
</style>
