import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../css/styles";
const Cstmtextbox = props => {
  //   console.log(props);
  return (
    <View style={styles.content}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.placeholder]}>
          {props.topData.trim() !== "" ? props.topData : ""}
        </Text>
        <Text style={[styles.alertMsg]}>
          {props.Alertmsg ? props.Alertmsg + " !" : ""}
        </Text>
      </View>
      <TextInput
        style={[styles.textbox]}
        maxLength={props.maxLength || 20}
        placeholder={props.placeholder || "Enter Data"}
        placeholderTextColor="#696969"
        onChangeText={text => props.Updater(text)}
        secureTextEntry={props.isPassword || false}
      />
    </View>
  );
};

export default Cstmtextbox;
