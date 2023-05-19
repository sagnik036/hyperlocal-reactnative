import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_URl } from "@env";
import axios from "axios";
import { Authcontext } from "../../../api/Authcontext";
import Setting from "./Setting";

const { height, width } = Dimensions.get("window");
export default function JobDetails({ route }) {
  const { userInfo, JobId } = useContext(Authcontext);
  const jobtoken = userInfo.token.access;
  //const pickuplat = data.data.pickup_location.coordinates[0];
  //const pickuplong = data.data.pickup_location.coordinates[1];

  const [data, setData] = useState(null);
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url);
  };
  const jobD = () => {
    axios
      .get(`${API_URl}/jobs-details/${route.params.paramKey}/`, {
        headers: { Authorization: `Bearer ${jobtoken}` },
      })
      .then((res) => {
        setData(res.data);
        JobId(route.params.paramKey);
        console.log(res.data.data.name);
      })
      .catch((err) => {
        alert("No data found");
      });
  };
  useEffect(() => {
    jobD();
  }, []);
  function getFormattedDuration(duration) {
    const parts = duration.split(", ");
    const hours = parts[0].split(" ")[0];
    const minutes = parts[1].split(" ")[0];
    return `${hours} hours and ${minutes} mins`;
  }
  const acceptjob = () => {
    axios
      .post(
        `${API_URl}/job-accept/`,
        {
          job_id: route.params.paramKey,
        },
        {
          headers: {
            Authorization: `Bearer ${jobtoken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("You Have Accepted The Job, Go To Home Screen For More Details");
      })
      .catch((err) => {
        alert("This Job Has Been Accepted Already");
      });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "700",
          bottom: 110,
          textAlign: "center",
        }}
      >
        Job Details
      </Text>
      {data ? (
        <>
          <Text
            style={{ fontSize: 16, right: 100, bottom: 80, marginBottom: 15 }}
          >
            Product Name: {data.data.name}
          </Text>
          <Text
            style={{ fontSize: 16, right: 112, bottom: 80, marginBottom: 15 }}
          >
            Description: {data.data.description}
          </Text>
          <Text
            style={{ fontSize: 16, right: 92, bottom: 80, marginBottom: 15 }}
          >
            Product Category:{" "}
            {data.data.category === "908c63a4-9df3-4269-909d-ace6992ea9ee"
              ? "Heavy"
              : "Fragile"}
          </Text>
          <Text
            style={{ fontSize: 16, right: 125, bottom: 80, marginBottom: 15 }}
          >
            Quantity: {data.data.quantity}
          </Text>
          <Text
            style={{ fontSize: 16, right: 97, bottom: 80, marginBottom: 15 }}
          >
            Pickup Location: {data.data.pickup_address}
          </Text>
          <Text
            style={{ fontSize: 16, right: 105, bottom: 80, marginBottom: 15 }}
          >
            Drop Location: {data.data.delivery_address}
          </Text>
          <Text
            style={{ fontSize: 16, right: 110, bottom: 80, marginBottom: 15 }}
          >
            Owner Name: {data.data.pickup_contact_name}
          </Text>
          <Text
            style={{ fontSize: 16, right: 105, bottom: 80, marginBottom: 15 }}
          >
            Contact Owner: {data.data.pickup_contact_phone}
          </Text>
          <Text
            style={{ fontSize: 16, right: 100, bottom: 80, marginBottom: 15 }}
          >
            Customer Name: {data.data.delivery_contact_name}
          </Text>
          <Text
            style={{ fontSize: 16, right: 94, bottom: 80, marginBottom: 15 }}
          >
            Contact Customer: {data.data.delivery_contact_phone}
          </Text>
          <Text
            style={{ fontSize: 16, right: 115, bottom: 80, marginBottom: 15 }}
          >
            Delivery Fee: {data.data.delivery_boy_fee}
          </Text>
          <Text
            style={{ fontSize: 16, right: 60, bottom: 80, marginBottom: 15 }}
          >
            Estimated Completion Time:{" "}
            {getFormattedDuration(data.data.estimated_duration)}
          </Text>
          <Image
            style={styles.product1}
            source={{
              uri: data.data.photo_1,
            }}
          />
          <Image
            style={styles.product2}
            source={{
              uri: data.data.photo_2,
            }}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#F02121",
              height: 50,
              width: 150,
              marginTop: 5,
              marginBottom: 5,
              left: 10,
              top: 50,
            }}
            onPress={() =>
              openGoogleMaps(
                data.data.pickup_location.coordinates[1],
                data.data.pickup_location.coordinates[0]
              )
            }
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              View Pickup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#F02121",
              height: 50,
              width: 150,
              marginTop: 5,
              marginBottom: 5,
              left: 10,
              top: 50,
            }}
            onPress={() =>
              openGoogleMaps(
                data.data.delivery_location.coordinates[1],
                data.data.delivery_location.coordinates[0]
              )
            }
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              View Drop
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No job details available</Text>
      )}
      <TouchableOpacity
        style={{
          justifyContent: "center",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#F02121",
          height: 50,
          width: 150,
          marginTop: 5,
          marginBottom: 5,
          left: 10,
          top: 50,
        }}
        onPress={() => acceptjob()}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Accept
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  product1: {
    position: "absolute",
    width: 100,
    height: 100,
    right: 220,
    bottom: 180,
    resizeMode: "contain",
  },
  product2: {
    position: "absolute",
    width: 100,
    height: 100,
    right: 85,
    bottom: 180,
    resizeMode: "contain",
  },
});
