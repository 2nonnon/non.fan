<script setup lang="ts">

</script>

<template>
  <div class="h-dvh relative select-none overflow-x-hidden">
    <div class="max-w-5xl w-full min-h-full mx-auto flex flex-col relative">
      <header class="px-6 py-4 sticky top-0 flex items-center justify-between gap-4 z-50">
        <NuxtLink to="/">
          <NLogo />
        </NuxtLink>

        <NNav />
      </header>

      <slot />
    </div>
  </div>
</template>
