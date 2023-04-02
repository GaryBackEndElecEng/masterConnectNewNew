import { StyleSheet, FlatList,useWindowDimensions,Pressable,TouchableOpacity,Text,View,Platform } from "react-native";
import React from "react";
import { Image} from 'expo-image';
// import {  View } from "./Themed";
import api from "./axios/api";
import Colors from "../constants/Colors";
import {Link} from 'expo-router';
import WebOS from './extra/WebOS';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';



const Product =({width,item})=>{
    const jamieProject="https://jamie-project.herokuapp.com";
    const storeFront="https://www.master-sale.ca";
    const blurhash="LhF%V;axROs7~VaybIoI%Maeo#ay";
    const staticImage="https://new-master.s3.ca-central-1.amazonaws.com/static";
    const masterconnect="https://www.master-connect.ca";
    const [loaded,error]=useFonts();
    const Roboto= loaded && {fontFamily:Roboto_100Thin};
    const Roboto700= loaded && {fontFamily:Roboto_700Bold};
    const [product,setProduct]=React.useState({loaded:false,data:{}});

    React.useEffect(()=>{
      setProduct({loaded:true,data:item});
    },[]);
    
    return(
      <>
      {product.loaded && product.data &&
    <View style={[styles.product,{width:width}]}>
        <View style={styles.separator} lightColor="#eee" darkColor={Colors.maroon.medium} />
        <Text style={[styles.title,Roboto700]}>{product.data.name}</Text>
        
        <Image
        style={[styles.image_,{width:"100%",height:200}]}
        source={{uri:`${staticImage}/${product.data.imageName}`}}
        //placeholder={blurhash}
        contentFit="contain"
        //transition={500} //transitions the merging of the image
        />
        <Text style={[styles.monthly,Roboto]}> 5Yr ${product.data.monthly}.00 monthly</Text>
        <View style={{width:"95%"}}>
        <Text style={[styles.summary,Roboto]}> {product.data.summary}</Text>
        </View>
        <TouchableOpacity style={[styles.separator2,styles.shadowProp]}>
        <WebOS link={product.data.extra_kwargs}/>
        </TouchableOpacity>
    </View>
    
    }
    </>
    );
};

const Products = () => {
  const [loaded,error]=useFonts();
  const Roboto= loaded && {fontFamily:Roboto_100Thin};
  const Roboto700= loaded && {fontFamily:Roboto_700Bold};
    const {width}=useWindowDimensions();
  const [products, setProducts] = React.useState({ loaded: false, data: [] });
  const productUrl = "/account/product/";
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get(productUrl);
        const body = res.data.filter(obj=>(obj.type==="pageDesign")).filter(obj=>(obj.category==="frontPage"));
        setProducts({ loaded: true, data: body });
      } catch (error) {
        console.error(error.message);
      }
    };
    getProducts();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={[styles.mainTitle,Roboto700]}>Designs</Text>
      </View>
        {products.loaded && products.data ?
      <FlatList
        data={products.data}
        renderItem={({item})=><Product width={width} item={item} />}
        keyExtractor={(item,index)=>(`${item.id}-products-${index}`)}

      />
      :
      <Text style={Roboto700}> loading</Text>
        }
    </View>
    
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    flexDirection: "column",
    backgroundColor:"white"
  },
  main: {
    marginVertical: 10,
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:Colors.blue.dark,
    marginTop:20
  },
  title: {
    paddingTop:10,
    paddingBottom:10,
    fontSize:30,
    fontWeight:500,
    textDecorationLine:"underline",
    
    
  },
  mainTitle: {
    // marginVertical:20,
    fontSize:40,
    // fontFamily:"Roboto",
    color:"white",
    marginTop:20
    
  },
  product: {
    flex:1,
    gap:5,
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"center",

  },
  image_:{
    
  },
  monthly:{
    color:Colors.green.medium,
    fontWeight:800,
    paddingTop:10,
    paddingBottom:10,
    fontSize:20,
  },
  summary:{
    color:Colors.blue.dark,
    textAlign:"center",
    paddingLeft:10,
    paddingRight:10
  },
  separator: {
    marginVertical: 20,
    height: 2,
    width: '100%',
  },
  separator2: {
    marginVertical: 20,
    alignItems:"center",
    width: '80%',
    backgroundColor:"white",
    borderWidth:1,
    backgroundColor:Colors.blue.dark,
    color:"white",
    borderRadius:20/2
  },
  shadowProp:{
    shadowOffset:{width:2,height:2},
    shadowColor:"black",
    shadowOpacity:0.9,
    borderRadius:1,
  }
});
