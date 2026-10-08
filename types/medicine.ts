// TYPE & INTERFACE (Modul 1)
// Status obat hanya boleh bernilai "taken" atau "pending".
export type MedicineStatus = 'taken' | 'pending';

// Interface Medicine: bentuk (struktur) satu objek obat.
export interface Medicine {
  id: number;
  name: string;
  dose: string;
  time: string;
  status: MedicineStatus;
  note: string;
}

// Interface untuk hasil perhitungan progress.
export interface Progress {
  taken: number;
  total: number;
  percent: number;
}
