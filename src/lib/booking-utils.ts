export interface PricingBreakdown {
  pricePerNight: number;
  nights: number;
  baseTotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  total: number;
}

export function calculatePricingBreakdown(pricePerNight: number, nights: number): PricingBreakdown {
  const safeNights = Math.max(1, nights);
  const baseTotal = pricePerNight * safeNights;
  const cleaningFee = Math.round(pricePerNight * 0.25);
  const serviceFee = Math.round(baseTotal * 0.1);
  const taxes = Math.round(baseTotal * 0.08);
  const total = baseTotal + cleaningFee + serviceFee + taxes;

  return {
    pricePerNight,
    nights: safeNights,
    baseTotal,
    cleaningFee,
    serviceFee,
    taxes,
    total
  };
}

export function generateBookingReference(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const prefix = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
  return `TT-2026-${prefix}${random}`;
}
