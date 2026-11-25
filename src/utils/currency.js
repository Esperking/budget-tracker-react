const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatCurrency(value) {
  const safeNumber = Number(value)
  if (Number.isNaN(safeNumber)) return '$0.00'
  return currencyFormatter.format(safeNumber)
}

export default formatCurrency