import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
const { height, width } = Dimensions.get("window");

export default function Profile({ navigation }) {
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
        icon="delete"
        iconColor="black"
        mode="contained"
        size={20}
        style={styles.delete}
      />
      <Text style={styles.text1}>Hey</Text>
      <Text style={styles.text2}>Sayantika</Text>
      <Image
        style={styles.Dprofilepic}
        source={{
          uri: "https://www.forbesindia.com/media/wpower2020/Monika%20Shergill.jpg",
        }}
      />
      <Text style={styles.text3}>Logged in Via  9674281979</Text>
      <View style={styles.round1}>
      <Text style={styles.text4}>Default Address</Text>
      <Text style={styles.text5}>Puja Enclave, Prantika, Garia, Kolkata, 
      700084</Text>
      </View>
      <View style={styles.round2}>
      <Text style={styles.text6}>Shop Details</Text>
      <Text style={styles.text7}>Wood Garden</Text>
      <Text style={styles.text8}>A Furtinure Store</Text>  
      <Text style={styles.text9}>Lorem Ipsum, dolor sit amet consectur adipisicing  elit Voluptate cum, velit mariores optio aspernatur commodi facilis nostrum quam voluptatibus similique, et dolores harum qul non pariatur molestiae repellat id deleniti</Text> 
      <Text style={styles.text10}>Shop GST: </Text>
      <Text style={styles.text11}>1234567890!@#$% </Text>
      <Text style={styles.text12}>Located In </Text>
      <Text style={styles.text13}>Kudghat, 10H, Chandi Ghosh Road, Asoke Nagar, Kolkata, West Bengal, 700040 </Text>
      </View>
      <TouchableOpacity style={styles.Button} onPress={() => validation()}>
            <Text >Delete Account</Text>
          </TouchableOpacity>
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
  text1:{
    bottom:height/19,
    right: width/3.3,
    fontSize:21
  },
  text2:{
    bottom: height/18,
    right: width/4.5,
    fontSize:27,
    fontWeight:"bold"
  },
  Dprofilepic: {
    position: "absolute",
    width: 75,
    height: 75,
    right: width/6.2,
    top: height/10,
    borderRadius: 50,
  },
  delete: {
    position: "absolute",
    right: width / 15,
    top: height / 40,
    backgroundColor: "red",
    justifyContent: "center",
    padding: 1,
    borderRadius: 50,
    alignItems: "center",
  },
  text3:{
    bottom: height/18,
    right: width/6.5,
    fontSize:16,
  },
  text4:{
    top: height/48,
    left: width/20,
    fontSize:16,
    fontWeight:"bold",
    color:"grey"
  },
  text5:{
    top: height/50,
    left: width/20,
    fontSize:16,
  },
  text6:{
    top: height/85,
    left: width/20,
    fontSize:16,
    fontWeight:"bold",
    color:"grey"
  },
  text7:{
    top: height/100,
    left: width/20,
    fontSize:23,
    fontWeight:"bold"
  },
  rectangle: {
    width: 100 * 2,
    height: 100,
    backgroundColor: "white",
    borderWidth:100
  },
  text8:{
    top: height/80,
    left: width/20,
    fontSize:18,
  },
  text9:{
    top: height/100,
    left: width/20,
    width:320
    
  },
  text10:{
    top: height/40,
    left: width/20,
    fontWeight:"bold",
    fontSize:15,
  },
  text11:{
    top: height/250,
    left: width/5,
    
  },
  text12:{
    top: height/120,
    left: width/22,
    fontWeight:"bold",
    fontSize:18,
  },
  text13:{
    top: height/70,
    left:width/22,
  },
  round1: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    bottom: height/30,
    width: 350,
    height: 90,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  round2: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    top: height/20,
    width: 350,
    height: 250,
    borderRadius: 20,
    borderWidth: 0.5,
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
    top:height/10
  },
});
