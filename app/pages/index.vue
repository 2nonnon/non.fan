<script setup lang="ts">

</script>

<template>
  <div class="h-dvh flex flex-col items-center justify-center text-primary-content text-9xl relative">
    <div class="flex items-center gap-4 text-base">
      <NuxtLink
        to="/renarrate"
        class="underline underline-offset-4"
        prefetch-on="interaction"
      >
        Nounenrena's Blog Archive
      </NuxtLink>

      <NuxtLink
        to="/sign"
        class="underline underline-offset-4"
        prefetch-on="interaction"
      >
        Non sign
      </NuxtLink>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" fill="none" viewBox="0 0 960 540">
      <path stroke="currentColor" d="M884 408c4-19 13-76 12-127-1-74-7-153-26-191-18-35-38-44-74-44s-54 12-68 39c-20 38-23 124-25 124s-26-79-50-115c-19-28-43-47-83-47-26 0-41 7-59 23-20 17-30 62-32 62s-10-44-29-61a79 79 0 0 0-62-22c-42 2-59 21-70 51-15 41-18 112-20 112s-29-85-54-121a94 94 0 0 0-86-40c-42 3-65 31-76 69-16 55-18 107-18 171 0 65 4 127 23 160s47 43 82 43c34 0 54-15 65-44 16-43 19-127 21-127 2 1 32 101 65 138 19 21 46 33 78 30 26-2 41-10 58-30 15-17 18-61 21-61s14 60 45 78c20 12 43 14 56 13 25-1 52-13 63-44 13-36 17-125 19-125s37 91 52 115 40 52 87 52c64 0 81-62 85-81Z" />
      <path stroke="currentColor" d="M480 186c-49 0-84 40-84 82 0 49 37 86 84 86s84-36 84-86c0-42-35-82-84-82Z" />
    </svg>
  </div>
</template>

<style scoped>

</style>
