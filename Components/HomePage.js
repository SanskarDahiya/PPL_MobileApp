import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getDataFromStorage } from "../asyncStorage";
import LoginSignupPage from "./LoginSignupPage";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setZIndex } from "../REDUX/actions/zIndexAction";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function HomePage(props) {
  const [StorageData, StorageDataUpdater] = useState(false);
  const getData = (data = false) => {
    if (data) {
      console.log("Setting data", data);
      StorageDataUpdater(data === "logout" ? false : data);
      props.setZIndex(-1);
    } else
      getDataFromStorage()
        .then((res) => {
          let data = JSON.parse(res);
          console.log("Data found in db", data);
          StorageDataUpdater(data || false);
          props.setZIndex(-1);
        })
        .catch((err) => {
          console.log(err);
          props.setZIndex(-1);
        });
  };
  useEffect(() => {
    getData();
    // props.setZIndex(10);
  }, []);
  //   <View style={styles.container}>
  //   {props.zIndexVisibility != -1 && <DelayingScreen />}
  // {StorageData ? (
  //   // THis is Profile Page
  //   <Profile data={StorageData} getData={getData} />
  // ) : (
  //   // Login Page
  //   <LoginSignupPage getData={getData} />
  // )}
  // </View>
  return (
    <Stack.Navigator>
      {StorageData ? (
        // THis is Profile Page
        <Stack.Screen
          name="PPL"
          component={Profile}
          initialParams={{ data: StorageData, getData: getData }}
        />
      ) : (
        // Login Page
        <Stack.Screen
          name="PPL LOGIN/SIGNUP"
          component={LoginSignupPage}
          initialParams={{ getData: getData }}
        />
      )}
    </Stack.Navigator>
  );
}
export default connect(null, { setZIndex })(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  hrLine: {
    borderColor: "orange",
    borderBottomWidth: 2,
    width: "95%",
    height: 0,
  },
});
