import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Authcontext } from "../../api/Authcontext";
const { height, width } = Dimensions.get("window");

export default function CustomDrawer(props) {
  const { logout } = useContext(Authcontext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <ImageBackground
          source={{
            uri: "https://w0.peakpx.com/wallpaper/1016/312/HD-wallpaper-red-liquid-metal-red-abstract-black-dark-design-liquid-metal-mix.jpg",
          }}
          style={{ padding: 15 }}
        >
          <Image
            source={{
              uri: "https://images.news18.com/ibnlive/uploads/2021/10/gus-fring--16336703954x3.jpg",
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "400" }}>
            Gustavo Fring
          </Text>
        </ImageBackground>

        <View
          style={{ flex: 1, backgroundColor: "white", paddingTop: 20, top: 10 }}
        >
          <DrawerItemList {...props} />
        </View>

        <View
          style={{ backgroundColor: "white", height: 150, width: 150, top: 10 }}
        />
      </DrawerContentScrollView>
      <View style={{ padding: 40 }}>
        <TouchableOpacity
          style={{
            //position: "relative",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 7,
            borderColor: "#F02121",
            height: 50,
          }}
          onPress={() => logout()}
        >
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 16,
              fontWeight: "900",
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
