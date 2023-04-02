import {
    View,
    StyleSheet,
    SafeAreaView,
    useWindowDimensions
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import api from "../components/axios/api";
  import FAQItems from './FAQItems';
  
  const FAQS = ({Roboto}) => {
const {width}  =useWindowDimensions();
    const [FAQS, setFAQS] = useState({ loaded: false, data: [] });
    const [delay,setDelay]=useState(false);
  
    useEffect(() => {
      const getFAQS = async () => {
        try {
          const res = await api.get("/FAQS/");
          const faqs = res.data;
          setFAQS({ loaded: true, data: faqs });
          
        } catch (error) {
          console.error(error.message);
        }
      };
      getFAQS();
      // setFAQS({ data: faqs, loaded: true });
    }, []);
  
  
    return (
      <SafeAreaView style={[styles.container,{width:width}]}>
        
         {FAQS.loaded && <FAQItems data={FAQS.data} width={width} Roboto={Roboto}/>}
        
      </SafeAreaView>
    );
  };
  
  export default FAQS;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    
  });