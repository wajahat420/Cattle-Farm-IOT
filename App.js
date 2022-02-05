import 'react-native-gesture-handler'
import { View, Text } from 'react-native';
import React, {useState} from 'react';
import Stack from './source/navigation/stack';
import Login from './source/screens/login';

export default function App() {

  const [state, setState] = useState(false)

  return (
      state
      ?
      <Stack/>
      :
      <Login setLogin={() => setState(true)}/>

  );
}
