import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodStock from '../screens/foodstock';
import Finance from '../screens/finance';
import Health from '../screens/health'
import UserSupport from '../screens/user-support'
import Weight from '../screens/weight'
import Dashboard from '../screens/dashboard';
import Sick from '../screens/sick';

const Drawer = createDrawerNavigator();


const  Stack = ({ reload }) =>  {
   return (
     <NavigationContainer>
       <Drawer.Navigator  initialRouteName="Dashboard">
         <Drawer.Screen name="Dashboard" component={Dashboard} />
         <Drawer.Screen name="Stock" component={FoodStock} />
         <Drawer.Screen name="Finance" component={Finance} />
         <Drawer.Screen name="Health" component={Health} />
         <Drawer.Screen name="User-Support" component={UserSupport} />
         <Drawer.Screen name="Weight" component={Weight} />
         <Drawer.Screen name="Sick" component={Sick} />
       </Drawer.Navigator>
     </NavigationContainer>
   );
 }



export default Stack