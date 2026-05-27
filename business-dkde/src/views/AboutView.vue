<template>
  <div>
    <!-- Hero -->
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">{{ $t('about.label') }}</span>
        <h1>{{ $t('about.title') }}</h1>
        <p style="max-width:540px;margin-top:1rem">{{ $t('about.intro') }}</p>
      </div>
    </div>

    <!-- Mission + Stats -->
    <section class="section">
      <div class="container mission-layout">
        <div class="mission-text" v-reveal>
          <p class="section-label">{{ $t('about.mission_label') }}</p>
          <h2>{{ $t('about.mission_title') }}</h2>
          <p style="margin-top:1.25rem">{{ $t('about.mission_text') }}</p>
          <p style="margin-top:0.9rem">{{ $t('about.mission_text2') }}</p>
        </div>
        <div class="stats-card" ref="statsCardRef" v-reveal="120">
          <div class="stat-item" v-for="s in statsDisplay" :key="s.label">
            <span class="stat-big">{{ s.value }}<span class="stat-suffix">{{ s.suffix }}</span></span>
            <span class="stat-sub">{{ $t('about.stats_' + s.labelKey) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section class="section" style="background:var(--grey-50)">
      <div class="container">
        <p class="section-label" v-reveal>{{ $t('about.focus_label') }}</p>
        <h2 style="margin-bottom:2.5rem" v-reveal="60">{{ $t('about.focus_title') }}</h2>
        <div class="focus-grid">
          <div class="focus-item" v-for="(area, i) in focusAreas" :key="area.title" v-reveal="i * 70">
            <div class="focus-num">{{ area.num }}</div>
            <div>
              <h4>{{ $t(area.titleKey) }}</h4>
              <p>{{ $t(area.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision -->
    <section class="section">
      <div class="container vision-layout">
        <div class="vision-text" v-reveal>
          <p class="section-label">{{ $t('about.vision_title') }}</p>
          <h2>{{ $t('about.vision_title') }}</h2>
          <p style="margin-top:1.25rem;line-height:1.8">{{ $t('about.vision_text') }}</p>
          <RouterLink to="/join" class="btn btn-dark" style="margin-top:2rem">{{ $t('nav.join') }}</RouterLink>
        </div>
        <div class="vision-card" v-reveal="120">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
          <p style="color:var(--white);font-size:1.05rem;line-height:1.75;margin-top:1.25rem;font-style:italic">"{{ $t('about.vision_text') }}"</p>
          <span style="display:block;margin-top:1.25rem;font-size:0.78rem;color:rgba(255,255,255,0.4);letter-spacing:0.08em;text-transform:uppercase">{{ $t('about.vision_title') }}</span>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section" style="background:var(--grey-50)">
      <div class="container">
        <p class="section-label" v-reveal>{{ $t('about.team_title') }}</p>
        <h2 style="margin-bottom:2.5rem" v-reveal="60">{{ $t('about.team_title') }}</h2>
        <div class="team-grid">
          <div class="team-card" v-for="(member, i) in team" :key="member.name" v-reveal="i * 90">
            <div class="team-avatar">{{ member.initials }}</div>
            <h4>{{ member.name }}</h4>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-org">{{ member.org }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Funding -->
    <section class="section">
      <div class="container funding-row">
        <div v-reveal>
          <p class="section-label">{{ $t('about.funding_label') }}</p>
          <h2>{{ $t('about.funding_title') }}</h2>
          <p style="margin-top:1rem;max-width:500px">{{ $t('about.funding_text') }}</p>
        </div>
        <div class="funding-badges" v-reveal="120">
          <div class="funding-badge"><span>🇪🇺</span><p>European Regional<br>Development Fund</p></div>
          <div class="funding-badge"><span>🤝</span><p>Interreg<br>Deutschland-Danmark</p></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
const statsCardRef = ref(null)

const team = [
  { initials: 'ML', name: 'Marie Larsen',    role: 'Project Manager',      org: 'Business DE-DK' },
  { initials: 'TK', name: 'Thomas Klein',    role: 'Business Advisor',     org: 'Business DE-DK' },
  { initials: 'SN', name: 'Sofie Nielsen',   role: 'Communications Lead',  org: 'Business DE-DK' },
]

const focusAreas = [
  { num: '01', titleKey: 'home.focus.data_title',        descKey: 'home.focus.data_desc' },
  { num: '02', titleKey: 'home.focus.network_title',     descKey: 'home.focus.network_desc' },
  { num: '03', titleKey: 'home.focus.visibility_title',  descKey: 'home.focus.visibility_desc' },
  { num: '04', titleKey: 'home.focus.council_title',     descKey: 'home.focus.council_desc' },
  { num: '05', titleKey: 'home.focus.talent_title',      descKey: 'home.focus.talent_desc' },
  { num: '06', titleKey: 'home.focus.development_title', descKey: 'home.focus.development_desc' },
]

const statsData = [
  { target: 3,   suffix: '',  label: 'Countries', labelKey: 'countries' },
  { target: 240, suffix: '+', label: 'Members', labelKey: 'members' },
  { target: 18,  suffix: '',  label: 'Sectors', labelKey: 'sectors' },
  { target: 10,  suffix: '+', label: 'Years active', labelKey: 'years' },
]

const statsDisplay = ref(statsData.map(s => ({ ...s, value: 0 })))

function animateCounters() {
  const duration = 1600
  const start = performance.now()
  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    statsDisplay.value = statsData.map((s, i) => ({
      ...s,
      value: Math.round(s.target * ease),
    }))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (statsCardRef.value) observer.observe(statsCardRef.value)
})
</script>

<style scoped>
.mission-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: start;
}
.mission-text h2 { margin-top: 0.5rem; }
.mission-text p { color: var(--text-muted); line-height: 1.8; }

.stats-card {
  background: var(--navy);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem 2.5rem;
  flex-shrink: 0;
  align-self: start;
  min-width: 280px;
}

.stat-big {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--white);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.stat-suffix { font-size: 1.4rem; }
.stat-sub { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.45); margin-top: 0.35rem; }

.focus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
.focus-item:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-3px); }
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

.funding-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}
.funding-badges { display: flex; gap: 1.25rem; }
.funding-badge {
  background: var(--grey-50);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  min-width: 130px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.funding-badge:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
.funding-badge span { font-size: 2rem; }
.funding-badge p { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.5rem; line-height: 1.5; }

/* Vision */
.vision-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.vision-text h2 { margin-top: 0.5rem; }
.vision-text p { color: var(--text-muted); }
.vision-card {
  background: var(--navy);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
}
.vision-card svg { color: rgba(255,255,255,0.3); }

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.team-card {
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.team-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); transform: translateY(-3px); }
.team-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: transform 0.3s ease;
}
.team-card:hover .team-avatar { transform: scale(1.1); }
.team-card h4 { font-size: 1rem; margin-bottom: 0.25rem; }
.team-role { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem; }
.team-org { font-size: 0.78rem; color: var(--grey-400); margin-top: 0.1rem; }

@media (max-width: 900px) {
  .mission-layout { grid-template-columns: 1fr; }
  .focus-grid { grid-template-columns: repeat(2, 1fr); }
  .vision-layout { grid-template-columns: 1fr; gap: 2rem; }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .focus-grid { grid-template-columns: 1fr; }
  .stats-card { min-width: unset; }
  .team-grid { grid-template-columns: 1fr; }
}
</style>
