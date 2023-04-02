import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  } from '@expo-google-fonts/roboto';

  export default ()=>{
    let [fontsLoaded]= useFonts({
      Roboto_100Thin,
      Roboto_100Thin_Italic,
      Roboto_300Light,
      Roboto_300Light_Italic,
      Roboto_400Regular,
      Roboto_400Regular_Italic,
      Roboto_500Medium,
      Roboto_500Medium_Italic,
      Roboto_700Bold,
      Roboto_700Bold_Italic,
      Roboto_900Black,
      Roboto_900Black_Italic,
    });}

export const Roboto400 = ({text,style}) => {
    let [fontsLoaded] = useFonts({
        "Roboto_400Regular":Roboto_400Regular
      });
      if(!fontsLoaded){
        return <AppLoading/>;
      }else{
        return (
            
            <Text style={[styles.textReg,style]}>{text}</Text>
            
        )
      }
}
export const RobotoItalic = ({text,style}) => {
    let [fontsLoaded] = useFonts({
        "Roboto_400Regular_Italic":Roboto_400Regular_Italic
      });
      if(!fontsLoaded){
        return <AppLoading/>;
      }else{
        return (
            
            <Text style={[styles.textItal,style]}>{text}</Text>
            
        )
      }
}



const styles = StyleSheet.create({
    textReg:{
    fontFamily:"Roboto_400Regular"
    },
    textItal:{
    fontFamily:"Roboto_400Regular_Italic"
    },
})