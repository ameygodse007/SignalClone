import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const Register = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [contact, setcontact] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(
        email.toString().trim(),
        password.toString().trim()
      )
      .then((authu) => {
        authu.user.updateProfile({ displayName: username, photoUrl: contact });
      })
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text style={{ fontSize: 20 }} h2 style={{ marginBottom: 50 }}>
        Create a new account
      </Text>
      <View style={styles.inputholder}>
        <Input
          value={username}
          onChangeText={(text) => setusername(text)}
          placeholder="Username"
          autofocus
          type="text"
        />
        <Input
          value={email}
          onChangeText={(text) => setemail(text)}
          placeholder="Email"
          autofocus
          type="email"
        />
        <Input
          value={contact}
          onChangeText={(text) => setcontact(text)}
          placeholder="ImageUrl"
          autofocus
          type="text"
        />
        <Input
          value={password}
          onChangeText={(text) => setpassword(text)}
          placeholder="Password"
          secureTextEntry
          type="password"
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        style={styles.button}
        onPress={register}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputholder: {
    width: 300,
  },
  button: {
    width: 300,
  },
});
