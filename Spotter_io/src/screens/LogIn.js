import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../hooks/useAuth";
import axios, { formToJSON } from "axios";
import deviceStorage from "../services/deviceStorage";
import { user_login } from "../services/api/api_utils";

export default function LogIn({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState("");

  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user state set");
        setEmail(user.email);
        setFirebaseToken(user.getIdToken);
        console.log(user.email);
        user_login({
          firebase_token: user.getIdToken,
          email: user.email,
        });
      })
      // .then((userInfo) => {
      //   // Logic for checking with db
      // });
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        console.log("user log in error");
      });
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
        onPress={() => navigation.navigate("Forgot Password")}
        activeOpacity={0.5}
      >
        <Text style={{ color: "blue" }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.newUserButton}
        onPress={() => navigation.navigate("New Account")}
      >
        <Text style={styles.loginButtonText}>Create Account</Text>
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
    marginHorizontal: 10,
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
  newUserButton: {
    backgroundColor: "grey",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
  },
});
