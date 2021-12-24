import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const Search = () => {
  const isFocused = useIsFocused();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocused]);

  async function handleSearch() {
    if (search === "") return;

    const responseSearch = await firestore()
      .collection("MESSAGE_THREADS")
      .where("name", ">=", search)
      .where("name", "<=", search + "\uf8ff")
      .get()
      .then((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: "",
            lastMessage: { text: "" },
            ...documentSnapshot.data(),
          };
        });

        setChats(threads);
        console.log(threads);
        setSearch("");
        Keyboard.dismiss();
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Digite o nome da sala"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
          <MaterialIcons name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 14,
  },
  input: {
    backgroundColor: "#EBEBEB",
    marginLeft: 10,
    height: 50,
    width: "80%",
    borderRadius: 4,
    padding: 5,
  },
  buttonSearch: {
    backgroundColor: "#2e54e4",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    marginLeft: 5,
    marginRight: 10,
  },
});

export default Search;
