import { describe, it, expect } from 'vitest';
import { validatePhone } from '../validation';

describe('validatePhone', () => {
  // Валидные номера
  it('should accept valid phone numbers starting with +7', () => {
    expect(validatePhone('+79123456789')).toBeNull();
    expect(validatePhone('+7 912 345-67-89')).toBeNull();
    expect(validatePhone('+7(912)345-67-89')).toBeNull();
    expect(validatePhone('+79001234567')).toBeNull();
  });

  it('should accept valid phone numbers starting with 8', () => {
    expect(validatePhone('89123456789')).toBeNull();
    expect(validatePhone('8 912 345-67-89')).toBeNull();
    expect(validatePhone('8(912)345-67-89')).toBeNull();
    expect(validatePhone('89001234567')).toBeNull();
  });

  // Невалидные номера
  it('should reject phone numbers without +7 or 8 prefix', () => {
    const errorMessage = 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
    expect(validatePhone('79123456789')).toBe(errorMessage);
    expect(validatePhone('91234567890')).toBe(errorMessage);
    expect(validatePhone('12345678901')).toBe(errorMessage);
  });

  it('should reject phone numbers with incorrect length', () => {
    const errorMessage = 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
    expect(validatePhone('+7912345678')).toBe(errorMessage);
    expect(validatePhone('+791234567890')).toBe(errorMessage);
    expect(validatePhone('8912345678')).toBe(errorMessage);
    expect(validatePhone('891234567890')).toBe(errorMessage);
    expect(validatePhone('+7')).toBe(errorMessage);
    expect(validatePhone('8')).toBe(errorMessage);
  });

  it('should reject phone numbers starting with incorrect prefix', () => {
    const errorMessage = 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
    expect(validatePhone('+99123456789')).toBe(errorMessage);
    expect(validatePhone('99123456789')).toBe(errorMessage);
    expect(validatePhone('+7123456789')).toBe(errorMessage);
  });

  it('should handle empty strings and spaces', () => {
    const errorMessage = 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
    expect(validatePhone('')).toBe(errorMessage);
    expect(validatePhone('   ')).toBe(errorMessage);
    expect(validatePhone('+7  ')).toBe(errorMessage);
  });

  it('should reject phone numbers with letters', () => {
    const errorMessage = 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
    expect(validatePhone('+7abc1234567')).toBe(errorMessage);
    expect(validatePhone('8abc1234567')).toBe(errorMessage);
  });
});
