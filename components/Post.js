import { ScrollView, Text, View } from "react-native";
import { Card, Divider, Paragraph } from "react-native-paper";
import * as Linking from "expo-linking";

function Post(props) {
  const { title, body, date, author, attachment } = props.route.params;
  const _handlePress = () => {
    Linking.openURL(attachment.attachment_url);
  };
  return (
    <View
      style={{
        margin: 2,
        padding: 7,
        height: 700,
      }}
    >
      <Card
        mode="elevated"
        style={{
          margin: 2,
          padding: 7,
          height: 700,
        }}
        elevation={5}
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
            textAlign: "center",
            textShadowColor: "black",
            textShadowOffset: { width: 0.2, height: 0.2 },
            textShadowRadius: 0.9,
            fontSize: 20,
            textTransform: "uppercase",
          }}
          titleNumberOfLines={6}
        />
        <ScrollView>
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
                .replace(/&nbsp;/g, " ")}
            </Paragraph>
            <Divider />
            <Card.Content
              style={{
                alignItems: "center",
              }}
            >
              <Paragraph
                onPress={attachment != null ? _handlePress : () => {}}
                style={{
                  padding: 10,
                }}
              >
                Συνημμένα:
                <Paragraph
                  style={{
                    color: "#4f82d1",
                  }}
                >
                  {attachment != null ? " " + attachment.filename : "Κανένα"}
                </Paragraph>
              </Paragraph>
              <Divider />
            </Card.Content>
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
                icon={"calendar"}
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
        </ScrollView>
      </Card>
    </View>
  );
}

export default Post;
