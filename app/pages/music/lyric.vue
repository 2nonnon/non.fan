<script setup lang="ts">
definePageMeta({
  layout: 'board',
})
</script>

<template>
  <NuxtPage :page-key="route => route.path" />
</template>
