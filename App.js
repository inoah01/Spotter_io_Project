import { StatusBar } from "expo-status-bar";
import React, { createElement } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Workout from "./components/workout";

const NewExerciseButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={styles.newExerciseContainer}
    >
      <Text style={styles.appButtonsText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        {/* Today's Workout  */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>

          <View style={styles.items}>
            {/* This is where the Exercises will go */}
            <Workout text={"Barbell Back Squats"} />
            <Workout text={"Romanian Deadlifts"} />
            <Workout text={"Dumbell Walking Lunges"} />
            <Workout text={"Lying Hamstring Curls"} />
            <Workout text={"Seated Calf Raises"} />
          </View>

          <View>
            {/* TO-DO: Replace with custom button. Rectangle with '+' circle on left side */}
            <NewExerciseButton title="New Exercise" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  items: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  appButtonsText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  newExerciseContainer: {
    backgroundColor: "#55BCF6",
    elevation: 8,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
