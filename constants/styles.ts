import { StyleSheet } from 'react-native';

// EXTERNAL STYLING (Modul 1)
// Semua style disimpan di file ini lalu di-import oleh App.tsx dan MedicineCard.tsx.

export const colors = {
  primary: '#0F8B8D',
  primaryDark: '#0A6466',
  background: '#F2F8F8',
  card: '#FFFFFF',
  text: '#1B2B34',
  muted: '#7A8A93',
  border: '#D6E4E6',
  success: '#2E9E5B',
  danger: '#D64545',
  disabled: '#B8C7CA',
};

export const styles = StyleSheet.create({
  // ----- Layout umum -----
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 48,
  },

  // ----- Header -----
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 2,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  tagline: {
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.muted,
  },

  // ----- Card progress -----
  progressCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CDEEEF',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressPercent: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },

  // ----- Section -----
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },

  // ----- Jadwal hari ini (baris ringkas) -----
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scheduleTime: {
    width: 60,
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  scheduleDose: {
    fontSize: 13,
    color: colors.muted,
  },
  scheduleStatus: {
    fontSize: 13,
    fontWeight: '600',
  },

  // ----- MedicineCard -----
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  cardTime: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  cardMeta: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 14,
  },

  // ----- Tombol -----
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginRight: 10,
  },
  infoButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },

  // ----- Info obat -----
  infoBox: {
    backgroundColor: '#E8F4F4',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 6,
  },
  infoLine: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 3,
  },
  infoLabel: {
    fontWeight: '700',
  },

  // ----- Form tambah obat -----
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FAFCFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 14,
    paddingVertical: 20,
  },
});
