import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { IconButton } from 'react-native-paper'
import { API_URl } from "@env";
import axios from 'axios';
import { Authcontext } from '../../../api/Authcontext';
const { height, width } = Dimensions.get("window");

export default function Feed({navigation}) {

  const { userInfo } = useContext(Authcontext);
  const token = userInfo.token.access 
  const feedapicall = () => {
    axios.get(`${API_URl}/live-jobs/`,{headers:{
      Authorization:`Bearer ${token}`
    }}) .then((res) =>{
      console.log (res.data)
    }) .catch((err) =>{
      console.log (err)
    })
  } 

  useEffect (() => {
    feedapicall()
  }, [])

  return (
    <View style={styles.container}>
      <IconButton onPress={()=>navigation.openDrawer()}
        icon="menu"
        iconColor="black"
        mode="contained"
        size={30}
        style={styles.menu}
      />
      <Text>Feed</Text>
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
      justifyContent: "center",
    },
})