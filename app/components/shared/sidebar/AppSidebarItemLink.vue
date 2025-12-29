<template>
  <RouterLink :to="props.to" :class="[
    'hover:bg-primary hover:text-white w-12 h-12 rounded-full flex items-center justify-center hover:shadow-xl transition-all cursor-pointer',
    { 'bg-primary text-white': isSelected() }
  ]">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
function isSelected(): boolean {
  if (props.selected !== null) {
    return props.selected
  }
  if (props.currentPath === null) {
    return false
  }
  if (typeof props.to === 'string') {
    return props.to === props.currentPath
  }
  if (typeof props.to === 'object' && 'path' in props.to) {
    return props.to.path === props.currentPath
  }
  return false
}
const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  currentPath: {
    type: String,
    default: null
  },
  selected: {
    type: Boolean,
    default: null
  }
})
</script>
