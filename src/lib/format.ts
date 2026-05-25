/** Format an amount in sums as e.g. "5 млн сум". */
export const fmtAmt = (n: number) => (n / 1_000_000).toFixed(0) + ' млн сум'

/**
 * Calculate annuity monthly payment.
 * @param amount  loan amount in sums
 * @param annualRatePercent  e.g. 22 for 22%
 * @param months  loan term in months
 */
export const annuityPayment = (amount: number, annualRatePercent: number, months: number): number => {
  const monthlyRate = annualRatePercent / 100 / 12
  return Math.round(
    (amount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1),
  )
}
