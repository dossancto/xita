<script setup lang="ts">
import { ref } from 'vue'
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
  vendorId: '',
  rateCode: '',
  passengerCount: 0,
  tripTime: 0,
  tripDistance: 0,
  paymentType: ''
})

const schema = yup.object({
  vendorId: yup.string().required('Vendor is required'),
  rateCode: yup.string().required('Rate code is required'),
  passengerCount: yup.number().min(1, 'At least 1 passenger').required('Passenger count is required'),
  tripTime: yup.number().min(1, 'Trip time must be greater than 0').required('Trip time is required'),
  tripDistance: yup.number().min(1, 'Trip distance must be greater than 0').required('Trip distance is required'),
  paymentType: yup.string().required('Payment type is required'),
})

function submitForm() {
  // handle form submission
  console.log(form.value)
}
</script>



<template>
  <div class="flex justify-center items-center min-h-screen">
    <UForm :state="form" :schema="schema" @submit.prevent="submitForm" class="w-full max-w-md space-y-4">
      <UFormField label="Vendor ID" name="vendorId" #default="{ error }">
        <div class="grid grid-cols-2 gap-4">
          <UCard v-for="option in vendorOptions" :key="option.value"
            :class="[form.vendorId === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition']"
            @click="form.vendorId = option.value">
            <div class="font-semibold">{{ option.label }}</div>
          </UCard>
        </div>
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
      </UFormField>
      <UFormField label="Rate Code" name="rateCode" #default="{ error }">
        <UInput v-model="form.rateCode" placeholder="Enter rate code" />
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
      </UFormField>
      <UFormField label="Passenger Count" name="passengerCount" #default="{ error }">
        <div class="grid grid-cols-4 gap-2">
          <UCard v-for="count in 4" :key="count"
            :class="[form.passengerCount === count ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition flex flex-col items-center py-2']"
            @click="form.passengerCount = count">
            <UIcon name="i-heroicons-user" class="w-6 h-6 mb-1 text-primary" />
            <div class="font-semibold">{{ count }} {{ count === 1 ? 'person' : 'people' }}</div>
          </UCard>
        </div>
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
      </UFormField>
      <UFormField label="Trip Time" name="tripTime" #default="{ error }">
        <UInput type="number" v-model="form.tripTime" placeholder="Enter trip time" />
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
      </UFormField>
      <UFormField label="Trip Distance" name="tripDistance" #default="{ error }">
        <UInput type="number" v-model="form.tripDistance" placeholder="Enter trip distance" />
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
      </UFormField>
      <UFormField label="Payment Type" name="paymentType" #default="{ error }">
        <div class="grid grid-cols-2 gap-4">
          <UCard v-for="option in paymentOptions" :key="option.value"
            :class="[form.paymentType === option.value ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200', 'cursor-pointer transition']"
            @click="form.paymentType = option.value">
            <div class="font-semibold">{{ option.label }}</div>
            <div class="text-xs text-gray-500">{{ option.description }}</div>
          </UCard>
        </div>
        <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
      </UFormField>
      <div class="w-full flex justify-center">
        <UButton type="submit" class="mt-4">Submit</UButton>
      </div>
    </UForm>
  </div>
</template>
