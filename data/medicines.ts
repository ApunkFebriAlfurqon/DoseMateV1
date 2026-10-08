import { Medicine } from '../types/medicine';

// ARRAY OF OBJECTS (Modul 1)
// Data awal obat. Setiap elemen array adalah objek bertipe Medicine.
export const initialMedicines: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol',
    dose: '500 mg',
    time: '08:00',
    status: 'taken',
    note: 'Diminum sesudah makan untuk meredakan demam atau nyeri.',
  },
  {
    id: 2,
    name: 'Vitamin C',
    dose: '500 mg',
    time: '13:00',
    status: 'pending',
    note: 'Diminum sesudah makan siang dengan segelas air putih.',
  },
  {
    id: 3,
    name: 'Amoxicillin',
    dose: '500 mg',
    time: '20:00',
    status: 'pending',
    note: 'Antibiotik: habiskan sesuai anjuran dokter.',
  },
];
