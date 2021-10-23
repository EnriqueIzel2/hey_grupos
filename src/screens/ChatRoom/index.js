import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatRoom = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Chat Room</Text>
      <Button title="Login" onPress={() => navigation.navigate("SignIn")} />
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
