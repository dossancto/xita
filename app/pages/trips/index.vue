<script setup lang="ts">
import { ref, watch } from 'vue'
import * as yup from 'yup'
import { UIcon } from '#components'

const vendorOptions = [
  { label: 'CMT', value: 'CMT' },
  { label: 'VTS', value: 'VTS' }
]

const paymentOptions = [
  { value: 'DIS', label: 'Discount', description: 'Discounted payment' },
  { value: 'NOC', label: 'No Charge', description: 'No charge for this trip' },
  { value: 'CRD', label: 'Credit Card', description: 'Pay with credit card' },
  { value: 'CSH', label: 'Cash', description: 'Pay with cash' }
]

const form = ref({
  vendorId: 'CMT',
  rateCode: '123',
  passengerCount: 1,
  tripTime: 10,
  tripDistance: 100,
  paymentType: 'CRD'
})

type Response = {
  fareAmount: number
}

const schema = yup.object({
  vendorId: yup.string().required('Vendor is required'),
  rateCode: yup.string().required('Rate code is required'),
  passengerCount: yup.number().min(1, 'At least 1 passenger').required('Passenger count is required'),
  tripTime: yup.number().min(1, 'Trip time must be greater than 0').required('Trip time is required'),
  tripDistance: yup.number().min(1, 'Trip distance must be greater than 0').required('Trip distance is required'),
  paymentType: yup.string().required('Payment type is required'),
})

async function predictFareCall(): Promise<Response> {
  // Placeholder for fare prediction logic
  return await $fetch('http://localhost:5264/predict', {
    method: 'POST',
    body: form.value
  })
}

const { isPending, data, mutate } = useMutation({
  mutationFn: predictFareCall,
})

async function submitForm() {
  mutate()
}

// Debounce logic
let debounceTimeout: ReturnType<typeof setTimeout> | null = null
watch(form, async () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(async () => {
    try {
      await schema.validate(form.value, { abortEarly: false })
      submitForm()
    } catch (e) {
      // Validation failed, do not submit
    }
  }, 0)
}, { deep: true })
</script>

<template>
  <div class="text-6xl text-center font-bold text-primary rounded-lg px-6 py-8">
    Taxi Fare Predictor
  </div>

  <div class="flex justify-center min-h-screen">
<UForm :state="form" :schema="schema" class="w-full max-w-md space-y-4">
      <!-- Fare result -->
      <div class="w-full flex justify-center mb-4">
        <div class="text-4xl font-bold text-primary rounded-lg px-6 py-4">
          ${{ data?.fareAmount.toFixed(2) }}
        </div>
      </div>

      <UFormField label="Vendor Id" name="vendorId">
        <div class="grid grid-cols-2 gap-4">
          <UCard v-for="option in vendorOptions" :key="option.value"
            :class="[form.vendorId === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition', isPending ? 'opacity-50 pointer-events-none' : '']"
            @click="!isPending && (form.vendorId = option.value)">
            <div class="font-semibold">{{ option.label }}</div>
          </UCard>
        </div>
      </UFormField>

      <UFormField label="Passenger Count" name="passengerCount">
        <div class="grid grid-cols-4 gap-2">
          <UCard v-for="count in 4" :key="count"
            :class="[form.passengerCount === count ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition flex flex-col items-center py-2', isPending ? 'opacity-50 pointer-events-none' : '']"
            @click="!isPending && (form.passengerCount = count)">
            <UIcon name="i-heroicons-user" class="w-6 h-6 mb-1 text-primary" />
            <div class="font-semibold">{{ count }} {{ count === 1 ? 'person' : 'people' }}</div>
          </UCard>
        </div>
      </UFormField>

      <UFormField label="Trip Distance" name="tripDistance">
        <UInput class="w-full text-xl py-4 px-4 text-center" type="number" v-model="form.tripDistance"
          placeholder="Enter trip distance" />
      </UFormField>

      <UFormField label="Payment Type" name="paymentType">
        <div class="grid grid-cols-2 gap-4">
          <UCard v-for="option in paymentOptions" :key="option.value"
            :class="[form.paymentType === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition', isPending ? 'opacity-50 pointer-events-none' : '']"
            @click="!isPending && (form.paymentType = option.value)">
            <div class="font-semibold">{{ option.label }}</div>
            <div class="text-xs text-gray-500">{{ option.description }}</div>
          </UCard>
        </div>
      </UFormField>



    </UForm>
  </div>
</template>
