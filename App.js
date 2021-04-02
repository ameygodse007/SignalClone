import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import ChatScreen from "./Screens/ChatScreen";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import "react-native-gesture-handler";
import Home from "./Screens/Home";
import Newchat from "./Screens/Newchat";
import { Button } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

const globaloptions = {
  headerStyle: { backgroundColor: "dodgerblue" },
  headerTitleStyle: { color: "white" },
};
const Stack = createStackNavigator();
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
export default function App({ navigation }) {
  return (
    <PaperProvider>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator screenOptions={globaloptions} initialRouteName="login">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewChat" component={Newchat} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0,
  },
  body: {
    flex: 1,
    alignItems: "flex-start",
    height: 20,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10,
    width: "50%",
  },
});
