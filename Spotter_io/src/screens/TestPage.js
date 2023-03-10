import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TestPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ color: "red", fontStyle: "bold" }}>
        **THIS IS A TEST PAGE FOR EXPERIMENTATION**
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Log In")}
        style={{ paddingVertical: 5 }}
      >
        <Text style={{ color: "blue" }}>Back to Log-in Screen</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
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
});
