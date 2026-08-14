import { BookingFormData } from "@/src/types/booking";
import { FC } from "react";
import styles from './Confirmation.module.scss'

interface ConfirmationScreenProps {
    data: BookingFormData;
    onReset: () => void;
}

export const ConfirmationScreen: FC<ConfirmationScreenProps> = ({ data, onReset }) => {
    return (
        <div className={styles.confirmation}>
            <h2 className={styles.title}>Столик забронирован</h2>

            <div className={styles.details}>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Имя:</span>
                    <span className={styles.detailValue}>{data.name}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Телефон:</span>
                    <span className={styles.detailValue}>{data.phone}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Дата:</span>
                    <span className={styles.detailValue}>{data.date}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Время:</span>
                    <span className={styles.detailValue}>{data.time}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Количество гостей:</span>
                    <span className={styles.detailValue}>{data.guests}</span>
                </div>
            </div>

            <button className={styles.resetButton} onClick={onReset}>Забронировать ещё</button>
        </div>
    )
}