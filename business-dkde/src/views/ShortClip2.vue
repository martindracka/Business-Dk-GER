<template>
  <div class="short-clip">
    <h1>Quick Clips from the Field - Clip 2</h1>
    <video controls width="100%" height="auto">
      <source src="/videos/short2.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
</script>

<style scoped>
.short-clip {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 1rem;
}

video {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
