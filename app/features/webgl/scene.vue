<script setup lang="ts">
import { WebGLRenderer } from './render'

const canvasRef = useTemplateRef('canvasRef')

onMounted(() => {
  if (!canvasRef.value)
    return

  const renderer = new WebGLRenderer(canvasRef.value)
  renderer.start()
})
</script>

<template>
  <canvas ref="canvasRef" />
</template>
