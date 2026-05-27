<template>
  <div>
    <!-- Page hero -->
    <div class="page-hero">
      <div class="container page-hero-inner">
        <div>
          <span class="page-hero-label">Network</span>
          <h1>Business Network</h1>
          <p>Connect with entrepreneurs, institutions and cross-border stakeholders<br>from the DE-DK border region.</p>
        </div>
        <div class="hero-stat-card">
          <div><span class="stat-num">26</span><span class="stat-label">Members</span></div>
          <div><span class="stat-num">2</span><span class="stat-label">Countries</span></div>
          <div><span class="stat-num">3</span><span class="stat-label">Sectors</span></div>
        </div>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="container">
      <div class="filter-bar">
        <div class="search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" placeholder="Search by name, company…" />
        </div>
        <button v-for="f in sectors" :key="f" :class="['pill', activeFilter === f ? 'active' : '']" @click="activeFilter = f">{{ f }}</button>
      </div>
    </div>

    <!-- Members -->
    <div class="container" style="padding-top: 0.75rem; padding-bottom: 3rem;">
      <div class="members-meta">
        <span>Showing {{ filtered.length }} members</span>
        <span>Sort by: Relevance</span>
      </div>

      <div class="members-grid">
        <RouterLink
          v-for="m in filtered"
          :key="m.id"
          :to="`/network/${m.id}`"
          class="member-card card"
        >
          <div class="member-top">
            <div class="member-avatar">{{ m.initials }}</div>
            <div class="member-info">
              <div class="member-name-row">
                <h3>{{ m.name }}</h3>
                <span :class="['badge-country', m.country === 'DE' ? 'badge-de' : 'badge-dk']">{{ m.country }}</span>
              </div>
              <p class="member-role">{{ m.role }}</p>
              <p class="member-company">{{ m.company }}</p>
            </div>
          </div>
          <p class="member-bio">{{ m.bio }}</p>
          <div class="member-bottom">
            <span class="tag">{{ m.sector }}</span>
            <span class="view-profile">View Profile →</span>
          </div>
        </RouterLink>
      </div>

      <p v-if="!filtered.length" class="no-results">No members found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { members } from '../data/members.js'

const route = useRoute()
const search = ref(route.query.q || '')
const activeFilter = ref('All')

const sectors = ['All', 'Government', 'Public Sector', 'Education']

const filtered = computed(() => members.filter(m => {
  const matchFilter = activeFilter.value === 'All' || m.sector === activeFilter.value
  const q = search.value.toLowerCase()
  const matchSearch = !q || m.name.toLowerCase().includes(q) || m.company.toLowerCase().includes(q) || m.sector.toLowerCase().includes(q)
  return matchFilter && matchSearch
}))
</script>

<style scoped>
.members-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0 1rem;
  font-size: 0.85rem;
  color: var(--grey-400);
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.member-card {
  display: block;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.member-top {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}
.member-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--grey-200);
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.member-info { flex: 1; min-width: 0; }
.member-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.15rem;
}
.member-name-row h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.member-role { font-size: 0.8rem; color: var(--grey-400); margin-bottom: 0.1rem; }
.member-company { font-size: 0.82rem; font-weight: 600; color: var(--text); }

.member-bio { font-size: 0.83rem; color: var(--text-muted); line-height: 1.6; flex: 1; }

.member-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}
.view-profile {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
.member-card:hover .view-profile { color: var(--navy); }

.no-results { text-align: center; color: var(--grey-400); padding: 3rem 0; }

@media (max-width: 900px) { .members-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) {
  .members-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    overflow-x: visible;
    flex-wrap: wrap;
  }
  .filter-bar .search-wrap { width: 100%; }
  .filter-bar .search-wrap input { width: 100%; }
}
</style>
