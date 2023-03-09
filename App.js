import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// Importing Screens
import Home from "./Home";
import Settings from "./Settings";
import WorkoutLog from "./screens/WorkoutLog";
import TestPage from "./TestPage";
import LogIn from "./LogIn";
import NewAccount from "./NewAccount";
import ForgotPassword from "./ForgotPassword";

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
