import { FC } from "react";
import styles from './BookingForm.module.scss';

interface InputFieldProps {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void; 
    error?: string;
    required?: boolean;
    options?: string[];
    min?: number;
    max?: number;
    placeholder?: string;
}

export const InputField: FC<InputFieldProps> = ({
    label,
    id,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    required = false,
    options,
    min,
    max,
    placeholder
}) => {
    return (
        <div className={styles.fieldGroup}>
            <label htmlFor={id} className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>

            {type === 'select' && options ? (
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                >
                    <option value="">Выберите...</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : (
                <input 
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${styles.input} ${error ? styles.inputError : ''}`}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                />
            )}
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    )
}