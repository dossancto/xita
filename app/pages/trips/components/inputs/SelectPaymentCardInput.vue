<script setup lang="ts">
const paymentOptions = [
  { value: 'DIS', label: 'Discount', description: 'Discounted payment' },
  { value: 'NOC', label: 'No Charge', description: 'No charge for this trip' },
  { value: 'CRD', label: 'Credit Card', description: 'Pay with credit card' },
  { value: 'CSH', label: 'Cash', description: 'Pay with cash' }
]
const props = defineProps<{
  selectedPaymentType: string
  isPending: boolean
  onClick: (paymentType: string) => void
}>()
</script>

<template>
  <UCard v-for="option in paymentOptions" :key="option.value"
    :class="[selectedPaymentType === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition', isPending ? 'opacity-50 pointer-events-none' : '']"
    @click="!isPending && props.onClick(option.value)">
    <div class="font-semibold">{{ option.label }}</div>
    <div class="text-xs text-gray-500">{{ option.description }}</div>
  </UCard>
</template>
