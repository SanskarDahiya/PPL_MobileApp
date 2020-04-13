import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import Cstmtextbox from "./Cstmtextbox";
import styles from "../css/styles";
import { addDataToStorage } from "../asyncStorage";
import { LoginCall } from "../AxiosCalls";
import { setZIndex } from "../REDUX/actions/zIndexAction";
import { connect } from "react-redux";

function SignIN(props) {
  let isUserRegistering = false;
  const [username, usernameUpdater] = useState("");
  const [password, passwordUpdater] = useState("");
  const [usernameAlert, usernameAlertUpdater] = useState("");
  const [passwordAlert, passwordAlertUpdater] = useState("");

  useEffect(() => {
    usernameAlertUpdater("");
  }, [username]);

  useEffect(() => {
    passwordAlertUpdater("");
  }, [password]);

  const checkDetails = () => {
    if (username.trim() === "") usernameAlertUpdater("Required");
    if (password.trim() === "") passwordAlertUpdater("Required");
    if (password.trim() !== "" && username.trim() !== "") return true;
    return false;
  };

  const userLoggingFunction = async () => {
    try {
      isUserRegistering = true;
      if (checkDetails()) {
        passwordAlertUpdater("");
        usernameAlertUpdater("");
        props.setZIndex(10);
        let res = await LoginCall({ username, password });
        if (res.data.result) {
          if (res.data.result === "Invalid Password")
            passwordAlertUpdater("Incorrect Password");
          else if (res.data.result === "User not found")
            usernameAlertUpdater("Invalid Username");
          else {
            if (res.data.result._id) {
              console.log("Sucessfull");
              props.setZIndex(10);
              await addDataToStorage(JSON.stringify(res.data.result));
              props.setZIndex(-1);
              props.getData(res.data.result);
            } else {
              alert("Please try after some time");
            }
          }
        }
      }
    } catch (err) {
      console.log(err, "Error");
    }
    isUserRegistering = false;
    props.setZIndex(-1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* UserName */}
        <Cstmtextbox
          Updater={usernameUpdater}
          topData={username.trim() !== "" ? "Username" : ""}
          placeholder="Enter Username"
          Alertmsg={usernameAlert}
        />
        {/* Password */}
        <Cstmtextbox
          Updater={passwordUpdater}
          topData={password.trim() !== "" ? "Password" : ""}
          placeholder="Enter Password"
          Alertmsg={passwordAlert}
          isPassword={true}
        />

        <View style={styles.content}>
          <Text></Text>
          <Button
            title="Login"
            onPress={() => {
              if (!isUserRegistering) {
                userLoggingFunction();
                console.log("This is Btn");
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default connect(null, { setZIndex })(SignIN);
