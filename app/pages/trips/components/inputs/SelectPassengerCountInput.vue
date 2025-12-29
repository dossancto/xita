<script setup lang="ts">
const props = defineProps<{
  selectedPassengerCount: number
  isPending: boolean,
  onClick: (passengerCount: number) => void
}>()

const MAX_PASSENGERS_COUNT = 4
</script>

<template>
  <UCard v-for="count in MAX_PASSENGERS_COUNT" :key="count"
    :class="[selectedPassengerCount === count ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition flex flex-col items-center py-2', isPending ? 'opacity-50 pointer-events-none' : '']"
    @click="!isPending && (props.onClick(count))">
    <UIcon name="i-heroicons-user" class="w-6 h-6 mb-1 text-primary" />
    <div class="font-semibold">{{ count }} {{ count === 1 ? 'person' : 'people' }}</div>
  </UCard>
</template>
