import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";
import ChatList from "../../components/ChatList";

const ChatRoom = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [updateScreen, setUpdateScreen] = useState(false);

  const [user, setUser] = useState(null);
  const [isModalVisibel, setIsModalVisibel] = useState(false);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;

    setUser(hasUser);
  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection("MESSAGE_THREADS")
        .orderBy("lastMessage.createdAt", "desc")
        .limit(10)
        .get()
        .then((snapshot) => {
          const threads = snapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              name: "",
              lastMessage: { text: "" },
              ...documentSnapshot.data(),
            };
          });

          if (isActive) {
            setThreads(threads);
            setLoading(false);
          }
        });
    }

    getChats();

    return () => {
      isActive = false;
      setUpdateScreen(!updateScreen);
    };
  }, [isFocused, updateScreen]);

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.log("N??o possui nenhum usu??rio", error);
      });
  }

  async function deleteRoom(roomId) {
    await firestore().collection("MESSAGE_THREADS").doc(roomId).delete();

    setUpdateScreen(!updateScreen);
  }

  function handleDeleteRoom(ownerId, roomId) {
    if (ownerId !== user?.uid) return;

    Alert.alert("Aten????o", "Voc?? tem certeza que deseja deletar essa sala?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Deletar",
        onPress: () => deleteRoom(roomId),
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>
        <View style={styles.headerRoomLeft}>
          {user && (
            <TouchableOpacity onPress={handleSignOut}>
              <Icon name="arrow-back" size={28} color="#FFF" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Icon name="search" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatList
            data={item}
            deleteRoom={() => handleDeleteRoom(item.owner, item._id)}
            userStatus={user}
          />
        )}
      />

      <FabButton setVisible={() => setIsModalVisibel(true)} userStatus={user} />

      <Modal visible={isModalVisibel} animationType="fade" transparent={true}>
        <ModalNewRoom
          setVisible={() => setIsModalVisibel(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
