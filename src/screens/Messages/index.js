import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Feather from "react-native-vector-icons/Feather";

import ChatMessage from "../../components/ChatMessage";

const Messages = ({ route }) => {
  const { thread } = route.params;
  const user = auth().currentUser.toJSON();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: "",
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.diplayName,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, []);

  async function handleSendMessage() {
    console.log("handleSendMessage");
    if (input.length <= 0) {
      console.log("campo vazio");
      return;
    }

    await firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .add({
        text: input,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName,
        },
      });

    await firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .set(
        {
          lastMessage: {
            text: input,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
        },
        {
          merge: true,
        }
      );

    setInput("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatMessage data={item} />}
        inverted={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "100%" }}
        keyboardVerticalOffset={100}
      >
        <View style={styles.containerInput}>
          <View style={styles.mainContainerInput}>
            <TextInput
              placeholder="Mensagem"
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
              multiline={true}
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity onPress={handleSendMessage}>
            <View style={styles.buttonContainer}>
              <Feather name="send" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInput: {
    flexDirection: "row",
    margin: 10,
    alignItems: "flex-end",
  },
  mainContainerInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 130,
    minHeight: 48,
  },
  buttonContainer: {
    backgroundColor: "#51c880",
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});

export default Messages;
