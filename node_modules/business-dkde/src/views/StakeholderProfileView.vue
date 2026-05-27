<template>
  <div v-if="member">
    <div class="page-hero">
      <div class="container">
        <RouterLink to="/network" class="back-link">← Back to Network</RouterLink>
        <div class="profile-hero-inner">
          <div class="profile-avatar-lg">{{ member.initials }}</div>
          <div>
            <div class="name-row">
              <h1 style="font-size:2rem;">{{ member.name }}</h1>
              <span :class="['badge-country', member.country === 'DE' ? 'badge-de' : 'badge-dk']">{{ member.country }}</span>
            </div>
            <p class="profile-role">{{ member.role }}</p>
            <p class="profile-company">{{ member.company }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container profile-layout">
        <div>
          <h2 style="font-size:1.25rem;margin-bottom:1rem;">About</h2>
          <p style="color:var(--text-muted);line-height:1.8;font-size:0.96rem;">{{ member.bio }}</p>
          <span class="tag" style="margin-top:1.25rem;display:inline-block;">{{ member.sector }}</span>
        </div>
        <aside>
          <div class="profile-info-card">
            <div class="info-row">
              <span class="info-label">Sector</span>
              <span>{{ member.sector }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Country</span>
              <span>{{ member.country === 'DE' ? '🇩🇪 Germany' : '🇩🇰 Denmark' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Company</span>
              <span>{{ member.company }}</span>
            </div>
            <RouterLink to="/contact" class="btn btn-dark" style="width:100%;text-align:center;margin-top:1rem;display:block;">Get in Touch</RouterLink>
          </div>
        </aside>
      </div>
    </section>
  </div>

  <div v-else class="section">
    <div class="container" style="text-align:center;padding:4rem 0">
      <h2>Member not found</h2>
      <RouterLink to="/network" class="btn btn-dark" style="margin-top:1.5rem;display:inline-flex">← Back to Network</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { members } from '../data/members.js'

const route = useRoute()
const member = computed(() => members.find(m => m.id === Number(route.params.id)))
</script>

<style scoped>
.back-link {
  display: inline-block;
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  transition: color var(--transition);
}
.back-link:hover { color: var(--white); }

.profile-hero-inner { display: flex; align-items: center; gap: 1.5rem; }
.profile-avatar-lg {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  color: var(--white);
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.name-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem; }
.profile-role { color: rgba(255,255,255,0.5); font-size: 0.9rem; }
.profile-company { color: rgba(255,255,255,0.75); font-size: 0.9rem; font-weight: 600; }

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 3rem;
  align-items: start;
}

.profile-info-card {
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}
.info-row {
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--grey-100);
}
.info-row:last-of-type { border-bottom: none; }
.info-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--grey-400);
  margin-bottom: 0.2rem;
}
.info-row span:last-child { font-size: 0.9rem; color: var(--text); font-weight: 500; }

@media (max-width: 768px) {
  .profile-layout { grid-template-columns: 1fr; }
  .profile-hero-inner { flex-direction: column; align-items: flex-start; }
}
</style>
