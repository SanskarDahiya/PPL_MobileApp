import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getDataFromStorage } from "../asyncStorage";
import LoginSignupPage from "./LoginSignupPage";
import Profile from "./Profile";
import { connect } from "react-redux";
import DelayingScreen from "./DelayingScreen";
import { setZIndex } from "../REDUX/actions/zIndexAction";

function HomePage(props) {
  const [StorageData, StorageDataUpdater] = useState(false);
  const getData = (data = false) => {
    if (data) StorageDataUpdater(data === "Logout" ? false : data);
    else
      getDataFromStorage()
        .then(res => {
          StorageDataUpdater(JSON.parse(res) || false);
          props.setZIndex(-1);
        })
        .catch(err => {
          props.setZIndex(-1);
        });
  };
  useEffect(() => {
    getData();
    props.setZIndex(10);
  }, []);
  return (
    <View style={styles.container}>
      {props.zIndexVisibility != -1 && <DelayingScreen />}

      <Text
        style={{
          backgroundColor: "white",
          width: "100%",
          zIndex: 10,
          borderBottomWidth: 5
        }}
      ></Text>
      {StorageData ? (
        // THis is Profile Page
        <Profile data={StorageData} getData={getData} />
      ) : (
        // Login Page
        <LoginSignupPage getData={getData} />
      )}
    </View>
  );
}
export default HomePage = connect(
  states => {
    return {
      zIndexVisibility: states.zIndex.value
    };
  },
  { setZIndex }
)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  hrLine: {
    borderColor: "orange",
    borderBottomWidth: 2,
    width: "95%",
    height: 0
  }
});
