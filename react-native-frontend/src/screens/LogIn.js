import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../hooks/useAuth";
import {userLogin} from "../services/api/api_utils";
import {storeToken} from "../services/deviceStorage";


export default function LogIn({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let user;
    try {
      const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
      );
      user = userCredential.user;
      console.log(typeof user);
    } catch (error) {
      // TODO: Complete error handling for failed firebase authentication
      //  - Email/Password incorrect?
      //  - User not found?
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      console.log("user log in error", errorCode, errorMessage);
      return;
    }

    // axios request to send Firebase token to backend for verification + storage of token upon success:
    try {
      await userLogin(user);
      const idToken = await user.getIdToken();
      await storeToken(idToken);
    } catch (error) {
      console.error("Error during login: ", error);
    }

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
