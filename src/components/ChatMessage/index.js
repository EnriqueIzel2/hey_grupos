import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";

const ChatMessage = ({ data }) => {
  const user = auth().currentUser.toJSON();
  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid;
  }, [data]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage ? "#DCF8C5" : "#fff",
            marginLeft: isMyMessage ? 50 : 0,
            marginRight: isMyMessage ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage && (
          <Text style={styles.name}>{data?.user?.displayName}</Text>
        )}

        <Text style={styles.message}>{data.text}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  messageBox: {
    borderRadius: 4,
    padding: 10,
  },

  name: {
    color: "#F53745",
    fontWeight: "bold",
    marginBottom: 5,
  },

  message: {},
});
