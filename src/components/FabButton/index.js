import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FabButton = ({ setVisible }) => {
  function handleNavigateButton() {
    setVisible();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleNavigateButton}
      style={styles.container}
    >
      <View>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2E54D4",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    right: "6%",
  },

  buttonText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FabButton;
