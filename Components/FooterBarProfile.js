import React from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { toogleTopPorton } from "../REDUX/actions/topPortionAction";

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

const FooterBarProfile = props => {
  return (
    <View style={styles.footer}>
      {/* <GestureRecognizer
        onSwipeUp={() => {
          console.log("Up");
          props.AnimateUploadBtn(0);
          props.AnimateFilterBtn(100);
        }}
        onSwipeDown={() => {
          console.log("Down");
          props.AnimateUploadBtn(100);
        }}
        style={[styles.bottomBtn]}
        config={config}
      > */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.toogleTopPorton(false);
          props.AnimateUploadBtn();
          props.AnimateFilterBtn(100);
        }}
      >
        <View style={[styles.bottomBtn, { width: "100%" }]}>
          <Text>UPLOAD</Text>
        </View>
      </TouchableWithoutFeedback>
      {/* </GestureRecognizer>

      <GestureRecognizer
        style={[styles.bottomBtn]}
        onSwipeUp={() => {
          console.log("Up");
          props.AnimateFilterBtn(0);
          props.AnimateUploadBtn(100);
        }}
        onSwipeDown={() => {
          console.log("Down");
          props.AnimateFilterBtn(100);
        }}
        config={config}
      > */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.toogleTopPorton(false);
          props.AnimateFilterBtn();
          props.AnimateUploadBtn(100);
        }}
      >
        <View style={[styles.bottomBtn, { width: "100%" }]}>
          <Text>FILTER</Text>
        </View>
      </TouchableWithoutFeedback>
      {/* </GestureRecognizer> */}
    </View>
  );
};

export default connect(null, { toogleTopPorton })(FooterBarProfile);
const styles = StyleSheet.create({
  bottomBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    position: "relative"
  }
});
