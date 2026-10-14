import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Session 2.3 Full: the bottom fields would sit under the keyboard in a plain ScrollView.
// KeyboardAwareScrollView scrolls the focused field into view, driven by the keyboard's
// real position on the UI thread (no UIKeyboardWillShowNotification bookkeeping).
const FIELDS = [
  'Full name',
  'Email',
  'Street address',
  'City',
  'State',
  'ZIP code',
  'Card number',
  'Expiry (MM/YY)',
  'CVC',
];

export default function Checkout() {
  return (
    <KeyboardAwareScrollView bottomOffset={24} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Shipping & payment</Text>
      {FIELDS.map((label) => (
        <View key={label} style={styles.field}>
          <Text style={styles.label}>{label}</Text>
          <TextInput style={styles.input} placeholder={label} />
        </View>
      ))}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  heading: { fontSize: 20, fontWeight: '600' },
  field: { gap: 4 },
  label: { fontSize: 14, color: '#555' },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
