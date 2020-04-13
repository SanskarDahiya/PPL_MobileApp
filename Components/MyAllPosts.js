import React, { useState, useEffect, useReducer } from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import POSTWRAPPER from "./POSTWRAPPER";
import { toogleTopPorton } from "../REDUX/actions/topPortionAction";
import { connect } from "react-redux";
import { getPosts } from "../AxiosCalls";
import { setZIndex } from "../REDUX/actions/zIndexAction";
import { setAllPost } from "../REDUX/actions/mypostAction";
import UploadPostTopPortion from "./ProfileUpload";

let isToTop = true,
  isToBottom = false;

const MyAllPosts = (props) => {
  let scrollViewRef = false;

  useEffect(() => {
    try {
      scrollViewRef.scrollTo({ x: 0, animated: true });
    } catch (e) {}
  }, [props.getAllPosts]);
  useEffect(() => {
    const unsubscribe = props.route.params.listen("tabPress", (e) => {
      try {
        if (props.navigation.isFocused()) {
          // e.preventDefault();
          console.log("Homebtn Clicked", isToTop);
          scrollViewRef.scrollTo({ x: 0, animated: true });

          if (isToTop) {
            RefreshNewPost();
          }
        }
      } catch (e) {}
    });
    return unsubscribe;
  }, [props.navigation]);

  const getNewPosts = async (len = 0) => {
    try {
      let {
        data: { result },
      } = await getPosts(len);
      if (!result) {
        throw new Error("No Post Available");
      }
      props.setAllPost([...result]);
      console.log("POST UPDATED", result.length);
      props.setZIndex(-1);
    } catch (err) {
      console.log(err, "error in getting post");
      alert("Unable to Fetch Post");
    }
  };

  const RefreshNewPost = () => {
    props.setZIndex(10);
    getNewPosts(0);
  };

  function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  function isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    return contentOffset.y == 0;
  }

  useEffect(() => {
    props.setZIndex(10);
    getNewPosts();
  }, []);

  return (
    <View>
      <ScrollView
        ref={(ref) => {
          if (!scrollViewRef) {
            scrollViewRef = ref;
          }
        }}
        style={{ width: "100%", borderWidth: 1, flex: 1 }}
        onScroll={({ nativeEvent }) => {
          //Setting Value to false
          isToBottom = false;
          isToTop = false;

          if (isCloseToTop(nativeEvent)) {
            //do something
            isToTop = true;
            console.log("top", isToTop);
          }
          if (isCloseToBottom(nativeEvent)) {
            //do something
            console.log("bottom");
            isToBottom = true;
          }
        }}
      >
        {props.getAllPosts.map((value, _id) => (
          <POSTWRAPPER
            index={_id}
            key={value._id}
            {...value}
            ToSinglePost={props.navigation.navigate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default connect(
  ({ post: { data }, topPortion: { value: topVal } }) => {
    return { topVal, getAllPosts: data };
  },
  { toogleTopPorton, setZIndex, setAllPost }
)(MyAllPosts);

const AddCategoryTopPortion = (props) => {
  return (
    <View>
      <Text>This is Add Category Portion</Text>
      <Text></Text>
      <Button
        title="BACK"
        onPress={() => {
          props.toogleTopPorton(false);
          props.AnimateUploadBtn();
        }}
      />
    </View>
  );
};
