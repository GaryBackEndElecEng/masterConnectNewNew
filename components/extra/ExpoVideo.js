import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react';
import { Video, AVPlaybackStatus } from 'expo-av';

const ExpoVideo = ({video_,width,Image,height,resizeMode}) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const audioSound=async()=>{
        try {
            const { sound: playbackObject } = await Audio.Sound.createAsync(
                { uri: video_ },
                { shouldPlay: true }
              );

        } catch (error) {
            console.error(error.message)
        }
   
    }
    return (
        <View style={[{width:width},styles.container]}>
          <Video
            ref={video}
            style={[styles.video,{width:width,height:height}]}
            source={{
              uri:video_
            }}
            useNativeControls
            resizeMode={resizeMode}
            isLooping ={false}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            posterSource={{uri:Image}}
            posterStyle={{width:width,height:height}}
          />
          <View style={[styles.buttons,]}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              }
            />
          </View>
        </View>
      );
}

export default ExpoVideo

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  video:{
    
  },
  buttons:{
    marginTop:10,
    marginBottom:10,
    width:"100%"
  }
});