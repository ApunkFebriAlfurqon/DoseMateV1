# DoseMate

Aplikasi mobile sederhana untuk mencatat obat dan jadwal minum obat.
Dibuat dengan **React Native + Expo + TypeScript** untuk **Tugas Pekan Demo Pemrograman Mobile – Modul 1**.

Tidak menggunakan backend atau server database. Data obat disimpan pada penyimpanan lokal perangkat menggunakan AsyncStorage, sehingga tetap ada setelah aplikasi ditutup dan dibuka kembali. Menghapus data aplikasi dapat menghapus data obat tersebut.

## Cara Menjalankan

```bash
npm install
npx expo start
```

Lalu scan QR code dengan aplikasi **Expo Go** (Android/iOS), atau tekan `a` untuk emulator Android.

## Struktur Project

```
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

## Penerapan Materi Modul 1

| Materi | Lokasi |
|---|---|
| Basic components (`View`, `Text`, `TextInput`, `Pressable`, `ScrollView`) | `App.tsx`, `components/MedicineCard.tsx` |
| JSX / TSX | Seluruh file `.tsx` |
| StyleSheet | `StyleSheet.create` di `constants/styles.ts` |
| External Styling | `constants/styles.ts`, di-import dengan `import { styles, colors } ...` |
| Inline Styling | Lebar progress bar `{ width: \`${progress.percent}%\` }` di `App.tsx`; warna status `{ color: ... }` di `MedicineCard.tsx` |
| Variable `const` / `let` | `const` untuk state & fungsi; `let nextId` di `handleAddMedicine` |
| Condition | Ternary di `getStatusLabel`, `if / else if` di `getGreeting`, `isInfoOpen && (...)`, validasi form, tampilan error |
| Custom Function | `calculateProgress`, `handleMarkTaken`, `handleAddMedicine`, `handleToggleInfo`, `getStatusLabel`, `getGreeting`, `isValidTime`, `MedicineCard` |
| Loop | `medicines.map(...)`, `todaySchedule.map(...)`, `forEach` untuk mencari id baru |
| Array of Objects | `initialMedicines` di `data/medicines.ts` |
| Type / Interface | `Medicine`, `MedicineStatus`, `Progress`, `MedicineCardProps` |
| Penyimpanan lokal | `@react-native-async-storage/async-storage` untuk menyimpan data obat di perangkat |
| Package / Library | `@expo/vector-icons` (Ionicons) untuk ikon tombol Info |

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

## Alur Demo yang Disarankan

1. Tunjukkan dashboard dan progress awal (1 / 3 obat, 33%).
2. Tekan **Info** pada salah satu obat.
3. Tekan **Tandai Sudah Diminum** pada obat berstatus pending; perhatikan status, progress, dan persen berubah langsung.
4. Tambahkan obat baru lewat form; perhatikan kartu baru muncul dan progress menyesuaikan (misalnya 2 / 4 obat, 50%).
5. Buka `App.tsx`, `components/MedicineCard.tsx`, dan `constants/styles.ts` untuk menjelaskan kode.
