import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ChatRoom = () => {
  const navigation = useNavigation();

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
