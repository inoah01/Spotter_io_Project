import { StatusBar } from "expo-status-bar";
import React, { createElement, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

const DeleteExerciseButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={styles.deleteExerciseContainer}
    >
      <Text style={styles.appButtonsText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [exerciseList, setExerciseList] = useState([
    "Barbell Back Squats",
    "Romanian Deadlifts",
    "Dumbell Walking Lunges",
    "Lying Hamstring Curls",
    "Seated Calf Raises",
  ]);

  const handleNewExercise = () => {
    setExerciseList([...exerciseList, "New Exercise"]);
  };

  const handleDeleteExercise = () => {
    setExerciseList(exerciseList.slice(0, -1));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        {/* Today's Workout  */}
        <View style={styles.tasksWrapper}>
          <TextInput style={styles.sectionTitle}>Today's Workout</TextInput>

          <ScrollView style={styles.ScrollView}>
            <View onStartShouldSetResponder={() => true}>
              <View styles={styles.items}>
                {/* This is where the Exercises will go */}
                {exerciseList.map((exercise, index) => (
                  <Workout key={index} text={exercise} />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.exerciseButtons}>
            <NewExerciseButton
              onPress={handleNewExercise}
              title="New Exercise"
            />
            <DeleteExerciseButton
              onPress={handleDeleteExercise}
              title="Delete Exercise"
            />
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
  // ScrollView: {
  //   backgroundColor: "pink",
  // },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
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
    marginVertical: 5,
  },
  deleteExerciseContainer: {
    backgroundColor: "#FF7276",
    elevation: 8,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
  },
  // exerciseButtons: {
  //   justifyContent: "flex-end",
  //   alignItems: z
  //   position: "absolute",
  //   bottom: 0,
  // },
});
