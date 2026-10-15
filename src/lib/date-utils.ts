import { format, differenceInCalendarDays, parseISO, isValid } from 'date-fns';

export function formatDateDisplay(dateStr?: string | Date): string {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  if (!isValid(date)) return '';
  return format(date, 'MMM d');
}

export function formatFullDate(dateStr?: string | Date): string {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  if (!isValid(date)) return '';
  return format(date, 'MMMM d, yyyy');
}

export function calculateNights(checkInStr?: string, checkOutStr?: string): number {
  if (!checkInStr || !checkOutStr) return 1;
  try {
    const inDate = parseISO(checkInStr);
    const outDate = parseISO(checkOutStr);
    if (!isValid(inDate) || !isValid(outDate)) return 1;
    const diff = differenceInCalendarDays(outDate, inDate);
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
}

export function getDefaultDemoDates(): { checkIn: string; checkOut: string } {
  return {
    checkIn: '2026-06-23',
    checkOut: '2026-06-29'
  };
}
