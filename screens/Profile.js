import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, Text, View, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as rsidDict from '../RSIDdict.json';
import { useEffect, useContext, useState } from 'react';
import { supabase } from '../supabaseClient';
import AuthContext from '../contexts/AuthContext';
import { GeneDataContext } from '../contexts/GeneDataContext';

export default function ProfileScreen() {
    const { ttamData, dnaCoData, uploadFile, deleteFile } = useContext(GeneDataContext);
    const { signOut } = useContext(AuthContext);
    const [uploadingFile, setUploadingFile] = useState(false);

    const handleFileUpload = async (type) => {
        setUploadingFile(true);
        await uploadFile(type);
        setUploadingFile(false);
    }

    const handleDelete = async (type) => {
        try {
          await deleteFile(type);
          Alert.alert('Success', 'File deleted successfully');
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };
  
    return (
      <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.rowText}>My 23andMe results</Text>
            {Object.keys(ttamData).length > 0 ? (
                <View style={styles.updateBox}>
                    <TouchableOpacity onPress={() => handleFileUpload(1)} disabled={uploadingFile}>
                    {uploadingFile ? (
                        <ActivityIndicator size="small" color="#0084ff" />
                    ) : (
                        <Text style={styles.uploadText}>Update</Text>
                    )}
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 16}} onPress={() => handleDelete(1)} disabled={uploadingFile}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                ) : (
                    <TouchableOpacity onPress={() => handleFileUpload(1)} disabled={uploadingFile}>
                    {uploadingFile ? (
                        <ActivityIndicator size="small" color="#0084ff" />
                    ) : (
                        <Text style={styles.uploadText}>Upload</Text>
                    )}
                    </TouchableOpacity>
            )}
        </View>
        <View style={styles.row}>
            <Text style={styles.rowText}>My DNA Company results</Text>
            {Object.keys(dnaCoData).length > 0 ? (
                <View style={styles.updateBox}>
                    <TouchableOpacity onPress={() => handleFileUpload(0)} disabled={true}>
                    {uploadingFile ? (
                        <ActivityIndicator size="small" color="#0084ff" />
                    ) : (
                        <Text style={styles.uploadText}>Update</Text>
                    )}
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 16}} onPress={() => handleDelete(0)} disabled={true}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                ) : (
                    <TouchableOpacity onPress={() => handleFileUpload(0)} disabled={true}>
                    {uploadingFile ? (
                        <ActivityIndicator size="small" color="#0084ff" />
                    ) : (
                        <Text style={styles.uploadText}>Upload</Text>
                    )}
                    </TouchableOpacity>
            )}
        </View>
        <Button title="Logout" onPress={signOut} />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    updateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowText: {
        fontSize: 18,
    },
    uploadText: {
        color: '#0084ff',
        fontSize: 18,
    },
    deleteText: {
        color: '#ff8400',
        fontSize: 18,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});