import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
const Newchat = ({ navigation }) => {
  const [input, setinput] = useState("");

  const creatChat = async () => {
    await db
      .collection("chats")
      .add({ chatName: input })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: "Newchat", headerBackTitle: "Chats" });
  }, [navigation]);
  return (
    <View>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setinput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <View style={{ height: 50 }} />
      <Button
          style={{
            width: 200,
            flex: 1,
            alignItems: "center",
            
          }}
          onPress={creatChat}
          title="Create new chat"
        />
    </View>
  );
};

export default Newchat;

const styles = StyleSheet.create({});
