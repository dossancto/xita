<script setup lang="ts">
const props = defineProps<{
  fareIndicator: number | undefined
}>()
</script>

<template>
    <div class="text-4xl font-bold text-primary rounded-lg px-6 py-4">
      ${{ props.fareIndicator?.toFixed(2) }}
    </div>
</template>
