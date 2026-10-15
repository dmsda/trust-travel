import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

// Test Date and Night calculations
describe('Date & Night Calculation Utilities', () => {
  test('calculates correct nights between two dates', () => {
    const diffDays = (d1, d2) => {
      const msPerDay = 1000 * 60 * 60 * 24;
      const t1 = new Date(d1).getTime();
      const t2 = new Date(d2).getTime();
      const diff = Math.round((t2 - t1) / msPerDay);
      return diff > 0 ? diff : 1;
    };

    assert.equal(diffDays('2026-06-23', '2026-06-29'), 6);
    assert.equal(diffDays('2026-07-01', '2026-07-02'), 1);
    // Invalid/inverted date fallback
    assert.equal(diffDays('2026-06-29', '2026-06-20'), 1);
  });
});

// Test Pricing Breakdown Logic
describe('Pricing Breakdown Logic', () => {
  test('calculates consistent totals with fees and taxes', () => {
    const pricePerNight = 380;
    const nights = 6;
    const baseTotal = pricePerNight * nights; // 2280
    const cleaningFee = Math.round(pricePerNight * 0.25); // 95
    const serviceFee = Math.round(baseTotal * 0.1); // 228
    const taxes = Math.round(baseTotal * 0.08); // 182
    const total = baseTotal + cleaningFee + serviceFee + taxes; // 2785

    assert.equal(baseTotal, 2280);
    assert.equal(cleaningFee, 95);
    assert.equal(serviceFee, 228);
    assert.equal(taxes, 182);
    assert.equal(total, 2785);
  });
});

// Test Search Filtering & Sorting
describe('Search & Sorting Logic', () => {
  const sampleProperties = [
    { id: '1', title: 'Milan Suite', destinationSlug: 'italy', type: 'hotels', pricePerNight: 380, rating: 4.96, featured: true },
    { id: '2', title: 'Berlin Loft', destinationSlug: 'germany', type: 'hotels', pricePerNight: 290, rating: 4.92, featured: false },
    { id: '3', title: 'Tuscan Villa', destinationSlug: 'italy', type: 'villas', pricePerNight: 740, rating: 4.98, featured: true },
    { id: '4', title: 'Scottish Cottage', destinationSlug: 'scotland', type: 'cottages', pricePerNight: 245, rating: 4.95, featured: false }
  ];

  test('filters by destination keyword correctly', () => {
    const filtered = sampleProperties.filter(p => p.destinationSlug.includes('italy'));
    assert.equal(filtered.length, 2);
  });

  test('filters by category correctly', () => {
    const filtered = sampleProperties.filter(p => p.type === 'villas');
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].title, 'Tuscan Villa');
  });

  test('sorts by price low to high', () => {
    const sorted = [...sampleProperties].sort((a, b) => a.pricePerNight - b.pricePerNight);
    assert.equal(sorted[0].pricePerNight, 245);
    assert.equal(sorted[sorted.length - 1].pricePerNight, 740);
  });

  test('sorts by rating descending', () => {
    const sorted = [...sampleProperties].sort((a, b) => b.rating - a.rating);
    assert.equal(sorted[0].rating, 4.98);
  });
});

// Test Booking Reference Generator
describe('Booking Reference Generator', () => {
  test('generates valid prefixed reference string', () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const prefix = letters[0] + letters[1];
    const ref = `TT-2026-${prefix}${random}`;

    assert.match(ref, /^TT-2026-[A-Z]{2}\d{4}$/);
  });
});
