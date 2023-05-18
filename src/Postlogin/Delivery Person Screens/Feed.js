import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { API_URl } from "@env";
import axios from 'axios';
import { Authcontext } from '../../../api/Authcontext';
import { FlatList } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get("window");

export default function Feed({navigation}) {

  const { userInfo } = useContext(Authcontext);
  const [data, setData] = useState([]);

  const token = userInfo.token.access 
  const feedapicall = () => {
    axios.get(`${API_URl}/live-jobs/`,{headers:{
      Authorization:`Bearer ${token}`
    }}) .then((res) =>{
      console.log (res.data.results[0].job_id)
      setData ([res.data.results[0]])
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
      <View style={{width:"100%", marginTop:50}}>
      <FlatList 
      data={data}
      keyExtractor={(item)=>item.job_id}
      renderItem={({item,index})=>
      <View>
        <Text>{item.id}</Text>
        <Text>{item.estimated_duration}</Text>
        <Text>{item.pickup_contact_name}</Text>
      </View>}
      />
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
      justifyContent: "center",
    },
})