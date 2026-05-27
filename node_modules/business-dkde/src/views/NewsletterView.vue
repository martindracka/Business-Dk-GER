<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Newsletter</span>
        <h1>Stay Informed</h1>
        <p>Subscribe to receive the latest news, events and opportunities from the DE-DK border region.</p>
      </div>
    </div>

    <section class="section">
      <div class="container nl-layout">
        <div class="nl-features">
          <p class="section-label">What you'll receive</p>
          <h2 style="margin-bottom:2rem;">Monthly updates<br>directly to your inbox</h2>
          <div class="feature-list">
            <div class="feature-item" v-for="f in features" :key="f.title">
              <div class="feature-badge" v-html="f.icon"></div>
              <div>
                <h4>{{ f.title }}</h4>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="nl-form-wrap">
          <form @submit.prevent="subscribe" v-if="!done" class="nl-form">
            <h3 style="margin-bottom:1.5rem;">Subscribe</h3>
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-group">
              <label>Preferred Language</label>
              <select v-model="form.lang">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="da">Dansk</option>
              </select>
            </div>
            <button type="submit" class="btn btn-dark" style="width:100%">Subscribe</button>
            <p class="privacy">
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:4px;opacity:0.6"><rect x="1" y="5.5" width="9" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M3 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
          <div v-else class="success-state">
            <div class="success-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="5,15 11,21 23,9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <h3>You're subscribed!</h3>
            <p>Welcome to the Business DE-DK newsletter.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const done = ref(false)
const form = reactive({ name: '', email: '', lang: locale.value })

watch(() => form.lang, (code) => {
  locale.value = code
  localStorage.setItem('locale', code)
})

const features = [
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="white" stroke-width="1.5"/><line x1="5" y1="6" x2="13" y2="6" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="5" y1="9" x2="13" y2="9" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="5" y1="12" x2="10" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    title: 'Monthly Digest',
    desc: 'Key news and highlights from the DE-DK business region.'
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="12" rx="2" stroke="white" stroke-width="1.5"/><line x1="2" y1="8" x2="16" y2="8" stroke="white" stroke-width="1.5"/><line x1="6" y1="2" x2="6" y2="6" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="2" x2="12" y2="6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    title: 'Event Invitations',
    desc: 'First access to upcoming networking events and workshops.'
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="7" width="14" height="9" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M6 7V5a3 3 0 0 1 6 0v2" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="2" y1="11" x2="16" y2="11" stroke="white" stroke-width="1.5"/></svg>`,
    title: 'Opportunities',
    desc: 'Cross-border partnership and tender opportunities.'
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><line x1="3" y1="14" x2="15" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/><rect x="4" y="9" width="3" height="5" rx="0.5" fill="white"/><rect x="7.5" y="6" width="3" height="8" rx="0.5" fill="white"/><rect x="11" y="4" width="3" height="10" rx="0.5" fill="white"/></svg>`,
    title: 'Research & Data',
    desc: 'Reports and insights on the cross-border economy.'
  }
]

function subscribe() { done.value = true }
</script>

<style scoped>
.nl-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.nl-features .section-label { margin-bottom: 0.5rem; }

.feature-list { display: flex; flex-direction: column; gap: 1.5rem; }
.feature-item { display: flex; gap: 1rem; align-items: flex-start; }
.feature-badge {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--navy);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.feature-item h4 { font-size: 0.92rem; font-weight: 600; margin-bottom: 0.2rem; }
.feature-item p { font-size: 0.84rem; color: var(--text-muted); }

.nl-form-wrap {
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  border-top: 4px solid var(--navy);
}
.nl-form { display: flex; flex-direction: column; }
.privacy {
  font-size: 0.78rem;
  color: var(--grey-400);
  text-align: center;
  margin-top: 1rem;
}

.success-state { text-align: center; padding: 2rem 0; }
.success-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--navy); color: var(--white);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.25rem;
}
.success-state h3 { margin-bottom: 0.4rem; }

@media (max-width: 768px) { .nl-layout { grid-template-columns: 1fr; gap: 2rem; } }
</style>
