import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Messages = ({ route }) => {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const user = auth().currentUser.toJSON();

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

  return (
    <View>
      <Text>Mensagens tops</Text>
    </View>
  );
};

export default Messages;
