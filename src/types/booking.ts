export interface BookingFormData {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
}

export type BookingStatus = 'idle' | 'loading' | 'success';

export interface FormErrors {
    name?: string;
    phone?: string;
    date?: string;
    time?: string;
    guests?: string;
}

export const TIME_SLOTS = [
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
] as const;

export type Timeslot = typeof TIME_SLOTS[number];