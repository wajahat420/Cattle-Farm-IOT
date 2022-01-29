import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodStock from '../screens/foodstock';
import Finance from '../screens/finance';
import Health from '../screens/health'
import UserSupport from '../screens/user-support'
import Weight from '../screens/weight'
import Login from '../screens/login';
import Dashboard from '../screens/dashboard';

const Drawer = createDrawerNavigator();


const  Stack = () =>  {
   return (
    //  <Text></Text>
     <NavigationContainer>
       <Drawer.Navigator  initialRouteName="dashboard">
         <Drawer.Screen name="Dashboard" component={Dashboard} />
         <Drawer.Screen name="Stock" component={FoodStock} />
         <Drawer.Screen name="Finance" component={Finance} />
         <Drawer.Screen name="Health" component={Health} />
         <Drawer.Screen name="User-Support" component={UserSupport} />
         <Drawer.Screen name="Weight" component={Weight} />
       </Drawer.Navigator>
     </NavigationContainer>
   );
 }

// const DashboardStackNavigator = createStackNavigator(  
//   {  
//       DashboardNavigator: Dashboard  
//   },  
//   {  
//       defaultNavigationOptions: ({ navigation }) => {  
//       return {  
//           headerLeft: (  
//             <Text>TEXTTT</Text>
//               // <Icon  
//               //     style={{ paddingLeft: 10 }}  
//               //     onPress={() => navigation.openDrawer()}  
//               //     name="md-menu"  
//               //     size={30}  
//               // />  
//           )  
//       };  
//       }  
//   }  
// );  

// const AppDrawerNavigator = createDrawerNavigator({  
//   Dashboard: {  
//       screen: DashboardStackNavigator  
//   },  
//   // Welcome: {  
//   //     screen: WelcomeStackNavigator  
//   // },  
// });  



export default Stack