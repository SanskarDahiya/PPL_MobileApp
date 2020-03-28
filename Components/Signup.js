import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import styles from "../css/styles";
import Cstmtextbox from "./Cstmtextbox";
import { SignupCall } from "../AxiosCalls";
import { connect } from "react-redux";
import { setZIndex } from "../REDUX/actions/zIndexAction";

function Login(props) {
  let isUserLogging = false;
  const [username, usernameUpdater] = useState("");
  const [password, passwordUpdater] = useState("");
  const [email, emailUpdater] = useState("");
  const [fName, fNameUpdater] = useState("");
  const [lName, lNameUpdater] = useState("");
  const [emailAlert, emailAlertUpdater] = useState("");
  const [fNameAlert, fNameAlertUpdater] = useState("");
  const [lNameAlert, lNameAlertUpdater] = useState("");
  const [usernameAlert, usernameAlertUpdater] = useState("");
  const [passwordAlert, passwordAlertUpdater] = useState("");

  useEffect(() => {
    usernameAlertUpdater("");
  }, [username]);

  useEffect(() => {
    emailAlertUpdater("");
  }, [email]);

  useEffect(() => {
    lNameAlertUpdater("");
  }, [lName]);

  useEffect(() => {
    fNameAlertUpdater("");
  }, [fName]);

  useEffect(() => {
    passwordAlertUpdater("");
  }, [password]);

  const checkDetails = () => {
    let emailValidate = true;
    let passwordValidate = true;
    if (username.trim() === "") usernameAlertUpdater("Required");
    if (email.trim() === "") emailAlertUpdater("Required");
    if (fName.trim() === "") fNameAlertUpdater("Required");
    if (lName.trim() === "") lNameAlertUpdater("Required");
    if (password.trim() === "") passwordAlertUpdater("Required");
    if (password.length < 8 && password.trim() != "") {
      passwordValidate = false;
      passwordAlertUpdater("Min Length = 8");
    }
    if (
      email.trim() != "" &&
      email.match(
        /^([a-zA-Z0-9_\-\\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      ) === null
    ) {
      emailValidate = false;
      emailAlertUpdater("Invalid Email");
    }
    if (
      passwordValidate &&
      emailValidate &&
      email.trim() !== "" &&
      fName.trim() !== "" &&
      lName.trim() !== "" &&
      password.trim() !== "" &&
      username.trim() !== ""
    )
      return true;
    return false;
  };

  const userLoggingFunction = async () => {
    props.setZIndex(10);
    try {
      isUserLogging = true;
      if (checkDetails()) {
        passwordAlertUpdater("");
        usernameAlertUpdater("");
        let {
          data: { result = false }
        } = await SignupCall({
          username,
          password,
          firstname: fName,
          lastname: lName,
          email
        });
        console.log(result, "<<<");
        if (result) {
          if (result === "User Already Registered") {
            usernameAlertUpdater("Username or Email Already Exists");
            emailAlertUpdater("Username or Email Already Exists");
          } else {
            console.log("Register Sucessfull");
          }
        } else {
          alert("Database Error");
        }
      }
    } catch (err) {
      console.log(err, "Error");
    }
    isUserLogging = false;
    props.setZIndex(-1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* FirstName */}
        <Cstmtextbox
          Updater={fNameUpdater}
          topData={fName !== "" ? "Firstname" : ""}
          placeholder="Enter Firstname"
          Alertmsg={fNameAlert}
        />
        {/* LastName */}
        <Cstmtextbox
          Updater={lNameUpdater}
          topData={lName !== "" ? "Lastname" : ""}
          placeholder="Enter Lastname"
          Alertmsg={lNameAlert}
        />
        {/* UserName */}
        <Cstmtextbox
          Updater={usernameUpdater}
          topData={username.trim() !== "" ? "Username" : ""}
          placeholder="Enter Username"
          Alertmsg={usernameAlert}
        />
        {/* EmailName */}
        <Cstmtextbox
          Updater={emailUpdater}
          topData={email.trim() !== "" ? "Email" : ""}
          placeholder="Enter Email"
          Alertmsg={emailAlert}
          maxLength={50}
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
            title="Signup"
            onPress={() => {
              if (!isUserLogging) {
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

export default connect(null, { setZIndex })(Login);
