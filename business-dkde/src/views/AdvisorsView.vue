<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Advisors</span>
        <h1>Advisory Board</h1>
        <p>Experienced professionals guiding Business DE-DK's strategic direction.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid-3">
          <div class="card advisor-card" v-for="a in advisors" :key="a.name">
            <div class="advisor-avatar">{{ a.initials }}</div>
            <div class="advisor-body">
              <h3>{{ a.name }}</h3>
              <p class="advisor-title">{{ a.title }}</p>
              <p class="advisor-org">{{ a.org }}</p>
              <span :class="['badge-country', a.country === 'DE' ? 'badge-de' : 'badge-dk']" style="margin-top:0.6rem;display:inline-block;">{{ a.country }}</span>
              <p class="advisor-bio">{{ a.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const advisors = [
  { initials: 'IP', name: 'Dr. Ingrid Petersen', title: 'Chairperson', org: 'Sønderborg Municipality', country: 'DK', bio: 'Former Director of Business Development with 20 years of experience in cross-border regional policy.' },
  { initials: 'HB', name: 'Hans-Joachim Brandt', title: 'Vice Chair', org: 'IHK Schleswig-Holstein', country: 'DE', bio: 'CEO of the Schleswig-Holstein Chamber of Commerce with expertise in international trade.' },
  { initials: 'MC', name: 'Mette Christoffersen', title: 'Board Member', org: 'University of Southern Denmark', country: 'DK', bio: 'Professor of Regional Economics, specialising in cross-border labour markets.' },
  { initials: 'SM', name: 'Stefan Müller', title: 'Board Member', org: 'Invest in Schleswig-Holstein', country: 'DE', bio: 'Investment promotion specialist who has supported over 50 international companies.' },
  { initials: 'KT', name: 'Karen Lund Thomsen', title: 'Board Member', org: 'Business Aabenraa', country: 'DK', bio: 'Economic development expert with a focus on SME internationalisation.' },
  { initials: 'RA', name: 'Rolf Andersen', title: 'Board Member', org: 'Flensburg Port Authority', country: 'DE', bio: 'Port director and logistics expert facilitating trade flows between Denmark and Germany.' }
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
