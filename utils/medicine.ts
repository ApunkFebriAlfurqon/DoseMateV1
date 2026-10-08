import { MedicineStatus } from '../types/medicine';

// CUSTOM FUNCTION (Modul 1): menentukan teks status memakai condition (ternary).
export const getStatusLabel = (status: MedicineStatus): string => {
  return status === 'taken' ? '✓ Sudah diminum' : '○ Belum diminum';
};

// CUSTOM FUNCTION: sapaan berdasarkan jam, memakai condition if / else if.
export const getGreeting = (hour: number): string => {
  if (hour < 11) {
    return 'Selamat pagi';
  } else if (hour < 15) {
    return 'Selamat siang';
  } else if (hour < 18) {
    return 'Selamat sore';
  }
  return 'Selamat malam';
};

// CUSTOM FUNCTION: validasi format jam 24 jam, contoh "08:00".
export const isValidTime = (value: string): boolean => {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
};
