import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import SignIn from "./SignIN";
import Signup from "./Signup";
import { connect } from "react-redux";
import DelayingScreen from "./DelayingScreen";

const LoginSignupPage = (props) => {
  const [mainBtn, mainBtnUpdate] = useState(true);
  const mainBtnUpdater = (val) => mainBtnUpdate(val);

  return (
    <View style={styles.container}>
      {props.zIndexVisibility != -1 && <DelayingScreen />}
      {/* Heading Container */}
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text>Welcome from PPL!</Text>
        {/* <Text> {id + "\n"}</Text> */}
      </View>
      <View style={styles.hrLine} />
      {/* Main Body Container */}

      <View style={[styles.container, { flex: 8 }]}>
        <ScrollView
          contentContainerStyle={{
            width: Dimensions.get("window").width,
          }}
        >
          {mainBtn ? (
            <SignIn switchTab={mainBtnUpdater} />
          ) : (
            <Signup switchTab={mainBtnUpdater} />
          )}
        </ScrollView>
      </View>

      {/* Bottom postion for login_signup switch */}
      <View style={[styles.hrLine, { width: "80%" }]} />
      <TouchableWithoutFeedback onPress={() => mainBtnUpdater(!mainBtn)}>
        <View style={[styles.container, { flex: 1 }]}>
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

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

export default connect((states) => {
  return {
    zIndexVisibility: states.zIndex.value,
  };
}, null)(LoginSignupPage);
