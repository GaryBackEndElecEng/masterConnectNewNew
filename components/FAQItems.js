import { StyleSheet, FlatList,TouchableOpacity,View,Animated } from "react-native";
import React from "react";
import { Box, Stack,Text, } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const ItemView = ({ item,width ,Roboto}) => {
    const answerEffectTiming=React.useRef(new Animated.Value(0)).current;
    const [open,setOpen]=React.useState({ id: null, open: false });
    let getAnswerEffect=open.open ? styles.answerEffect :styles.answer;

    // React.useEffect(()=>{
    //     if(open.open){
    //     Animated.timing(answerEffectTiming,{toValue:1,duration:500}).start();
    //     }
    // },[open]);

    const handleQuest = (e, id) => {
        e.preventDefault();
        
        if (!open.open) {
          setOpen({ id:parseInt( id), open: true });
          if(!answerEffectTiming)return
        //   console.log("answerEffectTiming",answerEffectTiming)
          Animated.timing(answerEffectTiming,{toValue:1,duration:500}).start();

        } else {
          setOpen({ id: null, open: false });
        //   console.log("answerEffectTiming",answerEffectTiming)
          
        }
      };
  return (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={[styles.itemView,{width:width}]}>
      <Stack
        direction="column"
        style={styles.StackCol2}
        spacing={10}
        w={width}
      >
        <Stack direction="row" w={width} spacing={2} style={styles.StackCol3}>
          <TouchableOpacity>
            {open.open && open.id === item.id ? (
              <AntDesign
                name="caretdown"
                size={18}
                color="red"
                style={{ marginTop: 20, marginBottom: 20, marginLeft: 0 }}
              />
            ) : (
              <AntDesign
                name="caretup"
                size={18}
                color="black"
                style={{ marginTop: 20, marginBottom: 20, marginLeft: 0 }}
              />
            )}
          </TouchableOpacity>
          <Text
            onPress={(e) => handleQuest(e, item.id)}
            variant="h6"
            style={[{ fontWeight: 400, paddingRight: 25,  },Roboto]}
          >
            {item.question}
          </Text>
        </Stack>
        <Animated.View style={{opacity:answerEffectTiming,}} useNativeDriver>
        {(open.open && open.id === item.id) && (
            
          <Text style={[getAnswerEffect,Roboto]} variant="h6" >
            {item.answer}
          </Text>
          
        )}
        </Animated.View>
      </Stack>
    </View>
  );
};

const FAQItems = ({data,Roboto}) => {
  return (
    <View style={styles.container}>
      <FlatList
      data={data}
      contentContainerStyle={{gap:10}}
    //   columnWrapperStyle={{gap:5}}
      renderItem={({item})=><ItemView item={item} Roboto={Roboto}/>}
      keyExtractor={(item,index)=>`${item.id}--FAQS--${index}`}
      />
    </View>
  );
};

export default FAQItems;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
  itemView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    gap:10,
    backgroundColor:"white"
  },
  scroll: {
    flex: 1,
    backgroundColor:"white"
  },
  stackCol1: {
    backgroundColor:"white"
  },
  StackCol2: {
    gap:5,
    backgroundColor:"white",
   
  },
  StackCol3: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap:10
  },
  button: {
    color: "black",
    backgroundColor: "lightblue",
    fontSize: 10,
  },
  answer: {
    opacity:0,
    padding:15,
    color: "blue",
    transform:"translateY(-30px)",
    transition:"all 1s ease-in",
  },
  answerEffect: {
    opacity:1,
    padding:15,
    color: "blue",
    transform:"translateY(0px)",
    transition:"all 1s ease-in",
  },
});
