import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { Authcontext } from "../../api/Authcontext";
import axios from "axios";
import { API_URl } from "@env";

const { height, width } = Dimensions.get("window");

export default function Dhome({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const [cInfo, setcInfo] = useState(null);
  const [wheelType, setwheelType] = useState(null);
  const vToken = userInfo.token.access;
  const vId = userInfo.data.id;
  const vType = () => {
    if (cInfo && cInfo.results && cInfo.results.length > 0) {
      const wheel = cInfo.results[0].vehicle_type;
      if (wheel == "TW") {
        setwheelType("2");
      } else if (wheel == "THW") {
        setwheelType("3");
      } else if (wheel == "FW") {
        setwheelType("4");
      } else {
        setwheelType("other");
      }
    }
  };
  const vInfo = () => {
    axios
      .get(`${API_URl}/vehicledata/?search=${vId}`, {
        headers: {
          Authorization: `Bearer ${vToken}`,
        },
      })
      .then((res) => {
        //console.log(res.data)
        let cInfo = res.data;
        setcInfo(cInfo);
        //console.log(cInfo)
      })
      .catch((err) => {
        //console.log(err)
        alert("not found");
      });
  };
  useEffect(() => {
    vInfo();
  }, []);
  useEffect(() => {
    vType();
  }, [cInfo]);
  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => navigation.openDrawer()}
        icon="menu"
        iconColor="black"
        mode="contained"
        size={30}
        style={styles.menu}
      />
      <IconButton
        icon="bell"
        iconColor="white"
        mode="contained"
        size={16}
        style={styles.notification}
      />
      <Text style={styles.Dname}>
        {userInfo.data.first_name} {userInfo.data.last_name}
      </Text>
      <Text style={styles.Dcount}>
        Total
        <Text style={{ fontWeight: "800" }}> {userInfo.data.jobs_count} </Text>
        deliveries till now
      </Text>
      <View style={styles.Vtype}>
        {cInfo && cInfo.results ? (
          <Text>{wheelType} wheeler</Text>
        ) : (
          <Text>No Info</Text>
        )}
      </View>
      {userInfo.data.profile_pic ? (
        <Image
          style={styles.Dprofilepic}
          source={{ uri: userInfo.data.profile_pic }}
        />
      ) : (
        <Image
          style={styles.Dprofilepic}
          source={{
            uri: "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
          }}
        />
      )}
      <Text style={styles.Delivery}>Current Delivery</Text>

      <Text style={styles.currentdetails}>Not applied for any job yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "white",
    left: width / 25,
    top: height / 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    right: 40,
    top: 30,
    bottom: 88,
    backgroundColor: "red",
    justifyContent: "center",
    padding: 1,
    borderRadius: 50,
    alignItems: "center",
  },
  Dname: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: width / 2,
    height: 22,
    left: width / 3.3,
    top: width / 2.34,
    fontSize: 18,
    color: "#0F0F0F",
    fontWeight: "900",
  },
  Dcount: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: 182,
    height: 21,
    left: width / 3.3,
    top: width / 2.02,
    fontSize: 14,
    color: "#5C5C5C",
    fontWeight: "400",
  },
  Vtype: {
    flex: 1 / 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 100,
    borderWidth: 2,
    top: width / 5.2,
    right: width / 12,
  },
  Dprofilepic: {
    position: "absolute",
    width: 60,
    height: 60,
    left: 42,
    top: 170,
    borderRadius: 50,
  },
  Delivery: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: 200,
    height: 30,
    left: width / 9,
    top: width / 1.38,
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
  currentdetails: {
    position: "relative",
    alignItems: "center",
    display: "flex",
    width: 280,
    height: 500,
    left: width / 13,
    top: width / 2,
    fontSize: 20,
    color: "#5C5C5C",
    fontWeight: "200",
  },
});
