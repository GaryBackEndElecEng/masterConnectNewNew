import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { Link } from "expo-router";

const LINK = ({ link }) => {
    return(
  <Link
    href={link}
    style={{
      margin: "auto",
      textAlign: "center",
      padding: 5,
    }}
  >
    <Text style={[{ fontSize: 20, color: "black" }]}> view page</Text>
  </Link>
    )
};
const WebOS = ({ link }) => {
    const masterconnect="https://www.master-connect.ca";
    const jamie="https://jamie-project.herokuapp.com";
    const sale="https//www.master-sale.ca";
  const [getLink,setGetLink]=React.useState();
  React.useEffect(()=>{
    const arr = [
        { link: jamie, send: jamie },
        { link: sale, send: "/contact" },
        { link: link, send: link },
      ];
    arr.forEach((obj, index) => {
      if (link.startsWith("http")){ 
            if(link===jamie) return setGetLink(<LINK link={jamie}/>);
            if(link!==jamie) return setGetLink(<LINK link={"/contact"}/>);
    }else if (!link.startsWith("http")) return setGetLink(<LINK link={`${masterconnect}${obj.send}`}/>)
        
    });
  },[link]);
  return (
    <View>
      {getLink}
    </View>
  );
};

export default WebOS;

const styles = StyleSheet.create({
  shadowProp: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.9,
    borderRadius: 1,
  },
});
