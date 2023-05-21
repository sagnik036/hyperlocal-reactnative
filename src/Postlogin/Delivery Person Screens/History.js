import { View, Text, Dimensions, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../../../api/Authcontext';
import axios from 'axios';
import { API_URl } from "@env";

const { height, width } = Dimensions.get("window");

export default function History({navigation}) {
    const { userInfo } = useContext(Authcontext);
    const [apidata,setApidata]=useState([]);
    const walletToken=userInfo.token.access;
    const TransactionHistory=()=>{
        axios.get(`${API_URl}/wallet-details/`,{
            headers:{
                Authorization:`Bearer ${walletToken}`
            }
        }).then((res)=>{
            console.log(res.data.data.transactions)
            let apidata = res.data.data.transactions
            setApidata(apidata)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        TransactionHistory()
    },[])
  return (
    <View style={styles.container}>
      {/* {apidata && apidata.length>0 ?(
        <FlatList data={apidata}
        keyExtractor={(item)=>item.id}
        renderItem={({item,index})=>{
            <Text>{item.id}</Text>
        }}/>
      ):(
        <Text>No Transactions Available</Text>
      )} */}
      <FlatList data={apidata}
        keyExtractor={(item)=>item.id}
        renderItem={({item,index})=>{
            <Text>{item.id}</Text>
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
})