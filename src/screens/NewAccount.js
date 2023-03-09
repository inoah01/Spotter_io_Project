import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewAccount() {
  // Constants may need to be re-worked for mongo db integration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reEnterPassword, setReEnterPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateAccount = () => {
    // Create account logic will go here
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
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      {/* For Last Name field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      {/* Email field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      {/* Password field */}
      {/* Criteria for password: x characters? upper/lower case? special characters? -> Function to check if it does + bullet points above describing criteria  */}
      {/* <View style={styles.listContainer}>
        <Text>Password Requirements:</Text>
        <FlatList
          data={[
            { key: "Must be 10-12 characters" },
            {
              key: "Must contain at least one uppercase and one lowercase letter",
            },
            { key: "Must include at least one non-alphanumeric character" },
          ]}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {"\u2B24" + " "}
              {item.key}
            </Text>
          )}
        />
      </View> */}
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
      {/* Create a re-enter password field and function to check if passwords match */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          secureTextEntry={!showPassword}
          value={reEnterPassword}
          onChangeText={(text) => setReEnterPassword(text)}
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
