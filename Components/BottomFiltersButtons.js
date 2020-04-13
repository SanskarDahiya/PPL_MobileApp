import React from "react";
import {
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { setAllPost } from "../REDUX/actions/mypostAction";
import { filterData } from "../AxiosCalls";
import { setZIndex } from "../REDUX/actions/zIndexAction";
import { PostFilterAction } from "../REDUX/actions/postFilterMenu";

const BottomFiltersButtons = (props) => {
  const updatePost = (data) => {
    props.AnimateFilterBtn();
    props.setZIndex(10);
    filterData(data)
      .then(({ data: { result: res } }) => {
        props.setAllPost(res);
        props.setZIndex(-1);
      })
      .catch((err) => {
        console.log(err, "error");
        props.setZIndex(-1);
      });
    props.PostFilterAction(data);
  };
  return (
    <Animated.View
      style={[
        styles.uploadFilterButtons,
        {
          backgroundColor: "#ffa21d",
          right: props.SwipAnimFilter.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "-100%"],
          }),
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("This is btn1");
          updatePost({
            filter: "createdDate",
            order: -1,
          });
        }}
      >
        <Text style={[styles.navtext]}>Latest First</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("This is btn2");
          updatePost({
            filter: "createdDate",
            offset: 0,
            order: 1,
          });
        }}
      >
        <Text style={[styles.navtext]}>Oldest First</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("This is btn3");
          updatePost({
            filter: "likes.length",
            offset: 0,
          });
        }}
      >
        <Text style={[styles.navtext]}>Most Liked</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("This is btn4");
          updatePost({
            filter: "comments.length",
            offset: 0,
          });
        }}
      >
        <Text style={[styles.navtext]}>Most Commented</Text>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default connect(null, { PostFilterAction, setAllPost, setZIndex })(
  BottomFiltersButtons
);

const styles = StyleSheet.create({
  uploadFilterButtons: {
    position: "absolute",
    backgroundColor: "#ffa21d",
    width: "100%",
    bottom: 0,
    right: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
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
    textAlign: "center",
  },
});
