import {
    StyleSheet,
    Button,
    Alert,
    TextInput,
    Text, View,
    
    
  } from "react-native";
  import React from "react";
  import {Picker} from '@react-native-picker/picker';
  // import { Text, View } from "./Themed";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { useForm } from "react-hook-form";
  import Colors from "../constants/Colors";
  import api from "./axios/api";

const RequestQuote = ({width}) => {
//     const staticImage =
//     "https://new-master.s3.ca-central-1.amazonaws.com/static/images";
//   const coupleOnBeach = "coupleOnBeach.png";
  const blurhash = "LhF%V;axROs7~VaybIoI%Maeo#ay";
//   const postRequest = "postRequest/";
  const post="post/"
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cell, setCell] = React.useState("");
  const [coName, setCoName] = React.useState("");
  const [coSite, setCoSite] = React.useState("");
  const [content, setContent] = React.useState("");
  const [confirm, setConfirm] = React.useState({loaded:false,data:{}});
  const [preferredComms, setPreferredComms] = React.useState("email");

  const formData = {
    fullName: fullName,
    email: email,
    cell: cell,
    coName: coName,
    coSite:coSite,
    content:content,
    preferredComms:preferredComms
  };

  React.useEffect(() => {
    const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    const username_REGEX = /(^[A-Za-z]{6,16})/;
    const fullname_REGEX=/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const password_REGEX = /(^[a-zA-Z]+\w{5,})([?!_&#$+])/;
    const cellphone_REGEX=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g;
    const website_REGEX=/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let emailValid = email_REGEX.test(email);
    let fullNameValid = fullname_REGEX.test(fullName);
    let contentValid = fullname_REGEX.test(content);
    let cellValid = cellphone_REGEX.test(cell);
    let coSiteValid = website_REGEX.test(coSite);
    if(emailValid && fullNameValid && contentValid && cellValid){
      setConfirm({loaded:true,data:{email:emailValid,fullName:fullNameValid,content:contentValid,cell:cellValid,coSite:coSiteValid}})
    }
}, [content, email,fullName,setConfirm,coSite,cell,confirm.loaded,confirm.data.email,confirm.data.fullName,confirm.data.content]);

  const onSubmit = (e) => {
    e.preventDefault();
    const sendRequest = async (e) => {
      try {
        const res = await api.post(post,formData);
        const body= res.data;
        Alert.alert("We will contact you ASAP via: ",preferredComms);
      setFullName("");
      setEmail("");
      setCell("");
      setCoName("");
      setCoSite("");
      setContent("");
      setPreferredComms("email");
      setConfirm({loaded:false,data:{}})
      } catch (error) {
        console.error(error.message);
      }
      
    };
    if(confirm.loaded){
    sendRequest();
    
    }else{
      if(!confirm.data.email){
        Alert.alert("Please complete the form: ",`email:${email}, full Name: ${fullName}`);
      }else if(!confirm.data.fullName){
        Alert.alert("Please check your full Name: ",fullName);
      }else if(!confirm.data.content){
        Alert.alert("There is no content: ",content);
      }else if(!confirm.data.coSite){
        Alert.alert("Please check your Company's site address: ",coSite);
      }else if(!confirm.data.cell){
        Alert.alert("Please check your phone number: ",cell);
      }
      
    }
  };
  return (
    
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.keyboardAwareContainer,
          { width: width },
        ]}
      >
        <View style={styles.formContainer}>
          <Text nativeID="aria-labelledby" style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            name="fullName"
            label="full name "
            placeholder="full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <Text nativeID="aria-labelledby" style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            name="email"
            label="email"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <Text nativeID="aria-labelledby" style={styles.inputTitle}>Cell</Text>
          <TextInput
            style={styles.input}
            name="cell"
            label="cell"
            secureTextEntry={false}
            placeholder="cell"
            value={cell}
            onChangeText={setCell}
          />
          <Text nativeID="aria-labelledby" style={styles.inputTitle}>Your Company</Text>
          <TextInput
            style={styles.input}
            name="coName"
            label="coName"
            placeholder="Company"
            value={coName}
            onChangeText={setCoName}
          />
          <Text nativeID="aria-labelledby" style={styles.inputTitle}>Your Site</Text>
          <TextInput
            style={styles.input}
            name="coSite"
            label="coSite"
            placeholder="Company's site"
            value={coSite}
            onChangeText={setCoSite}
          />
          <Text nativeID="aria-labelledby" style={styles.inputTitle}>Your Request</Text>
          <TextInput
            style={styles.textArea}
            name="content"
            label="content"
            multiline={true}
            numberOfLines={2}
            // maxLength={40}
            placeholder="Your request"
            value={content}
            onChangeText={setContent}
          />
          <Text Text nativeID="aria-labelledby" style={styles.inputTitle}>Your preferred communication</Text>
          <Picker
            style={{height:40,width:width/2,borderWidth:1,backgroundColor:"white"}}
            selectedValue={preferredComms}
            onValueChange={(itemValue,index)=>setPreferredComms(itemValue)}
          >
            <Picker.Item label="email" value="email"/>
            <Picker.Item label="cell" value="cell"/>
          </Picker>

          <Button
            title="Submit"
            type="submit"
            onPress={(e) => onSubmit(e)}
            color={Colors.blue.dark}
            style={{ marginTop: 20 }}
          />
        </View>
      </KeyboardAwareScrollView>
      
  );
}

export default RequestQuote

const styles = StyleSheet.create({
    container: {
        
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom:20
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#181e34',
      },
      keyboardAwareContainer: {
        // flex:1,
        justifySelf: "flex-start",
        width: "100%",
        
        // borderWidth: 1,
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
        paddingBottom:30,
        marginBottom:20
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
})