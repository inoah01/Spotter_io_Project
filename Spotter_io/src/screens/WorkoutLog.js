import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
// import { SafeAreaView } from "react-native-safe-area-context"; <-- Look into: Worth it, advantage over plain view?
import Workout from "../../components/workout";

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

// NEEDS IMPLEMENTATION, add "onPress" back to function arguments
const SaveWorkoutButton = ({ title }) => {
  return (
    <TouchableOpacity
      // onPress={onPress}
      activeOpacity={0.5}
      style={styles.saveWorkoutContainer}
    >
      <Text style={styles.appButtonsText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function WorkoutLog() {
  const [exerciseList, setExerciseList] = useState([
    "Barbell Back Squats",
    "Romanian Deadlifts",
    "Dumbbell Walking Lunges",
    "Lying Hamstring Curls",
    "Seated Calf Raises",
  ]);

  const handleNewExercise = () => {
    setExerciseList([...exerciseList, "New Exercise"]);
  };

  const handleDeleteExercise = () => {
    setExerciseList(exerciseList.slice(0, -1));
  };
  // // Implementation for save exercise button
  // const handleSaveWorkout = () => {

  // }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        {/* Today's Workout  */}
        <View style={styles.tasksWrapper}>
          <TextInput numberOfLines={1} style={styles.sectionTitle}>
            Today's Workout
          </TextInput>

          <ScrollView style={styles.ScrollView}>
            <View onStartShouldSetResponder={() => true}>
              <View styles={styles.items}>
                {/* This is where the Exercises will go */}
                {exerciseList.map((exercise, index) => (
                  <Workout key={index} text={exercise} />
                ))}
              </View>
            </View>
            <View style={styles.exerciseButtons}>
              <NewExerciseButton
                onPress={handleNewExercise}
                title="New Exercise"
              />
              <DeleteExerciseButton
                onPress={handleDeleteExercise}
                title="Delete Exercise"
              />
              <SaveWorkoutButton
                // onPress={handleSaveWorkout}
                title="Save Workout"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    marginBottom: 10,
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "pink",
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
  saveWorkoutContainer: {
    backgroundColor: "#08c41b",
    elevation: 8,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
  },
  exerciseButtons: {
    backgroundColor: "yellow",
    // flex: 1,
    // verticalAlign: "center",
    // justifyContent: "flex-end",
    paddingTop: 10,
    marginTop: 40,
    marginBottom: 40,
    paddingBottom: 10,
  },
});
