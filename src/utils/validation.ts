import { TIME_SLOTS, Timeslot } from '../types/booking';

export function validateName(value: string): string | null {
  if (!value.trim) return 'Введите имя';
  if (value.trim().length < 2) return 'Минимум 2 символа';
  return null;
}

export function validatePhone(value: string): string | null {
  const cleaned = value.replace(/[\s()]/g, '');

  if (!cleaned.startsWith('+7') && !cleaned.startsWith('8')) {
    return 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
  }

  const digits = value.replace(/\D/g, '');
  if (digits.length !== 11) {
    return 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
  }

  if (digits[0] !== '7' && digits[0] !== '8') {
    return 'Введите номер в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
  }

  return null;
}

export function validateDate(value: string): string | null {
  if (!value) return 'Выберите дату';
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) return 'Дата не может быть раньше сегодня';
  return null;
}

export function validateTime(value: string): string | null {
  if (!value) return 'Выберите время';
  if (!TIME_SLOTS.includes(value as Timeslot))
    return 'Выберите время из доступных слотов';
  return null;
}

export function validateGuests(value: number): string | null {
  if (!value) return 'Укажите количество гостей';
  if (value < 1 || value > 12) return 'Выберите от 1 до 12 гостей';
  return null;
}
