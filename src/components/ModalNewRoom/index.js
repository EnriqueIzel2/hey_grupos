import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ModalNewRoom = ({ setVisible, setUpdateScreen }) => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const user = auth().currentUser.toJSON();

  function handleCreateRoom() {
    if (roomName === "") {
      alert("Preencha o campo com o nome do sala");
      return;
    }

    setLoading(true);

    createRoom();
  }

  function createRoom() {
    firestore()
      .collection("MESSAGE_THREADS")
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado. Bem vindo(a)`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then((docRef) => {
        docRef
          .collection("MESSAGES")
          .add({
            text: `Grupo ${roomName} criado. Bem vindo(a)`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setVisible();
            setUpdateScreen();
            setLoading(false);
          });
      })
      .catch((error) => {
        alert("Ocorreu um erro. Tente novamente");
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal}></View>
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Criar um Novo Grupo</Text>
        <TextInput
          style={styles.input}
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          placeholder="Nome para sua sala"
        />

        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={handleCreateRoom}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar Sala</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={setVisible}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(34, 34, 34, 0.4)",
  },

  modal: {
    flex: 1,
  },

  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 14,
  },

  input: {
    borderRadius: 4,
    height: 45,
    backgroundColor: "#ddd",
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 15,
  },

  buttonCreate: {
    borderRadius: 4,
    backgroundColor: "#2e54d4",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
  },

  backButton: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    alignSelf: "center",
  },
});

export default ModalNewRoom;
