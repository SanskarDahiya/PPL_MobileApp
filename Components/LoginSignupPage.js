import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import SignIn from "./SignIN";
import Signup from "./Signup";

const LoginSignupPage = props => {
  const [mainBtn, mainBtnUpdate] = useState(true);
  // useEffect(() => {
  //   console.log(mainBtn, "This is main Btn");
  // }, [mainBtn]);
  const mainBtnUpdater = val => mainBtnUpdate(val);
  //   getDataFromStorage.then(res => console.log("This is get Data", res));
  return (
    <View style={styles.container}>
      {/* Heading Container */}
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text>This is React-Native Sample App</Text>
        {/* <Text> {id + "\n"}</Text> */}
      </View>
      <View style={styles.hrLine} />

      {/* Main Body Container */}
      <View style={[styles.container, { flex: 5, justifyContent: "center" }]}>
        {mainBtn ? (
          <SignIn switchTab={mainBtnUpdater} getData={props.getData} />
        ) : (
          <Signup switchTab={mainBtnUpdater} />
        )}
      </View>

      {/* Bottom postion for login_signup switch */}
      <View style={[styles.hrLine, { width: "80%" }]} />
      <View style={[styles.container, { flex: 1 }]}>
        <TouchableWithoutFeedback onPress={() => mainBtnUpdater(!mainBtn)}>
          <View>
            {mainBtn ? (
              <Text>
                Didn't Have A New Account!
                <Text style={{ color: "blue" }}> SignUp Here</Text>
              </Text>
            ) : (
              <Text>
                Already Have A New Account!
                <Text style={{ color: "blue" }}> Login Here</Text>
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

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

export default LoginSignupPage;
