import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useContext } from 'react';
import { GeneDataContext } from '../contexts/GeneDataContext';

const HomeScreen = ({ navigation }) => {
    const { ttamData, dnaCoData, uploadFile } = useContext(GeneDataContext);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            {Object.keys(ttamData).length > 0 ?
                Object.keys(ttamData).map(gene => (
                <TouchableOpacity key={gene} style={styles.geneItem} onPress={() => navigation.navigate('GeneDetails', { gene, type: ttamData[gene] })}>
                <Text style={styles.geneItemText}>{gene}</Text>
                <Text style={styles.geneItemText}>{ttamData[gene]}</Text>
                </TouchableOpacity>
            )) : (
                <View style={styles.missingGenesBox}>
                    <Text style={styles.missingGenesText}>No gene data found!</Text>
                </View>
            )}
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 100,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  geneItem: {
    width: '100%',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  geneItemText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 20,
  },
  missingGenesBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: '50%',
  },
  missingGenesText: {
    fontSize: 16,
  },
});