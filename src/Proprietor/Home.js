import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Button, IconButton } from "react-native-paper";
import { Authcontext } from "../../api/Authcontext";
const { height, width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const { userInfo } = useContext(Authcontext);
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
      <IconButton
        icon="bell"
        iconColor="white"
        mode="contained"
        size={14}
        style={styles.notification}
      />
      <Text style={styles.name}>
        {userInfo.data.first_name} {userInfo.data.last_name}
      </Text>
      <Text style={styles.SName}>
        Owner of
        <Text style={styles.S2name}> Med Pharm</Text>
      </Text>
      <Text style={styles.Sdetail}>
        Medicine Store{"    "}
        <Text>In Kudghat</Text>
      </Text>

      <Image
        style={styles.profilepic}
        source={{
          uri: "https://images.news18.com/ibnlive/uploads/2021/10/gus-fring--16336703954x3.jpg",
        }}
      />

      <Text style={styles.CurrentPost}>Current Post</Text>

      <Text style={styles.currentdetail}>No posts yet</Text>

      <Button
        icon="pencil"
        mode="elevated"
        textColor="white"
        style={styles.postjob}
        onPress={() => navigation.navigate("Job Details")}
      >
        Post
      </Button>
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
  notification: {
    position: "absolute",
    right: width / 20,
    top: height / 40,
    backgroundColor: "red",
    justifyContent: "center",
    padding: 1,
    borderRadius: 50,
    alignItems: "center",
  },
  name: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 3.3,
    top: width / 2.3,
    fontSize: 18,
    color: "#0F0F0F",
    fontWeight: "900",
  },
  SName: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 3.35,
    top: width / 2.03,
    fontSize: 18,
    color: "#5C5C5C",
    fontWeight: "400",
  },
  S2name: {
    color: "#241E20",
    fontWeight: "600",
  },
  Sdetail: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 3.33,
    top: width / 1.82,
    fontSize: 14,
    color: "#5C5C5C",
    fontWeight: "300",
  },
  profilepic: {
    position: "absolute",
    width: 60,
    height: 60,
    left: width / 10,
    top: width / 2.3,
    borderRadius: 50,
    //borderColor: "red",
  },
  CurrentPost: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 11,
    top: width / 1.4,
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
  currentdetail: {
    position: "relative",
    alignItems: "center",
    display: "flex",
    left: width / -25,
    bottom: height / 20,
    fontSize: 20,
    color: "#5C5C5C",
    fontWeight: "200",
  },
  postjob: {
    position: "absolute",
    //height:142
    width: width / 4.5,
    height: width / 9.5,
    right: width / 12,
    bottom: width / 2.6,
    borderRadius: 7,
    elevation: 50,
    backgroundColor: "#FF0606",
  },
});
