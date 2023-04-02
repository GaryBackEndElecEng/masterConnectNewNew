import {
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
  View,
  Pressable,
  ScrollView
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import api from "../../components/axios/api";
import Colors from "../../constants/Colors";
import { IconButton } from "@react-native-material/core";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { FontAwesome5 } from "@expo/vector-icons";
import PackageProduct from "../PackageProduct";
import { useRouter, Link } from "expo-router";
//() => route.push(`/packageDetail/?id=${obj.id}`)

const RenderPackage = ({ item }) => {
  const [loaded, error] = useFonts();
  const roboto = loaded && { fontFamily: "Roboto_400Regular" };
  const roboto700 = loaded && { fontFamily: "Roboto_700Bold" };
  const route=useRouter();
  const blurhash = "LhF%V;axROs7~VaybIoI%Maeo#ay";
  const staticImage = "https://new-master.s3.ca-central-1.amazonaws.com/static";
  const [open, setOpen] = React.useState(false);
  const [Package_,setPackage_]=React.useState({loaded:false,data:{}});
  React.useEffect(()=>{
      setPackage_({loaded:true,data:item});
      // console.log(item)
  },[]);
  
  const handleOpen = (e, product) => {
    e.preventDefault();
    route.push({
      pathname:`/PackageProduct`,
      params:{
        id:product.id,
        name:product.name
      }
  })
  };

  return (
    <View style={[ { width: "100%" }]}>
    { Package_.loaded  ?
      (
    <View style={[ { width: "100%" }]}>

        <View style={[styles.separatorTitle]}>
          <Text style={[styles.title, roboto700]}>{Package_.data.name}</Text>
        </View>
        <Image
          style={[styles.image_, { width: "100%", height: 200 }]}
          source={{ uri: `${staticImage}/${Package_.data.image}` }}
          //placeholder={blurhash}
          contentFit="contain"
          //transition={500} //transitions the merging of the image
        />
        <Text style={[styles.monthly, roboto]}>
          5-yr: ${Package_.data.monthly}.00 monthly
        </Text>
        <Text style={[styles.saving, roboto]}> savings: ${Package_.data.savings}.00 </Text>
        <Text style={[styles.summaryTitle, roboto700]}>summary</Text>
        <Text style={[styles.summary, roboto]}>{Package_.data.summary}</Text>
        <View style={styles.productView}>
        <Pressable
          style={{
            // flex: 1,
            margin:"auto",
            flexDirection: "row",
            justifyContent: "center",
            alignPackages: "center",
            marginHorizontal: 1,
            paddingHorizontal:10,
            backgroundColor:Colors.blue.dark
            
          }}
          onPress={(e) => handleOpen(e, Package_.data.products[0])}
        >
          <IconButton
            icon={({ color }) => (
              <FontAwesome5
                name="product-hunt"
                size={20}
                color={"white"}
                style={{backgroundColor:"black",borderRadius:20/2}}
              />
            )}
          />
          <Text style={[roboto700, { fontSize: 26,marginTop:5,color:"white" }]}>products</Text>
        </Pressable>
        </View>
      
    </View>
    )
      :
      <Text>Loading</Text>
      }
      </View>
  );
};
const packages = () => {
  const [loaded, error] = useFonts();
  const { width,height,scale } = useWindowDimensions();
  const [packages, setPackages] = React.useState({ loaded: false, data: [] });
  const roboto = loaded && { fontFamily: "Roboto_400Regular" };
  const roboto700 = loaded && { fontFamily: "Roboto_700Bold" };
  const newHeight= height + 300;

  React.useEffect(() => {
    const urlPackages = "/account/getPackages/";
    const getPackages = async () => {
      try {
        const res = await api.get(urlPackages);
        const body = res.data;
        setPackages({ loaded: true, data: body });
        // console.log(body)
      } catch (error) {
        console.error(error.message);
      }
    };
    getPackages();
  }, []);
  
  return (
    <View styles={[styles.container, { width: width,marginBottom:200 }]}>
      {/* <View style={[ { backgroundColor: Colors.blue.dark }]}>
        <Text style={[styles.title, roboto700, { color: "white" }]}>
          Selection
        </Text>
      </View> */}

      <View style={[styles.subContainer, { width: "100%", }]}>
        {(packages.loaded && packages.data) ? (
          <FlatList
          
            data={packages.data}
            //   PackageSeparatorComponent={"PackageSeparatorComponent"}
            renderItem={({ item }) => (
              <RenderPackage item={item} />
            )}
            keyExtractor={(item, index) => `${item.id}-packages-${index}`}
          />
        )
        :
        <Text>Loading</Text>
        }
        
      </View>
     
      
    </View>
    
  );
};

export default packages;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection:"column",
    gap: 10,
    backgroundColor: "white",
   
  },
  subContainer: {
    margin: "auto",
    // height: 600,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection:"column",
    gap: 5,
    backgroundColor: "white",
  },
  subSubContainer: {
    margin:"auto",
    gap: 5,
    marginBottom: 10,
  },
  separator: {
    marginVertical:30,
    paddingVertical: 5,
    marginBottom:30,
    height:30
  },
  separatorTitle: {
    marginVertical:10,
    paddingVertical: 5,
  },
  separatorLine: {
    marginVertical: 10,
    width: "100%",
    borderWidth: 2,
    height: 2,
    color: Colors.grey.medium,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  summaryTitle: {
    fontSize: 24,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.blue.dark,
  },
  monthly: {
    fontSize: 30,
    textAlign: "center",
    color: Colors.green.medium,
  },
  saving: {
    fontSize: 30,
    textAlign: "center",
    color: Colors.blue.medium,
  },
  PackageSeparatorComponent: {
    marginVertical: 10,
    width: "100%",
    borderWidth: 2,
    color: Colors.grey.medium,
  },
  productView:{
    flex: 1,
    alignSelf:"center",
    flexDirection: "column",
    justifyContent: "center",
    alignPackages: "center",
    width:"50%",
    margin: 5,
  },
  image_: {},
});
