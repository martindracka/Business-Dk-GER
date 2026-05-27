<template>
  <div>
    <div class="page-hero">
      <div class="container page-hero-inner">
        <div>
          <span class="page-hero-label">{{ $t('interviews.label') }}</span>
          <h1>{{ $t('interviews.title') }}</h1>
          <p>{{ $t('interviews.intro') }}</p>
        </div>
        <div class="hero-stat-card single">
          <span class="stat-num">{{ videos.length }}</span>
          <span class="stat-label">{{ $t('interviews.videos') }}</span>
        </div>
      </div>
    </div>
 
    <!-- Featured Interview Banner -->
    <div class="container featured-wrap">
      <div class="featured-banner" @click="openVideo(featuredVideo)">
        <div class="featured-thumb">
          <img :src="featuredVideo.thumbnail" :alt="localized(featuredVideo.title)" loading="lazy" />
          <div class="featured-thumb-overlay">
            <div class="featured-play">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <span class="featured-label">{{ $t('interviews.featured') }}</span>
        </div>
        <div class="featured-info">
          <span class="featured-tag">{{ catLabel(featuredVideo.topic) }}</span>
          <h2>{{ localized(featuredVideo.title) }}</h2>
          <p>{{ featuredVideo.author }} · {{ featuredVideo.company }}</p>
          <span class="featured-cta">{{ $t('interviews.featured_cta') }} {{ featuredVideo.duration }}</span>
        </div>
      </div>
    </div>
 
    <!-- Filters -->
    <div class="container">
      <div class="filter-bar" style="justify-content: space-between;">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
          <button v-for="topic in topics" :key="topic" :class="['pill', activeTopic === topic ? 'active' : '']" @click="activeTopic = topic">{{ catLabel(topic) }}</button>
        </div>
        <select class="sort-select" v-model="sort">
          <option value="latest">{{ $t('interviews.sort_latest') }}</option>
          <option value="oldest">{{ $t('interviews.sort_oldest') }}</option>
        </select>
      </div>
    </div>
 
    <!-- Video grid (2-column) -->
    <div class="container" style="padding-top:2rem;padding-bottom:3.5rem;">
      <div class="video-grid">
        <div v-for="v in filtered" :key="v.id" class="video-card card" @click="openVideo(v)">
          <div class="video-thumb">
            <img :src="v.thumbnail" :alt="localized(v.title)" loading="lazy" />
            <div class="thumb-overlay">
              <div class="play-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <span class="video-duration" v-if="v.duration">{{ v.duration }}</span>
          </div>
          <div class="video-meta">
            <span class="video-topic">{{ catLabel(v.topic) }}</span>
            <h3>{{ localized(v.title) }}</h3>
            <div class="video-footer">
              <span class="video-author">{{ v.author }}</span>
              <span class="watch-link">{{ $t('interviews.watch') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Modal -->
    <Transition name="fade">
      <div v-if="activeVideo" class="modal-overlay" @click.self="activeVideo = null">
        <div class="modal-box">
          <button class="modal-close" @click="activeVideo = null">✕</button>
          <div class="modal-embed">
            <iframe :src="`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`"
              frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="modal-info">
            <h3>{{ localized(activeVideo.title) }}</h3>
            <p>{{ activeVideo.author }} · {{ activeVideo.company }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
 
<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { videos, videoTopics } from '../data/videos.js'
 
const { t, locale } = useI18n()
const activeTopic = ref('All')
const sort = ref('latest')
const activeVideo = ref(null)
const featuredVideo = videos[0]
 
const topics = videoTopics
 
// Maps a raw data value (e.g. "Cross-border") to its translated label.
// The pill click-value stays the raw English so filtering keeps matching the data.
function catLabel(v) {
  return t('categories.' + v.toLowerCase().replace(/[\s-]+/g, '_'))
}

function localized(value) {
  if (typeof value === 'string') return value
  return value?.[locale.value] || value?.en || ''
}
 
const filtered = computed(() => {
  let list = activeTopic.value === 'All' ? [...videos] : videos.filter(v => v.topic === activeTopic.value)
  if (sort.value === 'oldest') list = list.reverse()
  return list
})
 
function openVideo(v) { activeVideo.value = v }
</script>
 
<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
}
 
.video-card { cursor: pointer; overflow: hidden; }
.video-thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: var(--navy);
  overflow: hidden;
}
.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.video-card:hover .video-thumb img { transform: scale(1.04); }
.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}
.video-card:hover .thumb-overlay { background: rgba(0,0,0,0.4); }
.play-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: background 0.3s ease, transform 0.3s ease;
}
.video-card:hover .play-circle { background: rgba(255,255,255,0.35); transform: scale(1.1); }
 
.video-duration {
  position: absolute;
  bottom: 0.6rem;
  left: 0.75rem;
  background: rgba(0,0,0,0.6);
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}
 
.video-meta { padding: 1rem 1.25rem 1.25rem; }
.video-topic {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--grey-400);
  margin-bottom: 0.4rem;
}
.video-meta h3 { font-size: 0.95rem; color: var(--text); margin-bottom: 0.6rem; line-height: 1.45; }
.video-footer { display: flex; justify-content: space-between; align-items: center; }
.video-author { font-size: 0.82rem; color: var(--grey-400); }
.watch-link { font-size: 0.82rem; font-weight: 600; color: var(--text); white-space: nowrap; }
.video-card:hover .watch-link { color: var(--navy); }
 
/* Sort dropdown */
.sort-select {
  padding: 0.4rem 0.8rem;
  border: 1.5px solid var(--grey-200);
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  color: var(--text);
  background: var(--white);
  outline: none;
  cursor: pointer;
}
 
/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-box {
  background: var(--navy);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 900px;
  overflow: hidden;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255,255,255,0.1);
  color: var(--white);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 1;
}
.modal-embed { position: relative; padding-bottom: 56.25%; }
.modal-embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; }
.modal-info { padding: 1rem 1.5rem 1.25rem; }
.modal-info h3 { color: var(--white); font-size: 0.95rem; margin-bottom: 0.25rem; }
.modal-info p { color: rgba(255,255,255,0.45); font-size: 0.82rem; }
 
/* Featured banner */
.featured-wrap { padding-top: 2rem; }
.featured-banner {
  display: flex;
  gap: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--grey-200);
  cursor: pointer;
  transition: box-shadow var(--transition);
}
.featured-banner:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
.featured-thumb {
  position: relative;
  width: 340px;
  flex-shrink: 0;
  background: var(--navy);
  overflow: hidden;
  min-height: 200px;
}
.featured-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.featured-banner:hover .featured-thumb img { transform: scale(1.04); }
.featured-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}
.featured-banner:hover .featured-thumb-overlay { background: rgba(0,0,0,0.48); }
.featured-play {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.5);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.3s ease;
}
.featured-banner:hover .featured-play { background: rgba(255,255,255,0.35); transform: scale(1.08); }
.featured-label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(255,255,255,0.15);
  color: var(--white);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-pill);
}
.featured-info {
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
  background: var(--white);
  flex: 1;
}
.featured-tag {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--grey-400);
}
.featured-info h2 { font-size: 1.3rem; color: var(--text); line-height: 1.3; }
.featured-info p { font-size: 0.88rem; color: var(--text-muted); }
.featured-cta {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--navy);
}
 
@media (max-width: 768px) {
  .featured-banner { flex-direction: column; }
  .featured-thumb { width: 100%; min-height: 180px; }
  .featured-info { padding: 1.5rem; }
}
@media (max-width: 680px) { .video-grid { grid-template-columns: 1fr; } }
</style>