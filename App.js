import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Avatar } from "react-native-paper";
import Login from "./components/Login";
import * as Linking from "expo-linking";
import HomeScreen from "./HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Post from "./components/Post";
import TagSelector from "./TagSelector";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#284168",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Announcements",
              headerStyle: {
                backgroundColor: "#284168",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="TagSelector"
            component={TagSelector}
            options={{
              title: "Select Tags",
              headerStyle: {
                backgroundColor: "#284168",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#284168",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
