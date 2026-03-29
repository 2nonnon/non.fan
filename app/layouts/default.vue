<script setup lang="ts">

</script>

<template>
  <div class="h-dvh relative select-none overflow-x-hidden">
    <div class="max-w-5xl w-full min-h-full mx-auto flex flex-col relative">
      <header class="px-6 py-4 sticky top-0 flex items-center justify-between gap-4 z-50">
        <NuxtLink id="logo" to="/">
          <NLogo />
        </NuxtLink>

        <NNav />
      </header>

      <slot />
    </div>
  </div>
</template>

<style scoped>
#logo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--color-accent);
    filter: blur(12px);
    opacity: 0;

    animation-name: light;
    animation-fill-mode: both;
    animation-timeline: scroll();
    animation-range: 0px 100px;
  }
}

@keyframes light {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
