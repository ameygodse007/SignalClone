import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((authu) => {
      console.log(authu);
      if (authu) {
        navigation.replace("Home");
      }
    });

    return unsubsribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Image
        source={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputholder}>
        <Input
          value={email}
          onChangeText={(text) => setemail(text)}
          placeholder="Email"
          autofocus
          type="email"
        />
        <Input
          value={password}
          onChangeText={(text) => setpassword(text)}
          placeholder="Password"
          secureTextEntry
          type="password"
          onSubmitEditing={signIn}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={signIn} title="Login" />
        <View style={{ height: 10 }}></View>
        <Button
          onPress={() => navigation.navigate("Register")}
          title="Register"
          type="outline"
        />
      </View>
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default Login;

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
    width: 200,
    marginTop: 10,
    paddingTop: 10,
  },
});
