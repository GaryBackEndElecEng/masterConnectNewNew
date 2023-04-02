import {
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Platform,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
// import {  View } from "./Themed";
import api from "../components/axios/api";
import Colors from "../constants/Colors";
import WebOS from "../components/extra/WebOS";
import { Link, useSearchParams, useRouter } from "expo-router";
import Services from "../components/Services";

import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Button } from "@react-native-material/core";

const productProduct = () => {
  const serviceRef = React.useRef();
  const productUrl = "/account/product/";
  const route = useRouter();
  const params = useSearchParams();
  const { id, name } = params;
  const [loaded, error] = useFonts();
  const { width, height } = useWindowDimensions();
  const Roboto = loaded && { fontFamily: Roboto_100Thin };
  const Roboto700 = loaded && { fontFamily: Roboto_700Bold };
  const jamieProject = "https://jamie-project.herokuapp.com";
  const storeFront = "https://www.master-sale.ca";
  const blurhash = "LhF%V;axROs7~VaybIoI%Maeo#ay";
  const staticImage = "https://new-master.s3.ca-central-1.amazonaws.com/static";
  const masterconnect = "https://www.master-connect.ca";
  const [product, setProduct] = React.useState({ loaded: false, data: {} });
  const [openServices, setOpenServices] = React.useState(false);
  const [getHeight, setGetHeight] = React.useState(0);

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(productUrl);
        const body = res.data.filter(
          (obj) => parseInt(obj.id) === parseInt(id)
        )[0];
        setProduct({ loaded: true, data: body });
        // console.log(body);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProduct();
  }, [id]);
  

  const handleServices = (e) => {
    e.preventDefault();
    if (!openServices) {
      setOpenServices(true);
    } else {
      setOpenServices(false);
    }
  };
  return (
    <View style={[styles.container, { width: width, height: height }]}>
      {product.loaded && product.data && (
        <View style={{ width: "100%", marginBottom: 30, marginTop: 0 }}>
          <Image
            style={[
              styles.image_,
              { width: "100%", height: 200, borderWidth: 2 },
            ]}
            source={{ uri: `${staticImage}/${product.data.imageName}` }}
            //placeholder={blurhash}
            contentFit="contain"
            //transition={500} //transitions the merging of the image
          />
          <Text style={[styles.title, Roboto]}>{name}</Text>
          <Text style={[styles.monthly, Roboto]}>
            5Yr ${product.data.monthly}.00 monthly
          </Text>
          {!openServices && (
            <View style={{ width: "95%" }}>
              <Text style={[styles.summaryTitle, Roboto700]}>Summary</Text>
              <Text style={[styles.summary, Roboto]}>
                {product.data.summary}
              </Text>

              <Text style={[styles.summaryTitle, Roboto700]}>Description</Text>
              <Text style={[styles.summary, Roboto]}> {product.data.desc}</Text>
            </View>
          )}
          <TouchableOpacity ref={serviceRef}  >
            <Button
              title="services"
              color={Colors.blue.dark}
              style={{ color: "white" }}
              onPress={(e) => handleServices(e)}
            />
          </TouchableOpacity>
          {openServices && <Services services={product.data.services} />}
        </View>
      )}
      <View style={styles.separator} />
    </View>
  );
};

export default productProduct;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    gap: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignproducts: "center",
    backgroundColor: "white",
  },
  main: {
    marginVertical: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignproducts: "center",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
  mainTitle: {
    // marginVertical:20,
    fontSize: 40,
    // fontFamily:"Roboto",
    color: "red",
  },
  product: {
    flex: 1,
    gap: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignproducts: "center",
  },
  image_: {},
  monthly: {
    color: Colors.green.medium,
    fontWeight: 800,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
  summary: {
    color: Colors.blue.dark,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  summaryTitle: {
    color: Colors.blue.dark,
    textAlign: "center",
    fontSize: 26,
  },
  separator: {
    marginVertical: 30,
    height: 10,
    width: "100%",
    marginBottom: 300,
  },
  separator2: {
    marginVertical: 20,
    alignproducts: "center",
    width: "80%",

    // backgroundColor:Colors.blue.dark,
    color: "white",
  },
  shadowProp: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.9,
    borderRadius: 1,
  },
});
