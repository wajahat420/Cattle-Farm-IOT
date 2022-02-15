import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodStock from '../screens/foodstock';
import Finance from '../screens/finance';
import Health from '../screens/health'
import UserSupport from '../screens/user-support'
import Weight from '../screens/weight'
// import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';

const Drawer = createDrawerNavigator();

const Logout = (data) => {
  // AsyncStorage.setItem('email', '')
  // reload()
  // data()
  console.log('DATATATA', data.data())
  // RNRestart.Restart()
  // window.location.reload(true);
  return <></>
}

const  Stack = ({ reload }) =>  {
   return (
    //  <Text></Text>
     <NavigationContainer>
       <Drawer.Navigator  initialRouteName="Dashboard">
         <Drawer.Screen name="Dashboard" component={Dashboard} />
         <Drawer.Screen name="Stock" component={FoodStock} />
         <Drawer.Screen name="Finance" component={Finance} />
         <Drawer.Screen name="Health" component={Health} />
         <Drawer.Screen name="User-Support" component={UserSupport} />
         <Drawer.Screen name="Weight" component={Weight} />
         {/* <Drawer.Screen name="Logout"  component={() => <Logout data={reload}/>} /> */}
         {/* <Drawer.Screen name="login" component={Login} /> */}
       </Drawer.Navigator>
     </NavigationContainer>
   );
 }



export default Stack