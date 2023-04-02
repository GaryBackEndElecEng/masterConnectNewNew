import { StyleSheet,useWindowDimensions,FlatList } from 'react-native';
import { useDeviceOrientation } from "@react-native-community/hooks";
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import api from  '../../components/axios/api';
import React from 'react';
import ExpoVideo from '../../components/extra/ExpoVideo';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const VideoLayout=({item,Roboto})=>{
  const staticImage="https://new-master.s3.ca-central-1.amazonaws.com/static";
  const {width}=useWindowDimensions();
  return (
  <View style={styles.videoContainer}>
    <Text style={[{fontSize:26,margin:"auto",fontWeight:800},Roboto]}>{item.name}</Text>
  <ExpoVideo video_={`${staticImage}/${item.imageName}`} width={width} Image={`${staticImage}/${item.frontCover}`} height={300} resizeMode={"contain"} />
  
  <View style={styles.videoDescription}>
    
    <Text style={[{fontSize:18,margin:"auto"},Roboto]}>{item.summary}</Text>
    <Text style={[{fontSize:26,margin:"auto"},Roboto]}>${item.monthly}.00</Text>
  </View>
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
  </View>
  )
}

export default function videos() {
  const [loaded,error]=useFonts();
  const Roboto= loaded && {fontFamily:Roboto_400Regular};
  const isPortrait = useDeviceOrientation() === "portrait" ? true : false;
const [video_arr, setVideo_arr] = React.useState({ loaded: false, data: [] });
React.useEffect(() => {
  const getVideos = async () => {
    const url = "/account/product/";
    try {
      const res = await api.get(url);
      const body = res.data;
      const videos = body.filter((obj) => obj.type === "video");
      // console.log(videos)
      if (videos.length > 0) {
        setVideo_arr({ loaded: true, data: videos });
        
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  getVideos();
}, [setVideo_arr]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video list</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={video_arr.loaded && video_arr.data}
        contentContainerStyle={{gap:10}}
        renderItem={({item})=><VideoLayout item={item} Roboto={Roboto}/>}
        keyExtractor={(item,index)=>`${item.id}-video-${index}`}
      />
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
    fontSize: 30,
    fontWeight: 'bold',
  },
  videoContainer:{
    alignItems:"center",
    justifyContent:"center"
  },
  videoDescription:{
    margin:"auto",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    gap:10,
  },
  separator: {
    marginVertical: 30,
    height: 3,
    width: '80%',
  },
});
