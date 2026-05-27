<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Contact</span>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Reach out with questions, ideas, or partnership opportunities.</p>
      </div>
    </div>

    <section class="section">
      <div class="container contact-layout">
        <!-- Info -->
        <aside class="contact-info">
          <div class="info-block">
            <span class="info-icon">📍</span>
            <div>
              <h4>Address</h4>
              <p>Vestergade 9<br>6270 Tønder, Denmark</p>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon">📞</span>
            <div>
              <h4>Phone</h4>
              <a href="tel:+4521775916">+45 21 77 59 16</a>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon">✉️</span>
            <div>
              <h4>Email</h4>
              <a href="mailto:info@business-region.eu">info@business-region.eu</a>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon">🕐</span>
            <div>
              <h4>Office Hours</h4>
              <p>Mon – Thu: 8:30 – 15:00</p>
              <p>Friday: 8:30 – 13:00</p>
              <p class="note">Visits by appointment only</p>
            </div>
          </div>
        </aside>

        <!-- Form -->
        <div class="contact-form-col">
          <h2 style="margin-bottom:1.5rem;font-size:1.3rem;">Send a Message</h2>
          <form @submit.prevent="submitForm" v-if="!sent">
            <div class="form-group">
              <label>Your Name</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Your Email</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input v-model="form.subject" type="text" required />
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-dark" style="width:100%">Send Message</button>
          </form>
          <div v-else class="success-msg">
            <div class="success-icon">✓</div>
            <p>Your message has been sent. We'll get back to you soon!</p>
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
