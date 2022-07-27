import { Pressable, View } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Avatar,
} from "react-native-paper";

function Announcement(props) {
  const { title, body, date, author, navigation, attachment } = props;
  return (
    <Pressable
      onPress={() => {
        navigation.push("Post", {
          title,
          body,
          date,
          author,
          attachment,
        });
      }}
    >
      <Card
        mode="elevated"
        elevation={5}
        style={{
          margin: 10,
        }}
      >
        <Card.Title
          title={title}
          style={{
            backgroundColor: "#4f82d1",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          }}
          titleStyle={{
            backgroundColor: "#4f82d1",
            color: "white",
            flex: 1,
            flexShrink: 1,
            textShadowColor: "black",
            textShadowOffset: { width: 0.2, height: 0.2 },
            textShadowRadius: 0.9,
            fontSize: 20,
            textTransform: "uppercase",
          }}
          titleNumberOfLines={2}
        />

        <Card.Content>
          <Paragraph
            style={{
              marginTop: 10,
              fontSize: 15,
            }}
          >
            {body
              .replace(/<\/p>/g, "\n")
              .replace(/<("[^"]*?"|'[^']*?'|[^'">])*>/g, "")
              .replace(/&nbsp;/g, " ")
              .substring(0, 100) + "..."}
          </Paragraph>
          <Divider />
        </Card.Content>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Paragraph
              style={{
                marginTop: 10,
              }}
            >
              {author}
            </Paragraph>

            <Paragraph
              style={{
                marginTop: 10,
                marginLeft: "auto",
                justifyContent: "center",
              }}
            >
              {date}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

export default Announcement;
