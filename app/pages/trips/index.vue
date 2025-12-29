<script setup lang="ts">
import PredicTaxiFareAmountForm, { type PredicTaxiFareAmountFormData } from './components/forms/PredicTaxiFareAmountForm.vue'
import FareIndicatorResult from './components/texts/FareIndicatorResult.vue'
import FarePredictHeading from './components/texts/FarePredictHeading.vue'

type Response = {
  fareAmount: number
}

const req = ref<PredicTaxiFareAmountFormData | undefined>(undefined)

async function predictFareCall(): Promise<Response> {
  return await $fetch('http://localhost:5264/predict', {
    method: 'POST',
    body: req.value
  })
}

const { isPending, data, mutate } = useMutation({
  mutationFn: predictFareCall,
})

async function submitForm(data: PredicTaxiFareAmountFormData) {
  req.value = data
  mutate()
}
</script>

<template>
  <FarePredictHeading />

  <div class="w-full flex justify-center mb-4">
    <FareIndicatorResult :fareIndicator="data?.fareAmount" />
  </div>

  <div class="flex justify-center min-h-screen">
    <PredicTaxiFareAmountForm :isPending="isPending" :onSubmit="submitForm" />
  </div>
</template>
