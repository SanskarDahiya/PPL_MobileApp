import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import { like_comment } from "../AxiosCalls";
import { getDataFromStorage } from "../asyncStorage";
import { connect } from "react-redux";
import { updatePostAtIndex } from "../REDUX/actions/mypostAction";

const USERIMAGE = require("../images/ppl/img_6.png");
const bottomIcons = [
  require(`../images/ppl/icon_001.png`),
  require(`../images/ppl/icon_004.png`),
  require(`../images/ppl/icon_003.png`),
  require(`../images/ppl/icon_002.png`),
  require(`../images/ppl/icon_003.png`),
];

const POSTWRAPPER = (originalprops) => {
  const [props, propsUpdater] = useState({ ...originalprops });
  useEffect(() => {
    UpdateDataAtRedux();
  }, [props]);
  // convert nanosecond to datetime
  let postDateTime = new Date(0);
  if (props.createdDate) {
    // postDateTime = new Date(props.createdDate._seconds * 1000);
    postDateTime.setSeconds(props.createdDate._seconds + 5 * 60 * 60 + 30 * 60);
  }

  // Setting photo height
  const screenWidth = Math.round(Dimensions.get("window").width);
  let PhotoHeight = 100;
  if (props.photo)
    PhotoHeight = (props.photo.height / props.photo.width) * screenWidth - 20;
  const UpdateDataAtRedux = () => {
    try {
      if (props.isSinglePost) {
        let data = { ...props };
        delete data.isSinglePost;
        delete data.updatePostAtIndex;
        props.updatePostAtIndex(data);
        console.log("Data UPDATE redux");
      }
    } catch (e) {}
  };
  const ToSinglePost = (_id = false) => {
    console.log("To Single Post");
    if (_id && !props.isSinglePost) {
      console.log("Done");
      props.ToSinglePost("singlepost", { ...props });
    }
  };
  const handelBottomButtons = async (name, comment = false) => {
    try {
      let userdata = JSON.parse(await getDataFromStorage());
      if (!userdata) {
        throw new Error("user data not found");
      }
      switch (name) {
        case 1:
          // COMMENT
          if (!props.isSinglePost) {
            ToSinglePost(props._id);
          } else {
            console.log("Comment Clicked");
            if (comment) {
              console.log("Comment Data>> ", comment);
              let allComments = props.comments;
              allComments.push({
                data: comment,
                uploadedBy: {
                  _id: userdata._id,
                  username: userdata.data.username,
                },
              });

              like_comment({
                postid: props._id,
                method: "comments",
                data: [...allComments],
              });
              props.comments = [...allComments];
              propsUpdater({ ...props, comments: [...allComments] });
            }
            // like_comment({
            //   method: "comment",
            //   postId: props._id,
            //   userId: userdata._id,
            //   commentid: props.comments._id
            // });
          }
          break;
        case 2:
          let likes = new Set(props.likes);
          if (likes.has(userdata._id)) {
            console.log("Unliked");
            likes.delete(userdata._id);
          } else {
            console.log("Liked");
            likes.add(userdata._id);
          }
          like_comment({
            postid: props._id,
            method: "like",
            data: [...likes],
          });
          props.likes = [...likes];
          propsUpdater({ ...props, likes: [...likes] });
          break;
        default:
          console.log("No Action for id", name);
          alert("We are working on it.");
          break;
      }
    } catch (err) {}
  };

  return (
    <View style={styles.MainBody}>
      <View style={styles.topline}></View>
      {/* TOP PORTION */}
      <View style={styles.topPortion}>
        <Text style={styles.title}>{props.title || "POST TITLE"}</Text>
        <View style={styles.categori}>
          <Text style={{ color: "white" }}>{props.category || "Unknown"}</Text>
        </View>
      </View>

      {/* USER INFFO */}
      <View style={styles.userInfo_dateTime}>
        {/* User */}
        <View style={[{ flex: 1, flexDirection: "row", alignItems: "center" }]}>
          <Image source={USERIMAGE} style={{ height: 25, width: 20 }} />
          <Text style={{ paddingLeft: 15, fontSize: 12, color: "#6f6f6f" }}>
            {props.uploadedBy?.username || "username"}
          </Text>
        </View>

        {/* DATE TIME */}
        <View
          style={[
            {
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
            },
          ]}
        >
          <Text style={{ color: "#6f6f6f", fontSize: 11, paddingLeft: 10 }}>
            {postDateTime.toISOString().split("T")[0] || "Date"}
            {" : "}
            {postDateTime
              .toISOString()
              .split("T")[1]
              .split(".")[0]
              .slice(
                0,
                postDateTime
                  .toISOString()
                  .split("T")[1]
                  .split(".")[0]
                  .lastIndexOf(":")
              ) || "Time"}
          </Text>
        </View>
      </View>
      {/* POST */}
      <View
        style={[
          {
            flex: 1,
            borderWidth: 1,
            borderColor: "white",
            width: "100%",
            minHeight: 200,
            // minHeight:100,
            backgroundColor: "#f3f3f3",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            ToSinglePost(props._id);
          }}
        >
          {/* POST IMAGE */}
          {props.photo ? (
            <Image
              source={{
                uri: props.photo?.uri || "",
              }}
              style={{
                flex: 1,
                width: "100%",
                resizeMode: "contain",
                minHeight: PhotoHeight,
              }}
            />
          ) : (
            <View></View>
          )}
        </TouchableWithoutFeedback>
      </View>
      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomBtns}>
        {[
          { name: "Share" },
          {
            name:
              props.comments && props.comments.length >= 10
                ? props.comments.length + " Comments"
                : (props.comments?.length || 0) + " Comment",
          },
          {
            name:
              props.likes && props.likes.length >= 10
                ? props.likes.length + " Likes"
                : (props.likes?.length || 0) + " Like",
          },
        ].map((val, id) => (
          <TouchableWithoutFeedback
            key={id}
            onPress={() => handelBottomButtons(id)}
          >
            <View style={styles.btmButton}>
              <Image source={bottomIcons[id]} style={{ marginRight: 4 }} />
              <Text style={{ color: "white" }}>{val.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      {props.isSinglePost && (
        <CommentWrapper
          handelBottomButtons={handelBottomButtons}
          comments={props.comments}
        />
      )}
    </View>
  );
};

export default connect(null, { updatePostAtIndex })(POSTWRAPPER);

const styles = StyleSheet.create({
  MainBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1eff2",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: "#e87818",
    marginTop: 10,
  },
  userInfo_dateTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topPortion: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    color: "#e87818",
    fontSize: 20,
    lineHeight: 20,
    paddingVertical: 5,
  },
  categori: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#ee830d",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderLeftColor: "#f3891f",
    borderLeftWidth: 4,
  },
  btmButton: {
    backgroundColor: "#f3891f",
    flexDirection: "row",
    borderColor: "#ee830d",
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: "1%",
    paddingVertical: "0.5%",
  },
  bottomBtns: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  topline: {
    width: "100%",
  },
});

const CommentWrapper = (props) => {
  const [comment, commentUpdater] = useState("");
  const [alert, alertUpdater] = useState({});
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <Text>Comments</Text> */}
      {props.comments.map((val, id) => (
        <View
          key={id}
          style={{
            flex: 1,
            marginTop: 5,
            borderWidth: 1,
            paddingTop: 10,
            paddingHorizontal: 4,
          }}
        >
          <View style={[{ flex: 1, flexDirection: "row" }]}>
            <Image source={USERIMAGE} style={{ height: 25, width: 20 }} />
            <Text style={{ paddingLeft: 15, fontSize: 12, color: "#6f6f6f" }}>
              {val.uploadedBy?.username || "username"}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text>{val.data || "Unable to load comment"}</Text>
          </View>
        </View>
      ))}
      <View style={{ flex: 1, marginTop: 5 }}>
        <View style={[{ flex: 1, flexDirection: "row" }]}></View>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <TextInput
            placeholder={"Enter Comment"}
            onChangeText={(text) => {
              commentUpdater(text);
            }}
            value={comment.toString()}
            style={[
              {
                borderWidth: 1,
                borderColor: "grey",
                paddingHorizontal: 10,
                paddingVertical: 10,
              },
              alert,
            ]}
          />
          <Button
            title={"comment"}
            onPress={() => {
              if (comment.trim() == "") {
                alertUpdater({
                  borderWidth: 2,
                  borderColor: "red",
                });
                setTimeout(() => {
                  alertUpdater({});
                }, 1000);
              } else {
                props.handelBottomButtons(1, comment.trim());
                commentUpdater("");
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
