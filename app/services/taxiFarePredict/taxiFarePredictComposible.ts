export type PredictTaxiFareAmountRequest = {
  vendorId: string
  rateCode: string
  passengerCount: number
  tripTime: number
  tripDistance: number
  paymentType: string
}

export type PredictTaxiFareAmountResponse = {
  fareAmount: number
}


export function usePredictTaxiFare(req: Ref<PredictTaxiFareAmountRequest | undefined>) {
  const config = useRuntimeConfig();

  async function predictFareCall(): Promise<PredictTaxiFareAmountResponse> {
    const url = config.public.taxiFarePredictApiBaseUrl + '/predict'
    return await $fetch(url, {
      method: 'POST',
      body: req.value
    })
  }

  return useMutation({ mutationFn: predictFareCall, })
}
