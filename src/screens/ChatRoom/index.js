import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import { Container } from './styles';

const ChatRoom = () => {
  return (
    <View style={styles.container}>
      <Text>Chat Room</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatRoom;
