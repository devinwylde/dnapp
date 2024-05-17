import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '../supabaseClient';
import { decode23andMe, decodeDNAco } from '../logic/decode';

export const GeneDataContext = createContext();

export const GeneDataProvider = ({ children }) => {
    const [ttamData, setTtamData] = useState({});
    const [dnaCoData, setDnaCoData] = useState({});

  useEffect(() => {
    const loadResults = async () => {
      try {
        const storedTtamData = await AsyncStorage.getItem('ttamData');
        const storedDnaCoData = await AsyncStorage.getItem('dnaCoData');
        if (storedTtamData != null) {
          setTtamData(JSON.parse(storedTtamData));
        }
        if (storedDnaCoData != null) {
          setDnaCoData(JSON.parse(storedDnaCoData));
        }
      } catch (e) {
        console.error("Failed to load decoded results from storage", e);
      }
    };

    loadResults();
  }, []);

  const uploadFile = async (type) => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: 'text/plain' });
      if (file != null && file.assets != null && file.assets.length > 0) { // null checks
        
        const fileSize = file.assets[0].size;
        const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB in bytes
        if (fileSize > MAX_FILE_SIZE) {
          Alert.alert('Error', 'File size exceeds the 50 MB limit');
          return;
        }

        const rawData = await fetch(file.assets[0].uri);
        const text = await rawData.text();

        const userId = (await supabase.auth.getSession()).data.session.user.id;
        const filePath = type === 0 ? `${userId}/dnaCoData.txt` : `${userId}/ttamData.txt`;

        console.log(filePath);
        const { error } = await supabase.storage
            .from("userData")
            .upload(filePath, text, {
                upsert: true,
            });

        if (error) {
            throw error;
        }

        const decodedResults = type === 0 ? decodeDNAco(text) : decode23andMe(text);

        if (type === 0) {
            setDnaCoData(decodedResults);
            await AsyncStorage.setItem('dnaCoData', JSON.stringify(decodedResults));
        } else {
            setTtamData(decodedResults);
            await AsyncStorage.setItem('ttamData', JSON.stringify(decodedResults));
        }
        
        Alert.alert('Success', 'File uploaded successfully!');
      }
    } catch (error) {
      // if (!DocumentPicker.isCancel(error)) {
        console.log("Error while picking the file: ", error);
        Alert.alert('Error', 'File upload has failed');
      // }
    }
  };

  const deleteFile = async (type) => {
    const userId = (await supabase.auth.getSession()).data.session.user.id;
      const filePath = type === 0 ? `${userId}/dnaCoData.txt` : `${userId}/ttamData.txt`;

      const { error } = await supabase.storage
        .from("userData")
        .remove([filePath]);

      if (error) {
        throw error;
      }

      // Remove the results from local storage and update state
      if (type === 0) {
        setDnaCoData({});
        await AsyncStorage.removeItem('dnaCoData');
      } else {
        setTtamData({});
        await AsyncStorage.removeItem('ttamData');
      }
  };

  return (
    <GeneDataContext.Provider value={{ ttamData, dnaCoData, uploadFile, deleteFile }}>
      {children}
    </GeneDataContext.Provider>
  );
};