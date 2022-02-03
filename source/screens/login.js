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
      if(email && pass){
        let response = await auth().signInWithEmailAndPassword(email, pass)
        if (response && response.user) {
          navigation.navigate('Dashboard')
          // Alert.alert("Success ✅", "Authenticated successfully")
        }
      }
    } catch (e) {
      ToastAndroid.show('Wrong email or password', ToastAndroid.SHORT)
      // console.error(e.message)
    }
  }

  return (
    <View style={{alignItems:'center',flex:1, justifyContent:'center',paddingHorizontal:20, width:'100%',marginTop:-70}}>
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
        <Text style={{color:'white'}}>Log In</Text>
      </TouchableOpacity>
    </View>
  );

}
