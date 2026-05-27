<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Gallery</span>
        <h1>Photo Gallery</h1>
        <p>Moments from our events, meetings, and community activities across the DE-DK region.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="gallery-grid">
          <div
            v-for="(item, i) in gallery"
            :key="i"
            class="gallery-item"
            :class="{ large: item.large }"
            @click="lightbox = item"
          >
            <div class="gallery-fill" :style="{ background: item.bg }">
              <span class="gallery-label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Transition name="fade">
      <div v-if="lightbox" class="overlay" @click="lightbox = null">
        <div class="lightbox" :style="{ background: lightbox.bg }">
          <span class="gallery-label">{{ lightbox.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const lightbox = ref(null)
const gallery = [
  { label: 'Community Meeting – Niebüll, 2025', bg: 'linear-gradient(135deg,#0D1628 60%,#1E3A5F)', large: true },
  { label: 'Interview Recording Session', bg: 'linear-gradient(135deg,#132038,#3D5A80)' },
  { label: 'Data Workshop – Kolding', bg: 'linear-gradient(135deg,#0D1628,#152040)' },
  { label: 'Annual Conference – Flensburg', bg: 'linear-gradient(135deg,#111E35,#3D5A80)', large: true },
  { label: 'Brauhaus Eutin Roundtable', bg: 'linear-gradient(135deg,#0D1628,#1E3A5F)' },
  { label: 'Talent Forum – Sønderborg', bg: 'linear-gradient(135deg,#132038,#152040)' },
  { label: 'Border Industry Site Visit', bg: 'linear-gradient(135deg,#0D1628,#111E35)' },
  { label: 'Strategy Workshop', bg: 'linear-gradient(135deg,#111E35,#1E3A5F)' },
  { label: 'Member Welcome Reception', bg: 'linear-gradient(135deg,#152040,#3D5A80)', large: true },
]
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 0.75rem;
}
.gallery-item { border-radius: var(--radius-md); overflow: hidden; cursor: pointer; }
.gallery-item.large { grid-column: span 2; }
.gallery-fill {
  width: 100%; height: 100%;
  display: flex; align-items: flex-end;
  padding: 1rem;
  transition: opacity var(--transition);
}
.gallery-item:hover .gallery-fill { opacity: 0.85; }
.gallery-label {
  color: rgba(255,255,255,0.8);
  font-size: 0.8rem;
  font-weight: 500;
}

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
  cursor: pointer;
}
.lightbox {
  width: 100%; max-width: 860px; height: 500px;
  border-radius: var(--radius-lg);
  display: flex; align-items: flex-end; padding: 1.5rem;
}
.lightbox .gallery-label { font-size: 1rem; }

@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: 1fr 1fr; }
  .gallery-item.large { grid-column: span 2; }
}
@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr; }
  .gallery-item.large { grid-column: span 1; }
}
</style>
