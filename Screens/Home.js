import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CustomList from "../Components/CustomList";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";
const Home = ({ navigation }) => {
  const [chats, setchats] = useState([]);
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("login");
    });
  };

  useEffect(() => {
    const unsubsribe = db
      .collection("chats")
      .onSnapshot((snp) =>
        setchats(snp.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    return unsubsribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: auth.currentUser.displayName,

      headerStyle: {
        flex: 1,
        background: "white",
      },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri:
                  auth.currentUser.photoUrl ||
                  "data:image/png;base64,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",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("NewChat")}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "flex-end" }}
            onPress={navigation.openDrawer}
          >
            <Icon name="bars" type="antdesign" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <View>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomList
            key={id}
            id={id}
            chatName={chatName}
            enterchat={enterChat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
