<script setup lang="ts">
const vendorOptions = [
  { label: 'CMT', value: 'CMT' },
  { label: 'VTS', value: 'VTS' }
]

const props = defineProps<{
  selectedVendorId: string
  isPending: boolean
  onClick: (vendorId: string) => void
}>()
</script>

<template>
  <UCard v-for="option in vendorOptions" :key="option.value"
    :class="[selectedVendorId === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition', isPending ? 'opacity-50 pointer-events-none' : '']"
    @click="!isPending && (props.onClick(option.value))">
    <div class="font-semibold">{{ option.label }}</div>
  </UCard>
</template>
