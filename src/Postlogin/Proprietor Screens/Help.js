import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
const { height, width } = Dimensions.get("window");

export default function Help({ navigation }) {
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        iconColor="black"
        mode="contained"
        size={35}
        style={styles.nav}
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView style={{ top: width / 4.5 }}>
        <Text>How do I create an account?</Text>
        <Text>How do I reset my password?</Text>
        <Text>How do I delete my account?</Text>
        <Text>How do I contact customer support?</Text>
        <Text>Can I use the app offline?</Text>
        <Text>What do I do if I forget my password?</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    position: "absolute",
    right: width / 1.25,
    bottom: height / 1.1,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
});
