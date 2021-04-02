import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { db, auth } from "../firebase";
const ChatScreen = ({ navigation, route }) => {
  const [input, setinput] = useState("");
  const [message, setmessage] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrO43xHSa6I2eFXoXgA1lsqJQwrGSZrXE7w&usqp=CAU",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: 80,
            marginRight: 20,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={navigation.goBack}
          >
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={navigation.goBack}
          >
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  const sendMessages = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((sn) =>
        setmessage(sn.docs.map((d) => ({ id: d.id, data: d.data() })))
      );
    return unsubscribe;
  }, [route]);

  return (
    <View>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={{ padding: 15 }}>
          {message.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            ) : (
              <View style={styles.sender}>
                <Avatar />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            value={input}
            onChangeText={(text) => setinput(text)}
            placeholder="Input Message"
            style={styles.textInput}
            onSubmitEditing={sendMessages}
          ></TextInput>
          <TouchableOpacity onPress={sendMessages}>
            <Ionicons name="send" size={24} color="dodgerblue" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    bottom: 0,
    justifyContent: "end",
    height: 40,
  },
  textInput: {
    height: 40,
    flex: 1,
    marginRight: 15,

    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciever: {
    padding: 10,
    backgroundColor: "#8432BB",
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "90%",
    maxHeight: 50,
    position: "relative",
  },
  recieverText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  sender: {
    padding: 15,
    backgroundColor: "#EFEFEF",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,

    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  senderText: {
    color: "black",
    fontSize: 15,
  },
});
