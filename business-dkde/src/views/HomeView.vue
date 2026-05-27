<template>
  <div>
    <!-- Hero -->
    <section class="home-hero">
      <div class="container hero-content">
        <span class="hero-label anim-1">{{ t('home.hero_label') }}</span>
        <h1 class="anim-2">{{ t('home.hero_title') }}</h1>
        <p class="hero-sub anim-3">{{ t('home.hero_sub') }}</p>

        <div class="hero-search anim-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" :placeholder="t('home.search_placeholder')" @keyup.enter="goSearch" />
        </div>

        <div class="hero-ctas anim-5">
          <RouterLink to="/network" class="btn btn-dark">{{ t('home.cta_network') }}</RouterLink>
          <RouterLink to="/join" class="btn btn-outline-white">{{ t('home.cta_join') }}</RouterLink>
        </div>
      </div>
    </section>

    <!-- What We Offer -->
    <section class="section">
      <div class="container">
        <p class="section-label" v-reveal>{{ t('home.offer_label') }}</p>
        <div class="offer-grid">
          <RouterLink to="/interviews" class="offer-card" v-reveal="0">
            <div class="offer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <h3>{{ t('home.offer_interviews_title') }}</h3>
            <p>{{ t('home.offer_interviews_desc') }}</p>
          </RouterLink>

          <RouterLink to="/network" class="offer-card" v-reveal="110">
            <div class="offer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
            </div>
            <h3>{{ t('home.offer_network_title') }}</h3>
            <p>{{ t('home.offer_network_desc') }}</p>
          </RouterLink>

          <RouterLink to="/events" class="offer-card" v-reveal="220">
            <div class="offer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3>{{ t('home.offer_events_title') }}</h3>
            <p>{{ t('home.offer_events_desc') }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Six Focus Areas -->
    <section class="section focus-section">
      <div class="container">
        <p class="section-label" v-reveal>{{ t('home.focus_label') }}</p>
        <h2 v-reveal="60">{{ t('home.focus_title') }}</h2>
        <p class="focus-sub" v-reveal="120">{{ t('home.focus_sub') }}</p>
        <div class="focus-grid">
          <div class="focus-item" v-for="(area, i) in focusAreas" :key="area.num" v-reveal="i * 75">
            <div class="focus-num">{{ area.num }}</div>
            <div>
              <h4>{{ t(area.titleKey) }}</h4>
              <p>{{ t(area.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Interview -->
    <section class="section interview-section">
      <div class="container">
        <p class="section-label" v-reveal>{{ t('home.video_label') }}</p>
        <div class="interview-banner" v-reveal="80" @click="playFeatured">
          <div class="interview-play">
            <div class="play-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <div class="interview-info">
            <span class="interview-badge">{{ t('home.video_title') }}</span>
            <h3>{{ featuredVideo.title }}</h3>
            <p>{{ featuredVideo.author }} · {{ featuredVideo.company }} · {{ featuredVideo.duration }}</p>
          </div>
          <RouterLink to="/interviews" class="btn btn-outline-white interview-all-btn" @click.stop>
            {{ t('common.view_all') }} →
          </RouterLink>
        </div>
      </div>

      <!-- Video modal -->
      <Transition name="modal">
        <div v-if="activeVideo" class="modal-backdrop" @click.self="activeVideo = null">
          <div class="modal-box">
            <button class="modal-close" @click="activeVideo = null">✕</button>
            <div class="video-wrap">
              <iframe :src="`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`"
                frameborder="0" allowfullscreen
                allow="autoplay; encrypted-media"></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Newsletter CTA -->
    <section class="section newsletter-cta">
      <div class="container newsletter-cta-inner">
        <div class="newsletter-text" v-reveal>
          <p class="section-label" style="color:rgba(255,255,255,0.5)">{{ t('home.news_label') }}</p>
          <h2 style="color:var(--white)">{{ t('home.news_title') }}</h2>
          <p style="color:rgba(255,255,255,0.6);margin-top:0.75rem">{{ t('home.news_sub') }}</p>
        </div>
        <form class="newsletter-form" v-reveal="120" @submit.prevent="goNewsletter">
          <input v-model="newsletterEmail" type="email" :placeholder="t('home.news_placeholder')" />
          <button type="submit" class="btn btn-dark">{{ t('home.news_btn') }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { videos } from '../data/videos.js'

const { t } = useI18n()
const router = useRouter()
const search = ref('')
const newsletterEmail = ref('')
const activeVideo = ref(null)
const featuredVideo = videos[0]

const focusAreas = [
  { num: '01', titleKey: 'home.focus.data_title',        descKey: 'home.focus.data_desc' },
  { num: '02', titleKey: 'home.focus.network_title',     descKey: 'home.focus.network_desc' },
  { num: '03', titleKey: 'home.focus.visibility_title',  descKey: 'home.focus.visibility_desc' },
  { num: '04', titleKey: 'home.focus.council_title',     descKey: 'home.focus.council_desc' },
  { num: '05', titleKey: 'home.focus.talent_title',      descKey: 'home.focus.talent_desc' },
  { num: '06', titleKey: 'home.focus.development_title', descKey: 'home.focus.development_desc' },
]

function goSearch() {
  if (search.value.trim()) {
    router.push({ path: '/network', query: { q: search.value } })
  }
}

function playFeatured() {
  activeVideo.value = featuredVideo
}

function goNewsletter() {
  router.push({ path: '/newsletter', query: newsletterEmail.value ? { email: newsletterEmail.value } : {} })
}
</script>

<style scoped>
/* ── Hero entrance animations ── */
.anim-1, .anim-2, .anim-3, .anim-4, .anim-5 {
  animation: heroFadeUp 0.7s ease both;
}
.anim-1 { animation-delay: 0.05s; }
.anim-2 { animation-delay: 0.18s; }
.anim-3 { animation-delay: 0.32s; }
.anim-4 { animation-delay: 0.46s; }
.anim-5 { animation-delay: 0.60s; }

/* ── Hero ── */
.home-hero {
  background: var(--navy);
  padding: 6rem 0 5.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
/* Subtle radial glow behind heading */
.home-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 55% at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content { max-width: 680px; margin: 0 auto; position: relative; }
.hero-label {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.1rem;
  border: 1px solid rgba(255,255,255,0.12);
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-pill);
}
.home-hero h1 {
  color: var(--white);
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.08;
  margin-bottom: 1.25rem;
}
.hero-sub {
  color: rgba(255,255,255,0.55);
  font-size: 1.05rem;
  margin-bottom: 2rem;
}
.hero-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: var(--radius-pill);
  padding: 0.85rem 1.5rem;
  max-width: 480px;
  margin: 0 auto 2rem;
  color: rgba(255,255,255,0.45);
  transition: border-color 0.25s ease, background 0.25s ease;
}
.hero-search:focus-within {
  border-color: rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.1);
}
.hero-search input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 0.92rem;
  color: var(--white);
}
.hero-search input::placeholder { color: rgba(255,255,255,0.4); }
.hero-ctas {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Offer Cards ── */
.offer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
}
.offer-card {
  display: block;
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--grey-200);
  border-left: 3px solid var(--navy);
  border-radius: var(--radius-md);
  background: var(--white);
  text-decoration: none;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-left-color 0.3s ease;
}
.offer-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transform: translateY(-4px);
  border-left-color: #2563EB;
}
.offer-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}
.offer-card:hover .offer-icon { transform: scale(1.1) rotate(-5deg); }
.offer-card h3 { color: var(--text); margin-bottom: 0.5rem; font-size: 1rem; }
.offer-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }

/* ── Focus Areas ── */
.focus-section { background: var(--grey-50); }
.focus-sub {
  margin-top: 0.75rem;
  margin-bottom: 2.5rem;
  max-width: 560px;
}
.focus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.focus-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.focus-item:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  transform: translateY(-3px);
}
.focus-num {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--grey-300);
  flex-shrink: 0;
  margin-top: 0.1rem;
  transition: color 0.25s ease;
}
.focus-item:hover .focus-num { color: var(--navy); }
.focus-item h4 { font-size: 0.92rem; margin-bottom: 0.3rem; }
.focus-item p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }

/* ── Featured Interview ── */
.interview-section { background: var(--navy); }
.interview-section .section-label { color: rgba(255,255,255,0.45); }
.interview-banner {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--navy-card);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-lg);
  padding: 2rem 2.5rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.interview-banner:hover {
  border-color: rgba(255,255,255,0.2);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 16px 48px rgba(0,0,0,0.3);
}
.interview-play { flex-shrink: 0; }
.play-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--white);
  color: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.interview-banner:hover .play-circle {
  transform: scale(1.1);
  box-shadow: 0 0 0 10px rgba(255,255,255,0.08);
}
.interview-info { flex: 1; min-width: 0; }
.interview-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
}
.interview-info h3 { color: var(--white); font-size: 1.1rem; margin-bottom: 0.4rem; }
.interview-info p { font-size: 0.85rem; color: rgba(255,255,255,0.5); }
.interview-all-btn { flex-shrink: 0; }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.82);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal-box {
  position: relative;
  width: 100%;
  max-width: 840px;
}
.modal-close {
  position: absolute;
  top: -2.5rem; right: 0;
  background: none; border: none;
  color: var(--white); font-size: 1.2rem;
  cursor: pointer; opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-close:hover { opacity: 1; transform: scale(1.15); }
.video-wrap { position: relative; padding-top: 56.25%; border-radius: var(--radius-md); overflow: hidden; }
.video-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

/* Modal transition */
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box { animation: modalPop 0.3s ease both; }
@keyframes modalPop {
  from { transform: scale(0.94); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* ── Newsletter CTA ── */
.newsletter-cta { background: var(--navy); }
.newsletter-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.newsletter-text { flex: 1; min-width: 220px; }
.newsletter-form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}
.newsletter-form input {
  padding: 0.7rem 1.25rem;
  border-radius: var(--radius-pill);
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.07);
  color: var(--white);
  font-size: 0.9rem;
  outline: none;
  width: 240px;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.newsletter-form input::placeholder { color: rgba(255,255,255,0.35); }
.newsletter-form input:focus {
  border-color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.1);
}
.newsletter-form .btn-dark {
  background: var(--white);
  color: var(--navy);
  border-color: var(--white);
}
.newsletter-form .btn-dark:hover { background: var(--grey-100); border-color: var(--grey-100); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .focus-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .offer-grid { grid-template-columns: 1fr; }
  .interview-banner { padding: 1.5rem; gap: 1.25rem; }
  .interview-all-btn { width: 100%; text-align: center; justify-content: center; }
  .newsletter-cta-inner { flex-direction: column; align-items: flex-start; }
  .newsletter-form { width: 100%; }
  .newsletter-form input { width: 100%; flex: 1; min-width: 0; }
}
@media (max-width: 640px) {
  .home-hero { padding: 4rem 0 3.5rem; }
  .hero-search { max-width: 100%; }
  .hero-label { font-size: 0.68rem; }
  .focus-grid { grid-template-columns: 1fr; }
  .interview-banner { flex-direction: column; align-items: flex-start; }
  .newsletter-text h2 { font-size: clamp(1.3rem, 5vw, 1.6rem); }
}
</style>
