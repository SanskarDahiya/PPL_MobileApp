import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { removeDataFromStorage } from "../asyncStorage";
import { filterData } from "../AxiosCalls";
import { setZIndex } from "../REDUX/actions/zIndexAction";
import { connect } from "react-redux";
import { setAllPost } from "../REDUX/actions/mypostAction";

const TopNavigationSide = (props) => {
  const [RotateAnim] = useState(new Animated.Value(0));
  const [SwipAnim] = useState(new Animated.Value(100));

  const SwipAnimFunction = (duration = 200) => {
    Animated.timing(SwipAnim, {
      toValue: JSON.stringify(SwipAnim) === "0" ? 100 : 0,
      duration,
    }).start();
  };

  const logout = () => {
    removeDataFromStorage();
    props.logout();
  };
  const HomePage = () => {
    props.setZIndex(10);
    filterData({
      filter: "createdDate",
      order: -1,
    })
      .then(({ data: { result: res } }) => {
        props.setAllPost(res);
        props.setZIndex(-1);
      })
      .catch((err) => {
        console.log(err, "error");
        props.setZIndex(-1);
      });
  };
  return (
    <>
      <Animated.View
        style={[
          styles.behindNavbar,
          {
            right: SwipAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            HomePage();
            SwipAnimFunction(500);
          }}
        >
          <Text style={styles.navtext}>Home</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.navtext}>Profile</Text>
        <Text style={styles.navtext} onPress={logout}>
          Logout
        </Text>
      </Animated.View>
      <TouchableWithoutFeedback
        onPress={() => {
          SwipAnimFunction();
        }}
      >
        <Animated.View
          style={[
            styles.topNavBtnContainer,
            { transform: [{ rotateZ: RotateAnim }] },
          ]}
        >
          <View style={styles.topNavBtn}>
            <View style={[styles.text]}>
              <Text>{"X"}</Text>
            </View>
            <View style={[styles.text]}>
              <Text>B</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};
export default connect(null, {
  setAllPost,
  setZIndex,
})(TopNavigationSide);
const styles = StyleSheet.create({
  navtext: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "white",
    width: "100%",
    borderBottomWidth: 5,
    color: "white",
    textAlign: "center",
  },
  behindNavbar: {
    flex: 1,
    zIndex: 5,
    width: "100%",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffa21d",
  },
  topNavBtnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    top: -75,
    left: -75,
    backgroundColor: "#ffa21d",
    minHeight: 150,
    minWidth: 150,
    borderRadius: 100,
    zIndex: 5,
  },
  topNavBtn: {
    flexDirection: "row",
    flex: 1,
    maxHeight: "50%",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
