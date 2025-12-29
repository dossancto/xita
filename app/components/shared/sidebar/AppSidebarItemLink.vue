<template>
  <RouterLink :to="props.to"
    className="hover:bg-primary hover:text-white w-12 h-12 rounded-full flex items-center justify-center hover:shadow-xl transition-all cursor-pointer ">
    <slot />
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  }
})
</script>
