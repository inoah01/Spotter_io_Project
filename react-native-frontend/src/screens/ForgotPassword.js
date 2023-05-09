import React, {useContext, useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import {getFirebaseErrorMessage} from "../services/firebase/firebaseErrorMessages";
import {ErrorContext} from "../components/ErrorContext";
import ErrorModal from "../components/ErrorModal";
import {BackendAuthContext} from "../components/BackendAuthContext";
import {auth} from "../hooks/useAuth";



export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalKey, setErrorModalKey] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const {setBackendAuthStatus} = useContext(BackendAuthContext);
  let {errorMessage, showErrorModal} = useContext(ErrorContext);

  const showError = (message) => {
    setForgotPasswordMessage(message);
    setErrorModalVisible(true);
    setErrorModalKey(Math.random().toString());
  };

  useEffect(() => {
    if (errorMessage) {
      showError(errorMessage);
      showErrorModal(null)
    }
  }, [errorMessage, showErrorModal]);

  const handleForgot = async (e) => {
    // TODO: Remove sendPasswordResetEmail
    e.preventDefault();
    try {
      const resetPassword = await sendPasswordResetEmail(auth, email);
      if ( await resetPassword) {
        console.log("Yes")
        // TODO: Create "success" / green modal for confirming password reset email
        //        - Remove assignment of sendPasswordResetEmail -> does not return anything, check for errors
      } else {
        console.log("No", resetPassword);
      }
    } catch (error) {
      const errorCode = error.code;
      errorMessage = getFirebaseErrorMessage(errorCode);
      showErrorModal(errorMessage);
      console.log(error);
    }

    setBackendAuthStatus(false);
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
      {/* Email field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Log In")}
        activeOpacity={0.5}
      >
        <Text style={{ color: "blue" }}>Back to Log in?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleForgot}>
        <Text style={styles.submitButtonText}>Get Email</Text>
      </TouchableOpacity>
      <ErrorModal
        key={{errorModalKey}}
        visible={errorModalVisible}
        message={forgotPasswordMessage}
        onHide={() => setErrorModalVisible(false)}/>
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