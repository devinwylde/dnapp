import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Settings } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker'
import * as geneInfo from '../geneInfo.json';
import colors from '../uikit/colors';

const GeneDetailsScreen = ({ route }) => {
    const { gene, type: initialType } = route.params;
    const [type, setType] = useState(initialType);
    const [open, setOpen] = useState(false);

    const items = Object.keys(geneInfo[gene]['types']).map((key) => ({
        label: key,
        value: key,
        labelStyle: {
            color: key == initialType ? '#25b6cc' : '#000'
        },
        containerStyle: {
            backgroundColor: key == initialType ? '#dce3ed' : '#fff'
        }
      }));

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>My {gene} Gene</Text>
            <View style={styles.pickerContainer}>
            <DropDownPicker
                open={open}
                value={type}
                items={items}
                setOpen={setOpen}
                setValue={setType}
            />
            </View>
        </View>
        <ScrollView style={{width: '100%'}} contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.detailBox, {backgroundColor: colors.lights[0]}]}>
                <Text style={styles.headerText}>Function</Text>
                <Text style={styles.pText}>{geneInfo[gene].function}</Text>
            </View>
            <View style={[styles.detailBox, {backgroundColor: colors.lights[1]}]}>
                <Text style={styles.headerText}>Nickname</Text>
                <Text style={styles.pText}>{geneInfo[gene].nick}</Text>
            </View>
            <View style={[styles.detailBox, {backgroundColor: colors.lights[2]}]}>
                <Text style={styles.headerText}>My Gene Summary (Type: {type})</Text>
                <Text style={styles.pText}>{geneInfo[gene]["types"][type].summary}</Text>
            </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    zIndex: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailBox: {
    width: '90%',
    justifyContent: 'flex-start',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  pickerContainer: {
    width: 80,
  },
  picker: {
    height: 50,
    width: 150,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  pText: {
    fontSize: 14,
    padding: 10,
  },
});

export default GeneDetailsScreen;