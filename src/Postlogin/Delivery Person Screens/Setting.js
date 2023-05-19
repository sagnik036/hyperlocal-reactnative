import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { IconButton, TextInput } from 'react-native-paper'
import { Authcontext } from '../../../api/Authcontext';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const { height, width } = Dimensions.get("window");

export default function Setting({navigation}) {
  const [Error, Seterror] = useState("");
  const [mobile, SetMobile] = useState("");
  const [otp, setOtp] = useState("");
  const { isLoading, GetOtp, mobilenum } = useContext(Authcontext);

  const validation = () => {
    if (isNaN(mobile)) {
      Seterror("Enter a Number");
    } else if (mobile === "") {
      Seterror("Enter Mobile Number");
    } else if (mobile.length != 10) {
      Seterror("Enter 10 Digit Mobile Number");
    } else {
      mobilenum(mobile);
      //GetOtp(mobile);
    }
  };
  return (
    <View style={styles.container}>
    <IconButton onPress={()=>navigation.openDrawer()}
      icon="menu"
      iconColor="black"
      mode="contained"
      size={30}
      style={styles.menu}
    />
    <Spinner color="red" visible={isLoading} />
      <Text style={styles.login}>Check Your Pickup Here</Text>
      <View style={styles.content}>
      
        <TextInput
          placeholder="Put Your Mobile Number"
          mode="outlined"
          theme={{ roundness: 10 }}
          value={mobile}
          onChangeText={(value) => SetMobile(value)}
          activeOutlineColor="red"
          outlineColor="red"
          style={styles.mobileinput}
        />
        <Text style={{ color: "red" }}>{Error}</Text>

        <TouchableOpacity style={styles.Button} onPress={() => validation()}>
          <Text style={styles.ButtonText}>Send OTP</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Put Your OTP"
          mode="outlined"
          theme={{ roundness: 10 }}
          value={mobile}
          onChangeText={(value) => setOtp(value)}
          activeOutlineColor="red"
          outlineColor="red"
          style={styles.otpinput}
        />

        <TouchableOpacity style={styles.Button2} onPress={() => validation()}>
          <Text style={styles.ButtonText2}>Check OTP</Text>
        </TouchableOpacity>
  </View>
  </View>
)
}

const styles = StyleSheet.create({
  menu:{
    position: "absolute",
    alignItems: "center",
    backgroundColor: "white",
    left: width/25,
    top: height/40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
   // justifyContent: "center",
  },
  login: {
    //width: 97,
    //left: 180,
    top: height / 9,
    fontWeight: "900",
    fontSize: 36,
    alignItems: "center",
    textAlign: "center",
    color: "#F02121",
  },
  content: {
    bottom: width / 3,
  },
  mobileinput: {
    width: width / 1.3,
    backgroundColor: "white",
    elevation: 50,
    top: height/3,
  },
  otpinput: {
    width: width / 1.3,
    backgroundColor: "white",
    elevation: 50,
    top: height/2
  },
  mobileText: {
    fontWeight: "400",
    fontSize: 16,
    top: -2,
  },
  Button: {
    width: width / 1.3,
    borderWidth: 1,
    borderColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: height / 2.5,
    height: width / 7,
  },
  ButtonText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#F02121",
  },
  Button2: {
    width: width / 1.3,
    borderWidth: 1,
    borderColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: height / 1.7,
    height: width / 7,
  },
  ButtonText2: {
    fontWeight: "600",
    fontSize: 20,
    color: "#F02121",
  },
  Buttondisable: {
    width: width / 1.3,
    borderWidth: 1,
    borderColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: width / 7,
    height: width / 7,
  },
})