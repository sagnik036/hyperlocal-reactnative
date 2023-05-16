import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button, TextInput } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { Authcontext } from "../../../api/Authcontext";

const { height, width } = Dimensions.get("window");

export default function Livelocation({ navigation, route }) {
  const [mapRegion, setMapRegion] = useState({});
  const [lat, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [shopAddress, setShopaddress] = useState("");
  const [error, SetError] = useState("");
  const { isLoading, RegisterShopData } = useContext(Authcontext);

  const validation = () => {
    if (shopAddress == "" && lat == "") {
      SetError("All fields are empty");
    } else if (shopAddress == "") {
      SetError("Enter your Shop Address");
    } else if (lat == "") {
      SetError("Please tap the current location button to put your address");
    } else {
      Handlenavigation();
      RegisterShopData(
        route.params.sname,
        route.params.ssdes,
        route.params.sdes,
        shopAddress,
        route.params.sgst,
        longitude,
        lat
      );
      return true;
    }
  };

  const Handlenavigation = () => {
    if (validation) {
      navigation.navigate("login");
    } else {
      SetError("Registration Failed!! Try Again");
    }
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.000918,
      longitudeDelta: 0.000418,
    });
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Create Account</Text>
      <Text style={styles.text2}>
        Sign up to post new jobs and get items delivered
      </Text>
      <Text style={styles.Allert}>{error}</Text>
      <TextInput
        placeholder="Enter Shop Address"
        mode="outlined"
        theme={{ roundness: 14 }}
        value={shopAddress}
        keyboardType="default"
        activeOutlineColor="red"
        onChangeText={(value) => setShopaddress(value)}
        style={styles.textinput}
      />
      <Spinner color="red" visible={isLoading} />
      <Button
        style={{ margin: 10, top: -15 }}
        onPress={userLocation}
        icon="map-marker-radius-outline"
        buttonColor="red"
        textColor="white"
      >
        Current Location
      </Button>
      <MapView
        style={styles.map}
        region={mapRegion}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
      >
        {lat && <Marker coordinate={mapRegion} title="Hi, there" />}
      </MapView>

      <TouchableOpacity style={styles.Button} onPress={() => validation()}>
        <Text style={styles.ButtonText}>Create Account</Text>
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

  textinput: {
    backgroundColor: "white",
    padding: 8,
    width: 320,
    height: 40,
    margin: 10,
    top: -20,
  },

  text1: {
    bottom: height / 25,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    color: "red",
  },

  text2: {
    bottom: height / 25,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 15,
    color: "grey",
  },

  map: {
    height: "50%",
    width: "100%",
  },

  Button: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.2,
    height: width / 8,
    top: height / 50,
  },
  ButtonText: {
    color: "white",
  },

  Allert: {
    color: "red",
    textDecorationLine: "underline",
    bottom: height / 60,
    fontWeight: "bold",
  },
});
