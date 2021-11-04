import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const ModalNewRoom = ({ setVisible }) => {
  const [roomName, setRoomName] = useState("");

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

        <TouchableOpacity style={styles.buttonCreate}>
          <Text style={styles.buttonText}>Criar sala</Text>
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
