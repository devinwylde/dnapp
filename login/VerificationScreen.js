import * as React from 'react';
import { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

export default function VerificationScreen({ route }) {
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState('');

  const { verify } = useContext(AuthContext);

  const handleVerify = async () => {
    try {
        await verify(email, verificationCode);
        navigation.replace('Login', {}, { animationEnabled: false });
      } catch (error) {
        alert(error.message);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});