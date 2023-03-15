import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";

import Home from "../screens/Home";
import TestPage from "../screens/TestPage";
import Settings from "../screens/Settings";
import WorkoutLog from "../screens/WorkoutLog";

const Drawer = createDrawerNavigator();

export default function UserStack() {
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out Successful
        console.log("Signed out Successfully");
      })
      .catch((error) => {
        const errorCode = error.error;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={handleLogout} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="New Workout" component={WorkoutLog} options={{headerShown: false}} />
        <Drawer.Screen name="Test Page" component={TestPage} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

