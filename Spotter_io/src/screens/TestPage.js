import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const TestOpacity = ({ title }) => {
  return (
    <TouchableOpacity>
      activeOpacity={0.5}
      style={styles.newExerciseContainer}
      <Text style={styles.appButtonsText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function TestPage() {
  return (
    <View style={styles.container}>
      <View style={styles.exerciseButtons}>
        <TestOpacity title="New Exercise" />
      </View>
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
  newExerciseContainer: {
    backgroundColor: "#55BCF6",
    elevation: 8,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
  },
  appButtonsText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
