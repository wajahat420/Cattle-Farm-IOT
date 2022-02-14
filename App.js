import 'react-native-gesture-handler'
import { View, Text } from 'react-native';
import React, {useEffect, useState} from 'react';
import Stack from './source/navigation/stack';
import Login from './source/screens/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  console.log('STATE', state, typeof state)

  return (
      state === true
      ?
      <Stack/>
      :
      state === false
      ?
      <Login setLogin={isLogin}/>
      :
      null
  );
}
