import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as React from "react";
import * as AuthSession from "expo-auth-session";

import axios from "axios";
import {
  ActivityIndicator,
  Button,
  DataTable,
  Divider,
  Snackbar,
  Portal,
  Modal,
} from "react-native-paper";
import Announcement from "./components/Announcement";
import Tag from "./components/Tag";

function HomeScreen({ route, navigation }) {
  const { accessToken, refreshToken, cID, cSecret } = route.params;
  const [token, setToken] = React.useState(accessToken);
  const [refresh, setRefresh] = React.useState(refreshToken);
  const [announcements, setAnnouncements] = React.useState();

  const [allTags, setAlltags] = React.useState([]);
  const [lastPage, getLastPage] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [tags, setTags] = React.useState("");

  function onPrevious() {
    if (lastPage == page) {
      setPage(lastPage);

      return;
    }
    setPage(page + 1);
  }
  function onNext() {
    setPage(page - 1);
  }

  React.useEffect(() => {
    setAnnouncements([]);
    getAnnouncements(page, tags);
  }, [page]);

  React.useEffect(() => {
    getTags();
  }, []);

  //Refresh the access token
  React.useEffect(() => {
    const g = setTimeout(() => {
      accessToken ? clearTimeout(g) : refreshCurrentToken(g);
    }, 120000);
  }, [token]);

  //Starter function for the Announcements
  React.useEffect(() => {
    getAnnouncements(page, tags);
  }, []);

  //get all tags
  function getTags() {
    axios
      .get("https://aboard.iee.ihu.gr/api/subscribetags", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setAlltags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Get the announcements
  function getAnnouncements(page, tags) {
    axios
      .get(
        `https://aboard.iee.ihu.gr/api/announcements/?page=${page}${
          tags ? "&" + tags : ""
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        getLastPage(res.data.meta.last_page);
        setAnnouncements(res.data.data);
      });
  }

  React.useEffect(() => {
    setTags(route.params.tags);
    setPage(1);
    setRefreshing(true);

    getAnnouncements(1, route.params.tags);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [route.params]);

  //Refresh announcements
  const [refreshing, setRefreshing] = React.useState(false);
  function onRefresh() {
    setRefreshing(true);
    setPage(1);
    setTags(route.params.tags);
    getAnnouncements(1, tags);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function logOut() {
    navigation.replace("Login");
    axios
      .get(`https://aboard.iee.ihu.gr/api/auth/logout`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        AuthSession.dismiss();
      });
  }

  //Refresh the access token
  async function refreshCurrentToken(g) {
    axios
      .post("https://login.iee.ihu.gr/token", {
        grant_type: "refresh_token",
        code: refresh,
        client_id: cID,
        client_secret: cSecret,
      })
      .then((res) => {
        //set the new token
        setToken(res.data.access_token);
        //set the new refresh token
        setRefresh(res.data.refresh_token);
        clearTimeout(g);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View
      style={{
        paddingBottom: 100,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <Button
          style={styles.logOut}
          mode="contained"
          labelStyle={{
            color: "#fff",
            flexDirection: "row",
            fontSize: 12,
          }}
          onPress={logOut}
        >
          EXIT
        </Button>
        <Button
          icon={"tag-multiple"}
          mode="contained"
          style={{
            backgroundColor: "#00bcd4",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          labelStyle={{
            color: "#fff",
            flexDirection: "row",
            fontSize: 12,
          }}
          onPress={() =>
            navigation.navigate("TagSelector", {
              navigation: navigation,
              allTags: allTags,
            })
          }
        >
          TAGS
        </Button>
        {page == 1 ? (
          <Text></Text>
        ) : (
          <Button
            style={styles.buttonStyle}
            icon="arrow-left"
            mode="contained"
            onPress={onNext}
            labelStyle={{
              color: "#fff",
              flexDirection: "row",
              fontSize: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Button>
        )}
        {page == lastPage ? (
          <Text></Text>
        ) : (
          <Button
            style={styles.buttonStyle}
            icon="arrow-right"
            mode="contained"
            onPress={onPrevious}
            contentStyle={{
              color: "#fff",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
            labelStyle={{
              flexDirection: "row",
              fontSize: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Button>
        )}
      </View>

      <Divider />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={announcements}
        renderItem={({ item }) => (
          <Announcement
            title={item.title}
            body={item.body}
            date={item.created_at}
            author={item.author.name}
            navigation={navigation}
            attachment={item.attachments[0]}
          />
        )}
      />

      <ActivityIndicator
        animating={true}
        size="large"
        style={{
          marginTop: "50%",
        }}
      />
    </View>
  );
}
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default HomeScreen;

const styles = StyleSheet.create({
  logOut: {
    alignSelf: "center",
    backgroundColor: "#ff0000",
    marginRight: "auto",
  },

  buttonStyle: {
    margin: 10,
    backgroundColor: "#284168",
    color: "white",
  },
});
