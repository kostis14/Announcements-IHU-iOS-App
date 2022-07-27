import axios from "axios";
import { useAuthRequest, exchangeCodeAsync } from "expo-auth-session";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
function Login({ navigation, route }) {
  //Credentials for the login
  const cID = "";
  const cSecret = "";

  //Request the access token
  const discovery = {
    authorizationEndpoint: "https://login.iee.ihu.gr/authorization",
    tokenEndpoint: "https://login.iee.ihu.gr/token",
  };

  //Request the access token
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: cID,
      response_type: "code",
      scopes: ["announcements,profile,notifications"],
      redirectUri: "exp://192.168.1.2:19000",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      axios
        .post("https://login.iee.ihu.gr/token", {
          client_id: cID,
          client_secret: cSecret,
          grant_type: "authorization_code",
          code: code,
        })
        .then((res) => {
          navigation.replace("HomeScreen", {
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
            cID: cID,
            cSecret: cSecret,
          });
        });
    }
  }, [response]);
  return (
    <View style={styles.container}>
      <View style={styles.staticContainer}>
        <Avatar.Image
          theme={{ colors: "primary" }}
          size={140}
          source={require("../assets/ieeeihulogo.png")}
        />
        <View style={styles.textContainer}>
          <View style={styles.department}>
            <Text style={styles.textMain}>
              International Hellenic University
            </Text>
            <Text style={styles.text}>Department of Information and</Text>
            <Text style={styles.text}>Electronic Engineering</Text>
          </View>
        </View>
      </View>
      <Button
        disabled={!request}
        icon="school"
        mode="contained"
        color="#fff"
        onPress={() => {
          promptAsync();
        }}
      >
        LOGIN
      </Button>
      {/* <Button
        disabled={!request}
        icon="school"
        mode="contained"
        color="#fff"
        onPress={() => {
          navigation.replace("HomeScreen", {});
        }}
      >
        CONTINUE WITHOUT LOGIN
      </Button> */}
    </View>
  );
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#363636",
    width: "100%",
  },
  staticContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textMain: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  department: {
    alignItems: "center",
    justifyContent: "center",
  },
});
