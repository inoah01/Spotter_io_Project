import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Workout = (props) => {
  const [sets, onChangeSets] = React.useState("");
  const [reps, onChangeReps] = React.useState("");

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <TextInput style={styles.itemText}>{props.text}</TextInput>
      </View>

      <View style={styles.setsAndReps}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSets}
          value={sets}
          placeholder="Sets"
          keyboardType="numeric"
        ></TextInput>
        <Text style={styles.xDivide}>x</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeReps}
          value={reps}
          placeholder="Reps"
          keyboardType="numeric"
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    // Will ensure that left and right 'buttons' will be placed on either end of container
    justifyContent: "space-between",
    marginBottom: 20,
  },
  setsAndReps: {
    flexDirection: "row",
  },
  xDivide: {
    marginTop: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "80%",
  },
  input: {
    width: 34,
    height: 20,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5,
    // TO-DO: Fix background color
    backgroundColor: "#E8EAED",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
});

export default Workout;
