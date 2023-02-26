import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import Settings from "./Settings";
import WorkoutLog from "./screens/WorkoutLog";

const Drawer = createDrawerNavigator();

const YourApp = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="New Workout" component={WorkoutLog} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default YourApp;
