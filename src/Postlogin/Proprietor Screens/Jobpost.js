import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  setSelected,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Calendar } from "react-native-calendars";

// /import { showDatePicker, DateTimePickerModal, handleConfirm, hideDatePicker } from "@react-native-community/datetimepicker";/
import React, { useState } from "react";

export default function Jobpost() {
  const data = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "5", value: "5" },
    { key: "6", value: "6" },
    { key: "7", value: "7" },
    { key: "8", value: "8" },
    { key: "9", value: "9" },
    { key: "10", value: "19" },
    { key: "11", value: "11" },
    { key: "12", value: "12" },
  ];
  const data1 = [
    { key: "1", value: "2 wheeler" },
    { key: "2", value: "4 wheeler" },
    { key: "3", value: "6 wheeler" },
    { key: "4", value: "other" },
  ];
  const data2 = [
    { key: "1", value: "Heavy" },
    { key: "2", value: "Fragile" },
  ];
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.Heading}>Product Name</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Product Name"
          value={String}
          onChangeText={(value) => setString(value)}
        />
        <Text>Product Image</Text>
        <Text style={styles.Heading}>Job Title</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Job Title"
          value={String}
          onChangeText={(value) => setString(value)}
        />
        <View style={{ bottom: -10 }}>
          <Text style={styles.Heading}>Job Description</Text>
          <TextInput
            style={styles.input1}
            keyboardType="default"
            placeholder="Job Description"
            value={String}
            onChangeText={(value) => setString(value)}
          />
        </View>
        <View style={{ bottom: -20 }}>
          <Text style={styles.Heading}>Location</Text>
          <Text>Pickup Point</Text>
          <TextInput
            style={styles.input2}
            keyboardType="default"
            placeholder="Pickup Point"
            value={String}
            onChangeText={(value) => setString(value)}
          />
          <Text>Full Address</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Full Address"
            value={String}
            onChangeText={(value) => setString(value)}
          />
          <Text>Price</Text>
          <TextInput
            style={styles.input2}
            keyboardType="default"
            placeholder="Price"
            value={String}
            onChangeText={(value) => setString(value)}
          />
          <TouchableOpacity style={styles.Button1}>
            <Text style={styles.nextStyle}>Calculate Price</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25, bottom: -15 }}>
          <Text style={styles.Heading1}>Date</Text>

          <View style={styles.dropdown}>
            <Text style={styles.Text1}>Select Time</Text>
            <SelectList
              maxHeight={100}
              search={false}
              placeholder=" "
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
            />
          </View>

          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.Button2}
          >
            <Text
              style={{ color: "white", fontSize: 15, alignItems: "center" }}
            >
              {" "}
              Select Date
            </Text>
          </TouchableOpacity>

          <Modal visible={showModal} animationType="slide" transparent={true}>
            <Calendar
              onDayPress={(date) => setShowModal(false)}
              style={{
                borderRadius: 10,
                elevation: 40,
                margin: 40,
                top: 200,
              }}
            />
          </Modal>

          <View style={styles.dropdown2}>
            <Text style={{ top: 25, height: 17, right: 95 }}>Vehicle</Text>
            <SelectList
              maxHeight={100}
              search={false}
              placeholder=" "
              setSelected={(val) => setSelected(val)}
              data={data1}
              save="value"
            />
          </View>

          <View style={styles.dropdow3}>
            <Text style={{ top: 28, height: 17, right: 95 }}>Product Type</Text>
            <SelectList
              maxHeight={100}
              search={false}
              placeholder=" "
              setSelected={(val) => setSelected(val)}
              data={data2}
              save="value"
            />
          </View>
        </View>
        <Text style={{ top: -100 }}>
          -------------------------------------------------------------------------
        </Text>
        <View style={{ bottom: 50 }}>
          <Text style={styles.heading2}>Customer Details</Text>
          <Text style={{ right: -40 }}>Full Name</Text>
          <TextInput
            style={styles.input3}
            keyboardType="default"
            placeholder="Full Name"
            value={String}
            onChangeText={(value) => setString(value)}
          />
          <Text style={{ right: -40 }}>Address</Text>
          <TextInput
            style={styles.input3}
            keyboardType="default"
            placeholder="Address"
            value={String}
            onChangeText={(value) => setString(value)}
          />
          <Text style={{ right: -40 }}>Email</Text>
          <TextInput
            style={styles.input3}
            keyboardType="default"
            placeholder="Email"
            value={String}
            onChangeText={(value) => setString(value)}
          />
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.nextStyle}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  Heading: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    marginTop: 15,
    margin: 10,
    right: 10,
  },
  input1: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 100,
    margin: 10,
    right: 10,
  },
  input2: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 120,
    height: 40,
    margin: 10,
    right: 10,
  },
  scroll: {
    marginHorizontal: 0,
  },
  Button: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 15,
    margin: 8,
    Text: "white",
    alignItems: "center",
    height: 50,
    width: 300,
    top: 40,
    right: 1,
  },
  dropdown: {
    width: 120,
    margin: 10,
    padding: 5,
    top: -40,
    left: -10,
  },
  Button1: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    height: 40,
    width: 100,
    left: 150,
    top: -60,
  },
  nextStyle: {
    color: "white",
  },
  Heading1: {
    fontSize: 25,
    fontStyle: "normal",
    top: -40,
    fontWeight: "bold",
  },
  Text1: {
    top: -10,
    height: 18,
  },
  Text2: {
    top: -10,
    height: 17,
    right: -10,
  },
  dropdown1: {
    bottom: 128,
    right: -140,
    width: 120,
    margin: 10,
    borderColor: "red",
    //padding: 5,
  },
  dropdown2: {
    top: -170,
    right: -100,
    width: 120,
  },
  dropdow3: {
    top: -150,
    right: -100,
    width: 140,
  },
  heading2: {
    fontSize: 20,
    fontStyle: "normal",
    bottom: 30,
    fontWeight: "bold",
  },
  input3: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    marginTop: 15,
    margin: 10,
    right: -30,
  },
  Calendar: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    transparent: "true",
    justifyContent: "center",
    transparent: "true",
  },
  Button2: {
    backgroundColor: "red",
    borderRadius: 10,
    margin: 40,
    padding: 15,
    height: 45,
    width: 100,
    top: -140,
    left: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
