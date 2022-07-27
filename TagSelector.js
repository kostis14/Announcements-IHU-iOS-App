import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Checkbox, Divider, List } from "react-native-paper";
import Tag from "./components/Tag";
import SelectMultiple from "react-native-select-multiple";
function TagSelector({ navigation, route }) {
  const [tag, setTag] = React.useState([]);
  const [checkedTags, setCheckedTags] = React.useState([]);

  const goBack = () => {
    navigation.navigate("HomeScreen", {
      tags: tag.join(""),
    });
  };

  const addTag = (item) => {
    if (tag.includes("&tags[]=" + item.id)) {
      setTag(tag.filter((n) => n !== "&tags[]=" + item.id));
      setCheckedTags(checkedTags.filter((n) => n !== "checked" + item.id));
      return;
    }

    setCheckedTags([...checkedTags, "checked" + item.id]);
    setTag(+"&tags[]=" + item.id);
    setTag([...tag, "&tags[]=" + item.id]);
  };

  return (
    <View
      style={{
        textAlign: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <View
        style={{
          height: 500,
          padding: 10,
          justifyContent: "center",
        }}
      >
        <List.Item
          title={route.params.allTags[0].title}
          onPress={() => {
            addTag({ id: 1 });
          }}
          style={{
            backgroundColor: checkedTags.includes("checked1")
              ? "#00bcd4"
              : "white",
          }}
        />

        <FlatList
          data={route.params.allTags[0].childrensub_recursive}
          ItemSeparatorComponent={() => (
            <Divider
              bold={true}
              style={{
                shadowColor: "black",
                shadowOffset: { width: 10, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 10,
              }}
            />
          )}
          renderItem={({ item }) =>
            item.childrensub_recursive.length > 0 ? (
              <View>
                <Divider />
                <List.Accordion
                  title={item.title}
                  left={(props) => (
                    <List.Icon {...props} icon="book-open-page-variant" />
                  )}
                >
                  <FlatList
                    data={item.childrensub_recursive}
                    renderItem={({ item }) => {
                      return (
                        <List.Item
                          title={item.title}
                          onPress={() => addTag(item)}
                          style={{
                            backgroundColor: checkedTags.includes(
                              "checked" + item.id
                            )
                              ? "#00bcd4"
                              : "white",
                          }}
                        />
                      );
                    }}
                  />
                </List.Accordion>
              </View>
            ) : (
              <List.Item
                title={item.title}
                onPress={() => addTag(item)}
                style={{
                  backgroundColor: checkedTags.includes("checked" + item.id)
                    ? "#00bcd4"
                    : "white",
                }}
              />
            )
          }
          keyExtractor={(item) => item.id}
        />
      </View>
      <Button
        onPress={goBack}
        icon={"filter"}
        mode="contained"
        contentStyle={{
          width: 350,
        }}
        style={{
          backgroundColor: "#00bcd4",
          margin: 20,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        FILTER...
      </Button>
    </View>
  );
}

export default TagSelector;
