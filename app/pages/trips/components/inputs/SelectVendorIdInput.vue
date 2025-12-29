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
  <button @click="!isPending && (props.onClick(option.value))" v-for="option in vendorOptions" :key="option.value">
    <UCard
      :class="[selectedVendorId === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200 dark:ring-zinc-600', 'cursor-pointer transition', isPending ? 'opacity-50 pointer-events-none' : '']">
      <div class="font-semibold">{{ option.label }}</div>
    </UCard>
  </button>
</template>
