'use client';

import { ChangeEvent } from 'react';

interface WorkoutInputProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export const WorkoutInput = ({ value, max, onChange }: WorkoutInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // разрешаем только цифры
    if (!/^\d*$/.test(rawValue)) {
      return;
    }

    if (rawValue === '') {
      onChange(0);
      return;
    }

    const numericValue = Number(rawValue);

    if (numericValue > max) {
      onChange(max);
      return;
    }

    onChange(numericValue);
  };

  return (
    <input
      type="text"
      value={value === 0 ? '' : value}
      placeholder="0"
      onChange={handleChange}
      inputMode="numeric"
      className="workout-input"
    />
  );
};
