import { View, Text, Image, ImageBackground, Dimensions } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useContext } from "react";
import { Authcontext } from "../../api/Authcontext";

const { height, width } = Dimensions.get("window");

const D_CustomDrawer = (props) => {
  const { logout, userInfo } = useContext(Authcontext);
  
    return (
      <View style={{flex:1}}>
      <DrawerContentScrollView {...props}
      contentContainerStyle={{paddingTop: 0}}>
        <ImageBackground
          source={{
            uri: "https://swall.teahub.io/photos/small/69-699380_picsart-background-hd-images-new-cb-edits-background.jpg",
          }}
          style={{ padding: 15 }}
        >
          <Image
            source={{
              uri: "https://www.forbesindia.com/media/wpower2020/Monika%20Shergill.jpg",
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: "#FCF5E5", fontSize: 18, fontWeight: "400" }}>
          {userInfo.data.first_name}
          </Text>
        </ImageBackground>

     <DrawerItemList {...props}/>
      </DrawerContentScrollView>
      <View style={{ padding: 40 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 7,
            borderColor: "#F02121",
            height: 50,
            }} onPress={() => logout()}>
          <Text style={{textAlign: "center", color: "red", fontSize: 16, fontWeight: "900",}}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    )
}

export default D_CustomDrawer;