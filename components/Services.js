import { StyleSheet, Text, View,FlatList,useWindowDimensions } from 'react-native'
import React from 'react';
import { Image } from "expo-image";
import {
    useFonts,
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_700Bold,
  } from "@expo-google-fonts/roboto";

const Service=({service})=>{
    const [loaded,error]=useFonts();
    const roboto= loaded && {fontFamily:Roboto_400Regular}
    const roboto700= loaded && {fontFamily:Roboto_700Bold}
    const staticImage = "https://new-master.s3.ca-central-1.amazonaws.com/static";
    const blurhash = "LhF%V;axROs7~VaybIoI%Maeo#ay";
    const [item,setItem]=React.useState({loaded:false,data:{}});
    React.useEffect(()=>{
        setItem({loaded:true,data:service});
        // console.log(service);
    },[]);
    
    return(
        <>
        { (item.loaded && item.data) &&
        <View style={styles.serviceContainer}>
            <View >
                <Text style={[styles.serviceTitle,roboto700]}>{item.data.name}</Text>
            </View>
            <Image
          style={[styles.image, { width: "100%", height: 100 }]}
          source={{ uri: `${staticImage}/${item.data.image}` }}
          //placeholder={blurhash}
          contentFit="contain"
          //transition={1000} //transitions the merging of the image
        />
            <View style={styles.serviceContent}>
                <Text style={[styles.serviceSubTitle,styles.alignContent,roboto700]}>Summary</Text>
                <Text style={[styles.serviceSummary,styles.alignContent,roboto]}>{item.data.summary}</Text>
                <Text style={[styles.serviceSubTitle,styles.alignContent,roboto700]}>Description</Text>
                <Text style={[styles.serviceDesc,styles.alignContent,roboto]}>{item.data.desc}</Text>
            </View>
        </View>
        }
        </>
    );
};

const Services = ({services}) => {
    const {width,height}=useWindowDimensions();
    const [showServices,setShowServices]=React.useState({loaded:false,data:[]});
    React.useEffect(()=>{
        setShowServices({loaded:true,data:services});
    },[services]);

  return (
    <View style={[styles.container,{width:width,height:height}]}>
        {showServices.loaded && showServices.data ?
            <FlatList
            data={showServices.data}
            renderItem={({item})=><Service service={item} />}
            keyExtractor={(index)=>`${Math.ceil(Math.random()*10000)}-service-${index}`}
            />
            :
            <Text>Loading...</Text>
    }
    </View>
  )
};

export default Services

const styles = StyleSheet.create({
    container:{
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"column",
        textAlign:"center",
        backgroundColor:"white",
        // height:"100%"

    },
    serviceTitle:{
        marginVertical:30,
        margin:"auto",
        fontSize:28,
        
    },
    serviceName:{
    textAlign:"center"
    },
    serviceContainer:{
        flex:1,
        margin:"auto",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    },
    serviceSubTitle:{
        marginVertical:20,
        fontSize:22,
        
    },
    serviceSummary:{
        textAlign:"left"
    },
    serviceDesc:{
        textAlign:"left"
    },
    alignContent:{
        // textAlign:"center"
    },
});