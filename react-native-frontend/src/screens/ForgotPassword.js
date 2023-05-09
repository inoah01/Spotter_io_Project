import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgot = () => {
    // Log in logic will go here
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome to Spotter.io!</Text>
      <Text style={styles.forgotPasswordTitle}>
        You forgot your password? Let's get you back in:
      </Text>
      <Text style={styles.instructions}>
        Please enter the email associated with the account, and a password reset email
        will be sent to your inbox.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Log In")}
        activeOpacity={0.5}
      >
        <Text style={{ color: "blue" }}>Back to Log in?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleForgot}>
        <Text style={styles.submitButtonText}>Get Code</Text>
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
  instructions: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  forgotPasswordTitle: {
    fontSize: 18,
    marginBottom: 3,
    marginHorizontal: 10,
  },
  showPasswordButton: {
    paddingHorizontal: 12,
  },
  showPasswordButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "blue",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
