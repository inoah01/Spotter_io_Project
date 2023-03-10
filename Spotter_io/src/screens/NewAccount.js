import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewAccount() {
  // Saves correctly saves user data in object, ready for API call?
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    password: "",
    confirmPassword: "",
  });

  // For hiding user's password
  const [showPassword, setShowPassword] = useState(false);

  // For handling phone number formatting (...eventually)

  // For checking if submitted (test output)
  const [isSubmitted, setIsSubmitted] = useState("");

  // Toggling password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = () => {
    // Create account logic will go here:
    // Validating passwords match
    if (signupInfo.password !== signupInfo.confirmPassword) {
      console.log("Passwords do not match, populate alert message");
    } else {
      //Test output, API auth logic will go here
      console.log("Passwords match, make API call");
      //Test Outputs
      console.log(signupInfo);
      setIsSubmitted(true);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome to Spotter.io!</Text>
      <Text style={styles.createAccountTitle}>Let's create your account:</Text>
      <Text style={styles.instructions}>
        Please complete the fields below, biometrics and fitness goals will be
        entered later!
      </Text>
      {/* For first name field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={signupInfo.firstName}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, firstName: text });
            signupInfo.firstName;
          }}
        />
      </View>
      {/* For Last Name field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={signupInfo.lastName}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, lastName: text });
          }}
        />
      </View>
      {/* Phone number field will go here */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          input
          placeholder="XXX-XXX-XXXX"
          value={signupInfo.phoneNum}
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, phoneNum: text });
          }}
          mask={"([000])-[000]-[0000]"}
        />
      </View>
      {/* Email field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your.Email@example.com"
          value={signupInfo.email}
          keyboardType="email-address"
          onChangeText={(text) => {
            setSignupInfo({ ...signupInfo, email: text });
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
      {/* Create a re-enter password field and function to check if passwords match */}
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
      {isSubmitted && (
        <Text style={styles.successMessage}>Info Successfully Submitted!!</Text>
      )}
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
