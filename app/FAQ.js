import { StyleSheet,Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FAQS from '../components/FAQS';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

export default function FAQ() {
  const [loaded,error]=useFonts();
  const Roboto= loaded && {fontFamily:Roboto_400Regular};
  const staticImage="https://new-master.s3.ca-central-1.amazonaws.com/static";
  const faq="FAQS.png";
  const blurhash="LhF%V;axROs7~VaybIoI%Maeo#ay"
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your Question</Text>
      <Image
        style={styles.image_}
        source={{uri:`${staticImage}/${faq}`}}
        //placeholder={blurhash}
        contentFit="contain"
        //transition={500} //transitions the merging of the image
    />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <FAQS Roboto={Roboto}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
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
  image_:{
    width:"100%",
    height:200
  },
});
