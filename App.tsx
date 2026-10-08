import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import MedicineCard from './components/MedicineCard';
import { initialMedicines } from './data/medicines';
import { Medicine, Progress } from './types/medicine';
import { getGreeting, getStatusLabel, isValidTime } from './utils/medicine';
import { colors, styles } from './constants/styles';

const MEDICINES_STORAGE_KEY = '@DoseMate:medicines';

export default function App() {
  // ---------- STATE (variable const/let) ----------
  // Data obat aktif disimpan di state dan dipersistenkan ke penyimpanan lokal.
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const [openInfoId, setOpenInfoId] = useState<number | null>(null);

  // State untuk input form Tambah Obat.
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  // Muat data lokal saat aplikasi dibuka. Jika belum pernah disimpan,
  // data awal dari data/medicines.ts tetap digunakan.
  useEffect(() => {
    let isMounted = true;

    const loadMedicines = async () => {
      try {
        const savedMedicines = await AsyncStorage.getItem(MEDICINES_STORAGE_KEY);
        if (savedMedicines !== null) {
          const parsedMedicines: unknown = JSON.parse(savedMedicines);
          if (Array.isArray(parsedMedicines) && isMounted) {
            setMedicines(parsedMedicines as Medicine[]);
          }
        }
      } catch (storageError) {
        console.warn('Gagal memuat data obat dari penyimpanan lokal.', storageError);
      } finally {
        if (isMounted) {
          setIsStorageLoaded(true);
        }
      }
    };

    void loadMedicines();
    return () => {
      isMounted = false;
    };
  }, []);

  // Simpan setiap perubahan, tetapi tunggu pemuatan awal selesai agar
  // data awal tidak menimpa data yang sudah tersimpan.
  useEffect(() => {
    if (!isStorageLoaded) {
      return;
    }

    AsyncStorage.setItem(MEDICINES_STORAGE_KEY, JSON.stringify(medicines)).catch(
      (storageError) => {
        console.warn('Gagal menyimpan data obat ke penyimpanan lokal.', storageError);
      }
    );
  }, [isStorageLoaded, medicines]);

  const userName = 'Sobat';
  const greeting = getGreeting(new Date().getHours());

  // ---------- CUSTOM FUNCTION: calculateProgress ----------
  // Menghitung jumlah obat berstatus "taken" lalu persentasenya.
  const calculateProgress = (): Progress => {
    const total = medicines.length;
    const taken = medicines.filter((item) => item.status === 'taken').length;
    const percent = total === 0 ? 0 : Math.round((taken / total) * 100);
    return { taken, total, percent };
  };

  // ---------- CUSTOM FUNCTION: tandai sudah diminum ----------
  // Mengubah status obat tertentu dari "pending" menjadi "taken".
  const handleMarkTaken = (id: number) => {
    setMedicines((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: 'taken' } : item
      )
    );
  };

  // ---------- CUSTOM FUNCTION: buka / tutup info ----------
  const handleToggleInfo = (id: number) => {
    setOpenInfoId((current) => (current === id ? null : id));
  };

  // ---------- CUSTOM FUNCTION: tambah obat ----------
  const handleAddMedicine = () => {
    const cleanName = name.trim();
    const cleanDose = dose.trim();
    const cleanTime = time.trim();

    // CONDITION: validasi input sebelum data disimpan.
    if (cleanName === '' || cleanDose === '' || cleanTime === '') {
      setError('Nama obat, dosis, dan jam minum wajib diisi.');
      return;
    }
    if (!isValidTime(cleanTime)) {
      setError('Format jam harus HH:MM, contoh 08:00.');
      return;
    }

    // id baru = id terbesar + 1 (agar selalu unik untuk key).
    let nextId = 1;
    medicines.forEach((item) => {
      if (item.id >= nextId) {
        nextId = item.id + 1;
      }
    });

    const newMedicine: Medicine = {
      id: nextId,
      name: cleanName,
      dose: cleanDose,
      time: cleanTime,
      status: 'pending',
      note: note.trim() === '' ? 'Tidak ada catatan.' : note.trim(),
    };

    setMedicines((current) => [...current, newMedicine]);
    setName('');
    setDose('');
    setTime('');
    setNote('');
    setError('');
  };

  // Hasil calculateProgress() dipakai langsung di UI di bawah.
  const progress = calculateProgress();

  // Jadwal hari ini: salinan array diurutkan berdasarkan jam.
  const todaySchedule = [...medicines].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ===== 1. DASHBOARD: header ===== */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {greeting}, {userName}!
          </Text>
          <Text style={styles.appName}>DoseMate</Text>
          <Text style={styles.tagline}>Teman pengingat obatmu</Text>
        </View>

        {/* ===== 7. PROGRESS HARI INI ===== */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progress Hari Ini</Text>
          <Text style={styles.progressText}>
            {progress.taken} / {progress.total} obat sudah diminum
          </Text>
          <Text style={styles.progressPercent}>{progress.percent}%</Text>
          <View style={styles.progressTrack}>
            {/* INLINE STYLING: lebar bar mengikuti persentase */}
            <View style={[styles.progressFill, { width: `${progress.percent}%` }]} />
          </View>
        </View>

        {/* ===== Jadwal Hari Ini (LOOP dengan map) ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jadwal Hari Ini</Text>
          {todaySchedule.map((item) => (
            <View key={item.id} style={styles.scheduleRow}>
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleName}>{item.name}</Text>
                <Text style={styles.scheduleDose}>{item.dose}</Text>
              </View>
              <Text
                style={[
                  styles.scheduleStatus,
                  { color: item.status === 'taken' ? colors.success : colors.muted },
                ]}
              >
                {getStatusLabel(item.status)}
              </Text>
            </View>
          ))}
        </View>

        {/* ===== 2. MY MEDICINES (LOOP dengan map -> MedicineCard) ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Medicines</Text>
          {medicines.length === 0 ? (
            <Text style={styles.emptyText}>Belum ada obat. Tambahkan di bawah.</Text>
          ) : (
            medicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                isInfoOpen={openInfoId === medicine.id}
                onToggleInfo={handleToggleInfo}
                onMarkTaken={handleMarkTaken}
              />
            ))
          )}
        </View>

        {/* ===== 4. TAMBAH OBAT ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tambah Obat</Text>
          <View style={styles.formCard}>
            <Text style={styles.label}>Nama obat</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Ibuprofen"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Dosis</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 200 mg"
              placeholderTextColor={colors.muted}
              value={dose}
              onChangeText={setDose}
            />

            <Text style={styles.label}>Jam minum (HH:MM)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: 21:00"
              placeholderTextColor={colors.muted}
              value={time}
              onChangeText={setTime}
              keyboardType="numbers-and-punctuation"
              maxLength={5}
            />

            <Text style={styles.label}>Catatan (opsional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Diminum sesudah makan"
              placeholderTextColor={colors.muted}
              value={note}
              onChangeText={setNote}
            />

            {/* CONDITION: pesan error tampil hanya jika ada error */}
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleAddMedicine}
            >
              <Text style={styles.buttonText}>Tambah Obat</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
