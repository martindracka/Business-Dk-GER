<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">{{ t('gallery.label') }}</span>
        <h1>{{ t('gallery.title') }}</h1>
        <p>{{ t('gallery.intro') }}</p>
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
              <span class="gallery-label">{{ t(item.labelKey) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
 
    <Transition name="fade">
      <div v-if="lightbox" class="overlay" @click="lightbox = null">
        <div class="lightbox" :style="{ background: lightbox.bg }">
          <span class="gallery-label">{{ t(lightbox.labelKey) }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n()
const lightbox = ref(null)
const gallery = [
  { labelKey: 'gallery.captions.c1', bg: 'linear-gradient(135deg,#0D1628 60%,#1E3A5F)', large: true },
  { labelKey: 'gallery.captions.c2', bg: 'linear-gradient(135deg,#132038,#3D5A80)' },
  { labelKey: 'gallery.captions.c3', bg: 'linear-gradient(135deg,#0D1628,#152040)' },
  { labelKey: 'gallery.captions.c4', bg: 'linear-gradient(135deg,#111E35,#3D5A80)', large: true },
  { labelKey: 'gallery.captions.c5', bg: 'linear-gradient(135deg,#0D1628,#1E3A5F)' },
  { labelKey: 'gallery.captions.c6', bg: 'linear-gradient(135deg,#132038,#152040)' },
  { labelKey: 'gallery.captions.c7', bg: 'linear-gradient(135deg,#0D1628,#111E35)' },
  { labelKey: 'gallery.captions.c8', bg: 'linear-gradient(135deg,#111E35,#1E3A5F)' },
  { labelKey: 'gallery.captions.c9', bg: 'linear-gradient(135deg,#152040,#3D5A80)', large: true },
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