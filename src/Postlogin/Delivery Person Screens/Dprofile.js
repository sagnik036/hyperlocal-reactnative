import { View, Text, StyleSheet, Dimensions, Image, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper'
import { color, not, set } from 'react-native-reanimated';
import { Authcontext } from '../../../api/Authcontext';
import axios from 'axios';
import { API_URl } from "@env";

const { height, width } = Dimensions.get("window");


export default function Dprofile({navigation}) {
  const { userInfo } = useContext(Authcontext);
  const [cInfo,setcInfo]=useState(null)
  const [wheelType,setwheelType]=useState(null)
  const vToken= userInfo.token.access
  const vId= userInfo.data.id 
  const vType=()=>{
    if (cInfo && cInfo.results) {
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
    };
  }
  const vInfo =()=>{
    axios.get(`${API_URl}/vehicledata/?search=${vId}`,
    {
      headers:{
        Authorization:`Bearer ${vToken}`
      }
    }).then((res)=>{
      //console.log(res.data)
      let cInfo=res.data
      setcInfo(cInfo)
      console.log(cInfo)
    }).catch((err)=>{
      //console.log(err)
      alert("not found")
    })
  }
  useEffect(()=>
  {vInfo()},[])
  useEffect(()=>
  {vType()},[cInfo])

  return (
    <View style={styles.container}>
    <IconButton onPress={()=>navigation.openDrawer()}
      icon="menu"
      iconColor="black"
      mode="contained"
      size={30}
      style={styles.menu}
    />
    <Text style={styles.Dtext}>Hey</Text>
    <Text style={styles.Dname}>
      {userInfo.data.first_name}
    </Text>
    
    <Image
        style={styles.Dprofilepic}
        source={{
          uri: "https://www.forbesindia.com/media/wpower2020/Monika%20Shergill.jpg",
        }}
      />

      <IconButton
        icon="delete"
        iconColor="black"
        mode="contained"
        size={21}
        style={styles.delete}
      />
      
      <Text style={styles.Dlog}>Logged in via {userInfo.data.mobile_number}</Text>
      
      <View style={styles.roundedrect}>
        <Text style={styles.Dstatus}>Delivery Status</Text>
        <Text style={styles.Dstatusn}>Total 
        <Text style={{fontWeight: '500'}}> {userInfo.data.jobs_count} </Text>
         deliveries till now.</Text>
      </View>
      
      <View style={styles.roundedrect2}>
      <Text style={styles.Vdetails}>Vehicle Details</Text>
      {cInfo && cInfo.results ? (<>
    <Text style={styles.Vmodel}>{cInfo.results[0].vehicle_name}</Text>
    <Text style={styles.wheel}>{wheelType} wheeler</Text>
    <Text style={styles.Vnumber}>Vehicle Number
    <Text style={{fontWeight: '400'}}>    {cInfo.results[0].vehicle_number}</Text>
    </Text>
    </>
  ) : (
    <Text>No vehicle information available</Text>
  )}
        
      </View>
      
      <View style={{ padding: 40 }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            padding: 10,
            borderRadius: 7,
            backgroundColor: "#F02121",
            height: 60,
            bottom: -55,
            //left: -70,
            }}>
          <Text style={{textAlign: "center", color: "white", fontSize: 20, fontWeight: "500",}}>
            Delete Account
          </Text>
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
      justifyContent: "center",
    },
    Dtext: {
      position: "absolute",
      alignItems: "center",
      display: "flex",
      width: 182,
      height: 25,
      left: 50,
      top: 100,
      fontSize: 18,
      color: "#5C5C5C",
      fontWeight: "500",
    },
    Dname: {
      position: "absolute",
      alignItems: "center",
      display: "flex",
      width: 300,
      height: 100,
      left: 50,
      top: 125,
      fontSize: 30,
      color: "#0F0F0F",
      fontWeight: "800",
    },
    Dprofilepic: {
      position: "absolute",
      width: 80,
      height: 80,
      left: 270,
      top: 105,
      borderRadius: 80,
    },
    delete: {
      position: "absolute",
      right: 30,
      top: 80,
      bottom: 88,
      backgroundColor: "white",
      justifyContent: "center",
      borderRadius: 50,
      alignItems: "center",
    },
    Dlog: {
      position: "absolute",
      alignItems: "center",
      display: "flex",
      width: 500,
      height: 25,
      left: 50,
      top: 170,
      fontSize: 13,
      color: "#5C5C5C",
      fontWeight: "400",
    },
    roundedrect: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      bottom: -20,
      width: 350,
      height: 90,
      borderRadius: 20,
      borderWidth: 0.5,
    },
    Dstatus: {
      left: 25,
      top: 15,
      fontSize: 16,
      fontWeight: '500',
    },
    Dstatusn: {
      left: 25,
      top: 20,
      fontSize: 22,
      fontWeight: '300',
    },
    roundedrect2: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      bottom: -55,
      width: 350,
      height: 190,
      borderRadius: 20,
      borderWidth: 0.5,
    },
    Vdetails: {
      left: 25,
      top: 15,
      fontSize: 16,
      fontWeight: '500',
    },
    Vmodel: {
      left: 25,
      top: 25,
      fontSize: 25,
      fontWeight: '800',
    },
    wheel: {
      left: 25,
      top: 30,
      fontSize: 16,
      fontWeight: '400',
    },
    Vnumber: {
      left: 25,
      top: 60,
      fontSize: 16,
      fontWeight: '500',
    },
})