import {
  BookingFormData,
  BookingStatus,
  FormErrors,
  TIME_SLOTS,
} from '@/src/types/booking';
import React, { FC, useState } from 'react';
import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
} from '../../utils/validation';
import { InputField } from './InputField';
import styles from './BookingForm.module.scss';
import { getTodayDate } from '../../utils/date';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  status: BookingStatus;
}

const initialFormData: BookingFormData = {
  name: '',
  phone: '',
  date: getTodayDate(),
  time: '',
  guests: 1,
};

export const BookingForm: FC<BookingFormProps> = ({ onSubmit, status }) => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (
    name: string,
    value: string | number
  ): string | null => {
    switch (name) {
      case 'name':
        return validateName(value as string);
      case 'phone':
        return validatePhone(value as string);
      case 'date':
        return validateDate(value as string);
      case 'time':
        return validateTime(value as string);
      case 'guests':
        return validateGuests(value as number);
      default:
        return null;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof BookingFormData];
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'loading') return;

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === 'guests' ? Number(value) : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));

    if (touched[name]) {
      const error = validateField(name, parsedValue);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const value = formData[name as keyof BookingFormData];
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

   const hasErrors = Object.values(errors).some((error) => error !== undefined);

   const isFormValid = 
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.date !== '' &&
    formData.time !== '' &&
    formData.guests >= 1 &&
    formData.guests <= 12 &&
    !hasErrors;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Бронирование столика</h2>

      <div className={styles.fields}>
        <InputField
          label="Имя гостя"
          id="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
          placeholder="Иван"
        />

        <InputField
          label="Телефон"
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          required
          placeholder="+7 999 999 99 99"
        />

        <InputField
          label="Дата"
          id="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.date}
          required
        />

        <InputField
          label="Время"
          id="time"
          type="select"
          value={formData.time}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.time}
          required
          options={TIME_SLOTS as unknown as string[]}
        />

        <InputField
          label="Количество гостей"
          id="guests"
          type="number"
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.guests}
          required
          min={1}
          max={12}
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status === 'loading' || !isFormValid}
      >
        {status === 'loading' ? 'Бронирую...' : 'Забронировать'}
      </button>
    </form>
  );
};
