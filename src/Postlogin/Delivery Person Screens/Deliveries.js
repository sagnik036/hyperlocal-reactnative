import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'

const { height, width } = Dimensions.get("window");

export default function Deliveries({navigation}) {
  return (
    <View style={styles.container}>
    <IconButton onPress={()=>navigation.openDrawer()}
      icon="menu"
      iconColor="black"
      mode="contained"
      size={30}
      style={styles.menu}
    />
    <Text>My Deliveries</Text>
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