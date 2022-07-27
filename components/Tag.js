import React from "react";
import { Pressable, Text, View } from "react-native";
import { Button, Checkbox, ToggleButton } from "react-native-paper";
import { List } from "react-native-paper";

function Tag(props) {
  const { tagTitle } = props;
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <List.Section>
      <List.Item title={tagTitle} />
    </List.Section>
  );
}

export default Tag;
