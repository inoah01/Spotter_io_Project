import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ForgotPassword from "./ForgotPassword";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Log in logic will go here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome to Spotter.io!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={toggleShowPassword}
        >
          <Text style={styles.showPasswordButtonText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => navigation.navigate(ForgotPassword)}
      >
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 8,
  },
  showPasswordButton: {
    paddingHorizontal: 12,
  },
  showPasswordButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "blue",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
