import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import TestPage from "../screens/TestPage";
import Settings from "../screens/Settings";
import WorkoutLog from "../screens/WorkoutLog";

const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Workout Log" component={WorkoutLog} />
        <Drawer.Screen name="Test Page" component={TestPage} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
