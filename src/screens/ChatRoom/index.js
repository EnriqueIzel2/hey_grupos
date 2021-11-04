import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";

const ChatRoom = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [isModalVisibel, setIsModalVisibel] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;

    setUser(hasUser);
  }, [isFocused]);

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.log("Não possui nenhum usuário", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          <TouchableOpacity onPress={handleSignOut}>
            <Icon name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <Icon name="search" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FabButton setVisible={() => setIsModalVisibel(true)} userStatus={user} />

      <Modal visible={isModalVisibel} animationType="fade" transparent={true}>
        <ModalNewRoom setVisible={() => setIsModalVisibel(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerRoom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#2E54D4",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  headerRoomLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    paddingLeft: 10,
  },
});

export default ChatRoom;
