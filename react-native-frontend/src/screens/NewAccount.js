import React, {useContext, useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../hooks/useAuth";
import {getFirebaseErrorMessage} from "../services/firebase/firebaseErrorMessages";
import {ErrorContext} from "../components/ErrorContext";
import ErrorModal from "../components/ErrorModal";
import {createUser, userLogin} from "../services/api/api_utils";
import {removeToken, storeToken} from "../services/deviceStorage";
import {BackendAuthContext} from "../components/BackendAuthContext";

export default function NewAccount() {
  // Form object for signup info
  const [signupInfo, setSignupInfo] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    phoneNum: "",
    password: "",
    confirmPassword: "",
  });
  const [createAccountMessage, setCreateAccountMessage] = useState ("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorModalKey, setErrorModalKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // For checking if submitted (test output)
  // const [isSubmitted, setIsSubmitted] = useState("");
  const { setBackendAuthStatus} = useContext(BackendAuthContext);
  const navigation = useNavigation();

  let {errorMessage, showErrorModal} = useContext(ErrorContext);

  // Toggling password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showError = (message) => {
    setCreateAccountMessage(message);
    setErrorModalVisible(true);
    setErrorModalKey(Math.random().toString());
  };

  useEffect(() => {
    if (errorMessage) {
      showError(errorMessage);
      showErrorModal(null);
    }
  }, [errorMessage, showErrorModal]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // TODO: Add implementation for checking password strength
    if (signupInfo.password !== signupInfo.confirmPassword) {
      errorMessage = "Passwords do not match";
      showError(errorMessage);
    } else {
      try {
        // First, create the user with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          signupInfo.email,
          signupInfo.password
        );
        const firebaseUser = userCredential.user;

        // Get the firebase_uid:
        const uid = firebaseUser.uid;

        // Get signup info without password and confirm password
        const { password, confirmPassword, ...signupInfoWithoutPasswords } = signupInfo;

        // Add the Firebase UID and signup info to object
        const signUpInfoWithUid = {
          firebase_uid: uid,
          ...signupInfoWithoutPasswords,
          firebaseUser
        };
        console.log("Signup info with uid: ", signUpInfoWithUid);

        // Then, create the user in the backend db
        const createUserResponse = await createUser(signUpInfoWithUid);

        if (createUserResponse.error) {
          showError(createUserResponse.error);
        } else {
          // The user was created successfully in the backend, now handle the login process
          const idToken = await firebaseUser.getIdToken();

          // Add userLogin function call (API Request), passing in firebaseUser as parameter
          try {
            const loginResponse = await userLogin(firebaseUser);
            if (loginResponse.success) {
              await storeToken(idToken);
              setBackendAuthStatus(true);
            } else {
              // Handle error response from userLogin
              await removeToken(idToken);
              const errorMessage = loginResponse.error;
              showError(errorMessage);
              console.log("Backend error: ", errorMessage);
            }
          } catch (error) {
            // Handle any error during the userLogin function call
            await removeToken(idToken);
            setBackendAuthStatus(false);
            showError(error);
            console.log("Function call error: ", error);
          }
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = getFirebaseErrorMessage(errorCode);
        showError(errorMessage);
      }
    }
  };





  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome to Spotter.io!</Text>
      <Text style={styles.createAccountTitle}>Let's create your account:</Text>
      <Text style={styles.instructions}>
        Please complete the fields below, biometrics and fitness goals will be
        entered later!
      </Text>
      {/* First name field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={signupInfo.name.firstName}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, name: { ...signupInfo.name, firstName: text } });
          }}
        />
      </View>
      {/* Last Name field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={signupInfo.name.lastName}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, name: { ...signupInfo.name, lastName: text } });
          }}
        />
      </View>
      {/* Phone number field */}
      <View style={styles.inputContainer}>
        <MaskedTextInput
          mask="(999)-999-9999"
          style={styles.input}
          placeholder="XXX-XXX-XXXX"
          value={signupInfo.phoneNum}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, phoneNum: text });
          }}
          keyboardType="phone-pad"
        />
      </View>
      {/* Email field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="your.email@example.com"
          value={signupInfo.email}
          keyboardType="email-address"
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, email: text.toLowerCase() });
          }}
        />
      </View>
      {/* Password field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={signupInfo.password}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, password: text });
          }}
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
      {/* Confirm password field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          secureTextEntry={!showPassword}
          value={signupInfo.confirmPassword}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, confirmPassword: text });
          }}
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
        onPress={() => navigation.navigate("Log In")}
        activeOpacity={0.5}
      >
        <Text style={{ color: "blue" }}>Back to Log In </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      {/*{isSubmitted && (*/}
      {/*  <Text style={styles.successMessage}>Info Successfully Submitted!!</Text>*/}
      {/*)}*/}
      <ErrorModal
        key={{errorModalKey}}
        visible={errorModalVisible}
        message={createAccountMessage}
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
    marginBottom: 25,
  },
  createAccountTitle: {
    fontSize: 18,
    marginBottom: 3,
  },
  failureMessage: {
    color: "red",
    marginTop: 10,
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
  // listContainer: {
  //   marginLeft: 0,
  // },
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
  showPasswordButton: {
    paddingHorizontal: 12,
  },
  showPasswordButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
  successMessage: {
    marginTop: 10,
  },
  // item: {
  //   flex: 1,
  //   padding: 5,
  //   fontSize: 18,
  //   height: 25,
  // },
  createAccountButton: {
    backgroundColor: "blue",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  createAccountText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
