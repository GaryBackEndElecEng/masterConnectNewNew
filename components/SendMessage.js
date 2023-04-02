import {
    StyleSheet,
    Button,
    Alert,
    TextInput,
    Text, View
    
  } from "react-native";
  import React from "react";
  import {Picker} from '@react-native-picker/picker';
  // import { Text, View } from "./Themed";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { useForm } from "react-hook-form";
  import Colors from "../constants/Colors";
  import api from "./axios/api";

const SendMessage = ({width}) => {
      const postRequest = "postRequest/";
      const [fullName, setFullName] = React.useState("");
      const [email, setEmail] = React.useState("");
      const [content, setContent] = React.useState("");
      const [confirm, setConfirm] = React.useState({loaded:false,data:{}});
      const formData = {
        fullName: fullName,
        email: email,
        content:content,
      };

      React.useEffect(() => {
        const email_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const fullname_REGEX=/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        let emailValid = email_REGEX.test(email);
        let fullNameValid = fullname_REGEX.test(fullName);
        let contentValid = fullname_REGEX.test(content);
        
        if(emailValid && fullNameValid && contentValid){
          setConfirm({loaded:true,data:{email:emailValid,fullName:fullNameValid,content:contentValid}})
        }
    }, [content, email,fullName,confirm.loaded,confirm.data.email,confirm.data.fullName,confirm.data.content]);
    
      const onSubmit = (e) => {
        e.preventDefault();
        const sendRequest = async (e) => {
          try {
            const res = await api.post(postRequest,formData);
            const body= res.data;
            // console.log(body);
            Alert.alert("We will contact you ASAP by email: ",email);
          setFullName("");
          setEmail("");
          setContent("");
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

export default SendMessage

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

});