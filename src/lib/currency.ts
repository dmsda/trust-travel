export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export const CURRENCY_RATES: Record<SupportedCurrency, { symbol: string; rateFromUSD: number; label: string }> = {
  USD: { symbol: '$', rateFromUSD: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rateFromUSD: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rateFromUSD: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', rateFromUSD: 154.5, label: 'JPY (¥)' }
};

export function formatCurrency(amountInUSD: number, currency: SupportedCurrency = 'USD'): string {
  const meta = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountInUSD * meta.rateFromUSD;
  
  if (currency === 'JPY') {
    return `${meta.symbol}${Math.round(converted).toLocaleString()}`;
  }
  
  return `${meta.symbol}${Math.round(converted).toLocaleString()}`;
}
