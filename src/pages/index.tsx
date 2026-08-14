import React, { useState } from 'react';
import { BookingForm } from '../components/BookingForm/BookingForm';
import { ConfirmationScreen } from '../components/Confirmation/ConfirmationScreen';
import { BookingFormData, BookingStatus } from '../types/booking';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const handleSubmit = (data: BookingFormData) => {
    setStatus('loading');

    setTimeout(() => {
      setBookingData(data);
      setStatus('success');
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setBookingData(null);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {status === 'success' && bookingData ? (
          <ConfirmationScreen data={bookingData} onReset={handleReset} />
        ) : (
          <BookingForm onSubmit={handleSubmit} status={status} />
        )}
      </main>
    </div>
  );
}
