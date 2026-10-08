import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Medicine } from '../types/medicine';
import { getStatusLabel } from '../utils/medicine';
import { colors, styles } from '../constants/styles';

// Props = data yang dikirim dari App.tsx ke komponen ini.
interface MedicineCardProps {
  medicine: Medicine;
  isInfoOpen: boolean;
  onToggleInfo: (id: number) => void;
  onMarkTaken: (id: number) => void;
}

// CUSTOM FUNCTION / COMPONENT (Modul 1)
// Satu fungsi ini dipakai ulang untuk SEMUA obat: cukup kirim data lewat props.
const MedicineCard = ({
  medicine,
  isInfoOpen,
  onToggleInfo,
  onMarkTaken,
}: MedicineCardProps) => {
  const isTaken = medicine.status === 'taken';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{medicine.name}</Text>
        <Text style={styles.cardTime}>{medicine.time}</Text>
      </View>
      <Text style={styles.cardMeta}>{medicine.dose}</Text>

      {/* INLINE STYLING + CONDITION: warna teks berubah sesuai status */}
      <Text
        style={[
          styles.statusText,
          { color: isTaken ? colors.success : colors.muted },
        ]}
      >
        {getStatusLabel(medicine.status)}
      </Text>

      {/* CONDITION: info hanya tampil saat tombol Info ditekan */}
      {isInfoOpen && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Informasi Obat</Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Nama: </Text>
            {medicine.name}
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Dosis: </Text>
            {medicine.dose}
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Jam minum: </Text>
            {medicine.time}
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Catatan: </Text>
            {medicine.note}
          </Text>
        </View>
      )}

      <View style={styles.cardActions}>
        <Pressable
          style={({ pressed }) => [
            styles.infoButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onToggleInfo(medicine.id)}
        >
          <Ionicons
            name={isInfoOpen ? 'information-circle' : 'information-circle-outline'}
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoButtonText}>Info</Text>
        </Pressable>

        <Pressable
          disabled={isTaken}
          style={({ pressed }) => [
            styles.button,
            isTaken && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onMarkTaken(medicine.id)}
        >
          <Text style={styles.buttonText}>
            {isTaken ? 'Sudah Diminum' : 'Tandai Sudah Diminum'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MedicineCard;
