import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View } from '../../components/Themed';
import Products from '../../components/Products';
import * as Linking from 'expo-linking';
//() => Linking.openURL('https://www.masterconnect.ca')}
//LOOK UP Font.loadAsync=>npx expo install expo-font
export default function TabOneScreen() {
  
  return (
    <View style={styles.container}>
      <Products/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:"white",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
