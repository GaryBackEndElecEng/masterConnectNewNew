import { View, Text, Image,StyleSheet,useWindowDimensions } from 'react-native';
import React from 'react';
import logo from "../assets/images/logo.png";
import { useDeviceOrientation } from "@react-native-community/hooks";

const Logo = () => {
  const {width,height}=useWindowDimensions();
  const getHeight=useDeviceOrientation()==="portrait" ? 110:100;
  const isPortrait=useDeviceOrientation()==="portrait"? true:false;
  const top= isPortrait? 35:5;
  const logoStyle=isPortrait ? styles.logoStyle: styles.logoStyleLandscape;
  return (
    <View style={[styles.container,{height:getHeight,width:width}]}>
      <Image source={logo} 
      style={[styles.propShadow,logoStyle]}
      />
      <Text style={[styles.master,{top:top}]}> masterconnect</Text>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    container:{
      
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        backgroundColor:"blue",
        zIndex:10,
        marginTop:0,
        marginBottom:10,
       
    },
    propShadow:{
        shadowOffset:{width:3,height:3},
        shadowOpacity:1,
        shadowRadius:50
    },
    logoStyle:{
        width:85,
        height:85,
        margin:70,
        borderRadius:75/2
    },
    logoStyleLandscape:{
        width:35,
        height:35,
        margin:0,
        borderRadius:35/2,
        
    },
    master:{
        position:"absolute",
        top:35,
        fontSize:20,
        color:"red"
    }
});