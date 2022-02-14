import { View, Text ,Alert, TouchableOpacity, ToastAndroid,ImageBackground} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import Firebase from "../config/firebase"
import AsyncStorage from '@react-native-async-storage/async-storage'

const { auth} = Firebase()


export default function Login({navigation, setLogin}) {



  const [email, setEmail] = React.useState("")
  const [pass, setPass] = React.useState("")

  const __doSingIn = async () => {
    try {
      if(email && pass){
        let response = await auth().signInWithEmailAndPassword(email, pass)
        if (response && response.user) {
          await AsyncStorage.setItem('email', email)
          setLogin()
        }
      }
    } catch (e) {
      ToastAndroid.show('Wrong email or password', ToastAndroid.SHORT)
      // console.error(e.message)
    }
  }

  return (
    <ImageBackground source={require('../imgs/9.jpg')} style={{flex:1}}>
      <View style={{alignItems:'center',flex:1, justifyContent:'center',paddingHorizontal:20, width:'100%'}}>
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
    </ImageBackground>
  );

}
