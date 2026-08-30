<script setup lang="ts">
defineProps<{
  cover: string
  name: string
  playing?: boolean
}>()
</script>

<template>
  <div
    class="turntable" :class="{
      'turntable--playing': playing,
    }"
  >
    <FCartridge class="cartridge" />
    <FVinyl class="vinyl" :cover="cover" :name="name" :playing="playing" />
  </div>
</template>

<style scoped>
.turntable {
  position: relative;
  z-index: 0;

  width: 21rem;
  aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  .cartridge {
    flex: 0;
    position: absolute;
    top: -94%;
    z-index: 1;

    width: 128%;
    height: 128%;

    transform-origin: center;
    transform: rotate(-30deg);
  }

  .vinyl {
    position: relative;
    z-index: 0;

    width: 100%;
  }
}

.turntable--playing .cartridge {
  animation: cartridge-rotate 0.5s 1.5s ease-in-out forwards;
}

@keyframes cartridge-rotate {
  from {
    transform: rotate(-30deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
