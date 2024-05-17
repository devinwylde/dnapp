import * as React from 'react';
import { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { signIn } = useContext(AuthContext);
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={() => signIn(email, password)} />
        <Button
            title="Switch to Sign Up"
            onPress={() => navigation.replace('SignUp', {}, { animationEnabled: false })}
        />
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