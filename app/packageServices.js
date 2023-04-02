import { StyleSheet,Text, View  } from 'react-native';
import {Link,useSearchParams} from 'expo-router';
import React from 'react';




export default function packageServices() {
  const {id}=useSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Blog</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
