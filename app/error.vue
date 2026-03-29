<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout>
    <main class="flex-1 px-6 pb-24 flex flex-col justify-center items-center gap-4">
      <h1>
        好像出错了?
      </h1>

      <p>
        <NuxtLink class="underline underline-offset-4" to="/">
          回到首页
        </NuxtLink>
      </p>
    </main>
  </NuxtLayout>
</template>
