import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { removeDataFromStorage } from "../asyncStorage";
import FooterBarProfile from "./FooterBarProfile";
import MyAllPosts from "./MyAllPosts";
import { toogleTopPorton } from "../REDUX/actions/topPortionAction";
const Profile = props => {
  try {
    delete props.data.password;
  } catch (e) {}

  const [SwipAnim] = useState(new Animated.Value(100));
  const [SwipAnimUpload] = useState(new Animated.Value(100));
  const [SwipAnimFilter] = useState(new Animated.Value(100));

  const AnimateUploadBtn = (val = "def") => {
    console.log(SwipAnimUpload, "<<upload");
    Animated.timing(SwipAnimUpload, {
      toValue:
        val !== "def" ? val : JSON.stringify(SwipAnimUpload) === "0" ? 100 : 0,
      duration: 200
    }).start();
  };

  const AnimateFilterBtn = (val = "def") => {
    Animated.timing(SwipAnimFilter, {
      toValue:
        val !== "def" ? val : JSON.stringify(SwipAnimFilter) === "0" ? 100 : 0,
      duration: 200
    }).start();
  };

  const SwipAnimFunction = () => {
    Animated.timing(SwipAnim, {
      toValue: JSON.stringify(SwipAnim) === "0" ? 100 : 0,
      duration: 200
    }).start();
  };

  const logout = () => {
    removeDataFromStorage();
    props.getData("Logout");
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.behindNavbar,
          {
            right: SwipAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"]
            })
          }
        ]}
      >
        <Text style={styles.navtext}>Home</Text>
        <Text style={styles.navtext}>Profile</Text>
        <Text style={styles.navtext} onPress={logout}>
          Logout
        </Text>
      </Animated.View>
      <TopNavBarBtn_ SwipAnimFunction={SwipAnimFunction} />

      <View
        style={[{ flex: 1, justifyContent: "center", alignContent: "center" }]}
      >
        <Text>Heading</Text>
      </View>

      {/* MaIN BODY POSTS */}
      <MainBodyContent
        SwipAnimUpload={SwipAnimUpload}
        SwipAnimFilter={SwipAnimFilter}
      />
      {/* BOTTOM BNS */}

      <FooterBarProfile
        AnimateFilterBtn={AnimateFilterBtn}
        AnimateUploadBtn={AnimateUploadBtn}
      />
    </View>
  );
};

const TopNavBarBtn_ = props => {
  const [RotateAnim] = useState(new Animated.Value(0));
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.SwipAnimFunction();
        Animated.timing(RotateAnim, {
          toValue: JSON.stringify(RotateAnim) === "0" ? -11 / 7 : 0,
          duration: 200
        }).start();
      }}
    >
      <Animated.View
        style={[
          styles.topNavBtnContainer,
          { transform: [{ rotateZ: RotateAnim }] }
        ]}
      >
        <View style={styles.topNavBtn}>
          <View style={[styles.text]}>
            <Text>X</Text>
          </View>
          <View style={[styles.text]}>
            <Text>B</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default connect(state => {
  return { AllPosts: state.post.data };
}, null)(Profile);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  uploadFilterButtons: {
    position: "absolute",
    backgroundColor: "#ffa21d",
    width: "100%",
    bottom: 0,
    right: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
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
    textAlign: "center"
  },
  behindNavbar: {
    flex: 1,
    zIndex: 5,
    width: "100%",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffa21d"
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
    zIndex: 5
  },
  topNavBtn: {
    flexDirection: "row",
    flex: 1,
    maxHeight: "50%"
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    position: "relative"
  },
  PostContainer: {
    flex: 10,
    backgroundColor: "silver"
  }
});

const MainBodyContent_ = props => {
  // console.log(, "<<");
  return (
    <View style={[styles.container, styles.PostContainer]}>
      <MyAllPosts />
      <Animated.View
        style={[
          styles.uploadFilterButtons,
          {
            right: props.SwipAnimUpload.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"]
            })
          }
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.toogleTopPorton("post");
            // console.log("This is upload btn", props.topVal);
          }}
        >
          <Text style={[styles.navtext]}>Upload Post</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            props.toogleTopPorton("category");
            // console.log("This is Add Category btn");
          }}
        >
          <Text style={[styles.navtext]}>Add Category</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          styles.uploadFilterButtons,
          {
            backgroundColor: "#ffa21d",
            right: props.SwipAnimFilter.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "-100%"]
            })
          }
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("This is btn1");
          }}
        >
          <Text style={[styles.navtext]}>Latest First</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("This is btn2");
          }}
        >
          <Text style={[styles.navtext]}>Oldest First</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("This is btn3");
          }}
        >
          <Text style={[styles.navtext]}>Most Liked</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("This is btn4");
          }}
        >
          <Text style={[styles.navtext]}>Most Commented</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

const MainBodyContent = connect(
  ({ topPortion: { value: topVal } }) => {
    return { topVal };
  },
  { toogleTopPorton }
)(MainBodyContent_);
