<script setup lang="ts">
import { usePredictTaxiFare, type PredictTaxiFareAmountRequest } from '~/services/taxiFarePredict/taxiFarePredictComposible'
import PredicTaxiFareAmountForm, { type PredicTaxiFareAmountFormData } from './components/forms/PredicTaxiFareAmountForm.vue'
import FareIndicatorResult from './components/texts/FareIndicatorResult.vue'
import FarePredictHeading from './components/texts/FarePredictHeading.vue'

const req = ref<PredictTaxiFareAmountRequest | undefined>()

const { isPending, data, mutate } = usePredictTaxiFare(req)

async function submitForm(data: PredicTaxiFareAmountFormData) {
  req.value = {
    ...data,
    tripTime: 10,
    rateCode: '1',
  }
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
