import { View, Text ,Alert, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import Firebase from "../config/firebase"

const { auth} = Firebase()


export default function Login({navigation}) {


  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")

  const __doSingIn = async () => {
    try {
      if(pass.length >= 6){
        let response = await auth().createUserWithEmailAndPassword(
          email,
          pass
        )
        if (response && response.user) {
          Alert.alert("Success ✅", "Account created successfully")
        }
      }else{
        ToastAndroid.show('Password must be atleast 6 characters.', ToastAndroid.SHORT)
      }
    } catch (e) {
      console.error(e.message)
  }
  }

  return (
    <View style={{alignItems:'center',flex:1,paddingHorizontal:20, width:'100%',marginTop:50}}>
      <TextInput
        style={{width:'100%',height:60,marginBottom:20}}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{width:'100%',height:60}}
        label="Password"
        value={pass}
        onChangeText={text => setPass(text)}
      />

      <TouchableOpacity onPress={__doSingIn} style={{backgroundColor:'brown', width:100, height:50,marginTop:20,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'white'}}>Register</Text>
      </TouchableOpacity>
    </View>
  );

}
