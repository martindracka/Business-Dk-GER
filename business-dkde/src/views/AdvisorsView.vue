<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">{{ t('advisors.label') }}</span>
        <h1>{{ t('advisors.title') }}</h1>
        <p>{{ t('advisors.intro') }}</p>
      </div>
    </div>
 
    <section class="section">
      <div class="container">
        <div class="grid-3">
          <div class="card advisor-card" v-for="a in advisors" :key="a.name">
            <div class="advisor-avatar">{{ a.initials }}</div>
            <div class="advisor-body">
              <h3>{{ a.name }}</h3>
              <p class="advisor-title">{{ t(a.roleKey) }}</p>
              <p class="advisor-org">{{ a.org }}</p>
              <span :class="['badge-country', a.country === 'DE' ? 'badge-de' : 'badge-dk']" style="margin-top:0.6rem;display:inline-block;">{{ a.country }}</span>
              <p class="advisor-bio">{{ t(a.bioKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
 
<script setup>
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n()
 
const advisors = [
  { initials: 'IP', name: 'Dr. Ingrid Petersen',   roleKey: 'advisors.roles.chair',        org: 'Sønderborg Municipality',          country: 'DK', bioKey: 'advisors.bios.petersen' },
  { initials: 'HB', name: 'Hans-Joachim Brandt',   roleKey: 'advisors.roles.vice_chair',   org: 'IHK Schleswig-Holstein',           country: 'DE', bioKey: 'advisors.bios.brandt' },
  { initials: 'MC', name: 'Mette Christoffersen',  roleKey: 'advisors.roles.board_member', org: 'University of Southern Denmark',    country: 'DK', bioKey: 'advisors.bios.christoffersen' },
  { initials: 'SM', name: 'Stefan Müller',         roleKey: 'advisors.roles.board_member', org: 'Invest in Schleswig-Holstein',     country: 'DE', bioKey: 'advisors.bios.mueller' },
  { initials: 'KT', name: 'Karen Lund Thomsen',    roleKey: 'advisors.roles.board_member', org: 'Business Aabenraa',                country: 'DK', bioKey: 'advisors.bios.thomsen' },
  { initials: 'RA', name: 'Rolf Andersen',         roleKey: 'advisors.roles.board_member', org: 'Flensburg Port Authority',         country: 'DE', bioKey: 'advisors.bios.andersen' }
]
</script>
 
<style scoped>
.advisor-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 0; }
.advisor-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.advisor-body h3 { font-size: 0.98rem; margin-bottom: 0.15rem; }
.advisor-title { font-size: 0.82rem; color: var(--grey-400); }
.advisor-org { font-size: 0.82rem; font-weight: 600; color: var(--text); }
.advisor-bio { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin-top: 0.75rem; }
</style>