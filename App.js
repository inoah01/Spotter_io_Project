import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import MainStackNavigator from "./src/navigator/StackNavigator";
// Importing Screens
import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import WorkoutLog from "./src/screens/WorkoutLog";
import TestPage from "./src/screens/TestPage";
import LogIn from "./src/screens/LogIn";
import NewAccount from "./src/screens/NewAccount";
import ForgotPassword from "./src/screens/ForgotPassword";

const Drawer = createDrawerNavigator();

const YourApp = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Log In"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Log In" component={LogIn} />
        <Drawer.Screen name="Forgot Password" component={ForgotPassword} />
        <Drawer.Screen name="New Account" component={NewAccount} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="New Workout" component={WorkoutLog} />
        <Drawer.Screen name="Test Page" component={TestPage} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default YourApp;
