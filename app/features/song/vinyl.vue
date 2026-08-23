<script setup lang="ts">
defineProps<{
  cover: string
  name: string
}>()
</script>

<template>
  <div class="vinyl">
    <div class="vinyl-record" />

    <div class="vinyl-cover absolute flex aspect-square rounded-full overflow-hidden">
      <img class="w-full h-full object-cover" :src="cover" width="48px" height="48px" :alt="name" draggable="false">
    </div>
  </div>
</template>

<style scoped>
.vinyl {
  position: relative;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  width: 21rem;
  aspect-ratio: 1;
}

.vinyl::before {
  content: '';
  position: absolute;
  inset: -5%;
  z-index: -1;

  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.05);
}

.vinyl-record {
  width: 100%;
  aspect-ratio: 1;
  border-radius: inherit;

  position: relative;
  z-index: 0;
}

.vinyl-record::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;

  border-radius: inherit;
  background-color: var(--color-base-100);
  background-image: repeating-radial-gradient(
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0.5) 2px,
    rgba(255, 255, 255, 0.01) 4px
  );
}

.vinyl-record::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 5;

  border-radius: inherit;
  background: conic-gradient(
    from 100deg at 50% 50%,
    transparent 0deg,
    rgba(255, 255, 255, 0.2) 45deg,
    transparent 90deg,
    rgba(0, 0, 0, 0.3) 135deg,
    transparent 180deg,
    transparent 180deg,
    rgba(255, 255, 255, 0.2) 225deg,
    transparent 270deg,
    rgba(0, 0, 0, 0.3) 315deg,
    transparent 360deg
  );
  box-shadow: inset 0 0 0 3px var(--color-base-100);
}

.vinyl-cover {
  width: 66%;
  z-index: 10;

  box-shadow: 0 0 0 6px var(--color-base-100);
  animation: vinyl-rotate 30s 2s linear infinite;
}

@keyframes vinyl-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
