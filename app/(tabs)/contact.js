import {
  StyleSheet,
  Button,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Image} from 'expo-image';
import React from "react";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import RequestQuote from '../../components/RequestQuote';
import SendMessage from '../../components/SendMessage';

export default function contact() {
  const staticImage =
    "https://new-master.s3.ca-central-1.amazonaws.com/static/images";
  const coupleOnBeach = "coupleOnBeach.png";
  const blurhash = "LhF%V;axROs7~VaybIoI%Maeo#ay";
  const postRequest = "postRequest/";
  const post="post/"
  const { width } = useWindowDimensions();
  const [openForm,setOpenForm]=React.useState(false);
  
  const handleSelect=(e)=>{
    e.preventDefault();
  }
  return (
    <View style={[styles.container, { width: width }]}>
      
      <View style={styles.separatorTop} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Your Info is private to us</Text>
      
      <Image
        style={[styles.image, { width: width, height: 100 }]}
        source={{ uri: `${staticImage}/${coupleOnBeach}` }}
        //placeholder={blurhash}
        contentFit="cover"
        //transition={200} //transitions the merging of the image
      />
      { !openForm &&
      <View style={{rowGap:10,flex:1}}>
      <Button title="get a Quote"
       onPress={()=>setOpenForm(true)}
      />
      <SendMessage width={width}/>
      </View>
      }
      { openForm &&
      <View style={{rowGap:10,flex:1}}>
      <Button title="send a Message"
       onPress={()=>setOpenForm(false)}
      />
      <RequestQuote width={width}/>
      </View>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#181e34',
  },
  keyboardAwareContainer: {
    justifySelf: "flex-start",
    width: "100%",
    borderWidth: 1,
  },
  formContainer: {
    padding: 8,
    margin: "auto",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: Colors.grey.lightLight,
    gap: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputTitle: {
    fontSize: 14,
    alignSelf: "flex-start",
    fontWeight: "bold",
    color: Colors.blue.lightDark,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  separatorTop: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  input: {
    margin: "auto",
    width: "100%",
    height: 40,
    margin: 1,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  textArea: {
    margin: "auto",
    width: "100%",
    height: 60,
    margin: 1,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  image: {},
});
