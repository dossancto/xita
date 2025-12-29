<script setup lang="ts">
import { ref, watch } from 'vue'
import * as yup from 'yup'
import SelectPassengerCountInput from '../inputs/SelectPassengerCountInput.vue'
import SelectPaymentCardInput from '../inputs/SelectPaymentCardInput.vue'
import SelectVendorIdInput from '../inputs/SelectVendorIdInput.vue'

export type PredicTaxiFareAmountFormData = {
  vendorId: string
  passengerCount: number
  tripDistance: number
  paymentType: string
}

const form = ref({
  vendorId: 'CMT',
  passengerCount: 1,
  tripDistance: 100,
  paymentType: 'CRD'
})

const schema = yup.object({
  vendorId: yup.string().required('Vendor is required'),
  passengerCount: yup.number().min(1, 'At least 1 passenger').required('Passenger count is required'),
  tripDistance: yup.number().min(1, 'Trip distance must be greater than 0').required('Trip distance is required'),
  paymentType: yup.string().required('Payment type is required'),
})

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

watch(form, async () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(async () => {
    try {
      await schema.validate(form.value, { abortEarly: false })
      props.onSubmit(form.value)
    } catch (e) {
    }
  }, 500)
}, { deep: true })

const props = defineProps<{
  isPending: boolean,
  onSubmit: (data: PredicTaxiFareAmountFormData) => void
}>()

</script>

<template>
  <UForm :state="form" :schema="schema" class="w-full max-w-md space-y-4">
    <UFormField label="Vendor Id" name="vendorId">
      <div class="grid grid-cols-2 gap-4">
        <SelectVendorIdInput :selectedVendorId="form.vendorId" :isPending="isPending"
          :onClick="(vendorId: string) => { form.vendorId = vendorId }" />
      </div>
    </UFormField>

    <UFormField label="Passenger Count" name="passengerCount">
      <div class="grid grid-cols-4 gap-2">
        <SelectPassengerCountInput :selectedPassengerCount="form.passengerCount" :isPending="isPending"
          :onClick="(count: number) => { form.passengerCount = count }" />
      </div>
    </UFormField>

    <UFormField label="Trip Distance" name="tripDistance">
      <UInput class="w-full text-xl py-4 px-4 text-center" type="number" v-model="form.tripDistance"
        placeholder="Enter trip distance" />
    </UFormField>

    <UFormField label="Payment Type" name="paymentType">
      <div class="grid grid-cols-2 gap-4">
        <SelectPaymentCardInput :selectedPaymentType="form.paymentType" :isPending="isPending"
          :onClick="(paymentType: string) => { form.paymentType = paymentType }" />
      </div>
    </UFormField>
  </UForm>
</template>
