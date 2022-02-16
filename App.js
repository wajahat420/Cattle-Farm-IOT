import 'react-native-gesture-handler'
import { View, Text, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import Stack from './source/navigation/stack';
import Login from './source/screens/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function App() {

  const [state, setState] = useState('')

  useEffect(() => {
    isLogin()
  })

  const isLogin = async () => {
    const email =  await AsyncStorage.getItem('email')

    console.log('EMAIL', email)
    if(email){
      setState(true)
    }else{
      setState(false)
    }
  }

  const logout = async() => {
    await AsyncStorage.setItem('email', '')
    isLogin()
  }

  return (
    <>
    {  
      state === true
      ?
      <Stack reload={isLogin}/>
      :
      state === false
      ?
      <Login setLogin={isLogin}/>
      :
      null
      }
      {
        state == true
        &&
      <TouchableOpacity onPress={logout} style={{position:'absolute', top:15, right:30, zIndex:1000}}>
        <MaterialIcons name='logout' size={25} color='black'/>
      </TouchableOpacity>
      }
    </>
  );
}
