# DoseMate

Aplikasi mobile sederhana untuk mencatat obat dan jadwal minum obat.
Dibuat dengan **React Native + Expo + TypeScript** 

Tidak menggunakan backend atau server database. Data obat disimpan pada penyimpanan lokal perangkat menggunakan AsyncStorage, sehingga tetap ada setelah aplikasi ditutup dan dibuka kembali. Menghapus data aplikasi dapat menghapus data obat tersebut.


DoseMate/
├── App.tsx                     # Halaman utama: state, custom function, UI
├── components/
│   └── MedicineCard.tsx        # Custom component kartu obat (dipakai ulang)
├── constants/
│   └── styles.ts               # EXTERNAL STYLING (StyleSheet + warna)
├── data/
│   └── medicines.ts            # ARRAY OF OBJECTS data awal obat
├── types/
│   └── medicine.ts             # INTERFACE Medicine, TYPE MedicineStatus
└── utils/
    └── medicine.ts             # Custom function: getStatusLabel, getGreeting, isValidTime
```


## Penjelasan Loop

Kartu obat **tidak ditulis satu per satu**. Data obat disimpan dalam array `medicines`, lalu di-loop dengan `map()`:

```tsx
medicines.map((medicine) => (
  <MedicineCard key={medicine.id} medicine={medicine} ... />
))
```

- `map()` mengambil setiap objek `Medicine` dari array dan menghasilkan satu `MedicineCard`.
- `key={medicine.id}` wajib unik agar React tahu elemen mana yang berubah. Karena itu `id` obat baru dibuat dari id terbesar + 1.
- Menambah obat cukup menambah objek ke array; kartu baru muncul otomatis.
- Loop yang sama juga dipakai untuk membuat daftar **Jadwal Hari Ini** (`todaySchedule.map(...)`).

## Alur Fitur

1. **Dashboard** – sapaan sesuai jam, nama aplikasi, tagline, kartu progress, dan jadwal hari ini.
2. **Progress** – `calculateProgress()` menghitung obat berstatus `"taken"` lalu persentasenya; hasilnya langsung dipakai di UI (teks `x / y obat`, persen, dan progress bar).
3. **My Medicines** – daftar `MedicineCard` hasil loop.
4. **Tandai Sudah Diminum** – `handleMarkTaken(id)` mengubah `status` menjadi `"taken"`; `setMedicines` memicu render ulang sehingga UI, progress, dan jadwal langsung berubah.
5. **Info** – tombol Info menampilkan nama, dosis, jam minum, dan catatan obat (kartu bisa dibuka/ditutup).
6. **Tambah Obat** – isi nama, dosis, jam (`HH:MM`), dan catatan opsional, lalu tekan **Tambah Obat**. Input divalidasi sebelum data masuk ke array.

