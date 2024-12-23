// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from './screens/HomeScreen';
// import MembershipScreen from './screens/MembershipScreen';
// import SellScreen from './screens/SellScreen';
// import OrdersScreen from './screens/OrdersScreen';
// import SparePartsScreen from './screens/SparePartsScreen';
// import { Ionicons } from '@expo/vector-icons'; // Icons for the bottom tab

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             switch (route.name) {
//               case 'Home':
//                 iconName = 'home';
//                 break;
//               case 'Membership':
//                 iconName = 'card';
//                 break;
//               case 'Sell':
//                 iconName = 'cart';
//                 break;
//               case 'Orders':
//                 iconName = 'list';
//                 break;
//               case 'SpareParts':
//                 iconName = 'cog';
//                 break;
//               default:
//                 iconName = 'circle';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Membership" component={MembershipScreen} />
//         <Tab.Screen name="Sell" component={SellScreen} />
//         <Tab.Screen name="Orders" component={OrdersScreen} />
//         <Tab.Screen name="SpareParts" component={SparePartsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }





// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons'; // Icons for the bottom tab
// import HomeScreen from './screens/HomeScreen';
// import MembershipScreen from './screens/MembershipScreen';
// import SellScreen from './screens/SellScreen';
// import OrdersScreen from './screens/OrdersScreen';
// import SparePartsScreen from './screens/SparePartsScreen';
// import ProfileScreen from './screens/ProfileScreen'; // Import the profile screen

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="Home" 
//         component={HomeScreen} 
//         options={{ headerShown: true }} // Show header for HomeScreen
//       />
//       <Stack.Screen 
//         name="Profile" 
//         component={ProfileScreen} 
//         options={{ title: 'Profile' }} // Title for Profile screen
//       />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             switch (route.name) {
//               case 'Home':
//                 iconName = 'home';
//                 break;
//               case 'Membership':
//                 iconName = 'card';
//                 break;
//               case 'Sell':
//                 iconName = 'cart';
//                 break;
//               case 'Orders':
//                 iconName = 'list';
//                 break;
//               case 'SpareParts':
//                 iconName = 'cog';
//                 break;
//               default:
//                 iconName = 'circle';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeStack} />
//         <Tab.Screen name="Membership" component={MembershipScreen} />
//         <Tab.Screen name="Sell" component={SellScreen} />
//         <Tab.Screen name="Orders" component={OrdersScreen} />
//         <Tab.Screen name="SpareParts" component={SparePartsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }












// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./screens/HomeScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import MembershipScreen from "./screens/MembershipScreen";
// import SellScreen from "./screens/SellScreen";
// import OrdersScreen from "./screens/OrdersScreen";
// import SparePartsScreen from "./screens/SparePartsScreen";
// import { createStackNavigator } from "@react-navigation/stack";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeStack} />
//         <Tab.Screen name="Membership" component={MembershipScreen} />
//         <Tab.Screen name="Sell" component={SellScreen} />
//         <Tab.Screen name="Orders" component={OrdersScreen} />
//         <Tab.Screen name="SpareParts" component={SparePartsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }














import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MembershipScreen from './screens/MembershipScreen';
import SellScreen from './screens/SellScreen';
import OrdersScreen from './screens/OrdersScreen';
import SparePartsScreen from './screens/SparePartsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Icons for the bottom tab

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Membership':
                iconName = 'card';
                break;
              case 'Sell':
                iconName = 'cart';
                break;
              case 'Orders':
                iconName = 'list';
                break;
              case 'SpareParts':
                iconName = 'cog';
                break;
              default:
                iconName = 'circle';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Membership" component={MembershipScreen} />
        <Tab.Screen name="Sell" component={SellScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="SpareParts" component={SparePartsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
