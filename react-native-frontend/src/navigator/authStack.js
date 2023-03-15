import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import NewAccount from "../screens/NewAccount";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="New Account" component={NewAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
