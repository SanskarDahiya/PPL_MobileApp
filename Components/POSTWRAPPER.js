import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { like_comment } from "../AxiosCalls";
import { getDataFromStorage } from "../asyncStorage";

const bottomIcons = [
  require(`../images/ppl/icon_001.png`),
  require(`../images/ppl/icon_002.png`),
  require(`../images/ppl/icon_004.png`),
  require(`../images/ppl/icon_003.png`),
  require(`../images/ppl/icon_003.png`)
];

const POSTWRAPPER = originalprops => {
  const [props, propsUpdater] = useState({ ...originalprops });
  let postDateTime = new Date();
  if (props.createdDate)
    postDateTime = new Date(props.createdDate._seconds * 1000);
  const screenWidth = Math.round(Dimensions.get("window").width);
  let PhotoHeight = 100;
  if (props.photo)
    PhotoHeight = (props.photo.height / props.photo.width) * screenWidth - 20;

  const handelBottomButtons = async name => {
    try {
      let userdata = JSON.parse(await getDataFromStorage());
      if (!userdata) {
        throw new Error("user data not found");
      }
      switch (name) {
        case 1:
          console.log("COMMNETS");
          // like_comment({
          //   method: "comment",
          //   postId: props._id,
          //   userId: userdata._id,
          //   commentid: props.comments._id
          // });
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
            data: [...likes]
          });
          props.likes = [...likes];
          propsUpdater({ ...props, likes: [...likes] });
          break;
        default:
          console.log("name", name);
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
          <Image
            source={require("../images/ppl/img_6.png")}
            style={{ height: 25, width: 20 }}
          />
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
              justifyContent: "flex-end"
            }
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
            // minHeight:100,
            backgroundColor: "#f3f3f3",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10
          }
        ]}
      >
        {/* POST IMAGE */}
        <Image
          source={{
            uri: props.photo?.uri || ""
          }}
          style={{
            flex: 1,
            width: "100%",
            resizeMode: "contain",
            minHeight: PhotoHeight
          }}
        />
      </View>
      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomBtns}>
        {[
          { name: "Share" },
          { name: "Comments" },
          {
            name:
              props.likes && props.likes.length >= 10
                ? props.likes.length + " Likes"
                : props.likes.length + " Like"
          }
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
      <View>{props.isSinglePost && <Text>These are comments</Text>}</View>
    </View>
  );
};

export default POSTWRAPPER;

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
    marginTop: 10
  },
  userInfo_dateTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  topPortion: {
    flexDirection: "row"
  },
  title: {
    flex: 1,
    color: "#e87818",
    fontSize: 20,
    lineHeight: 20
  },
  categori: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#ee830d",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderLeftColor: "#f3891f",
    borderLeftWidth: 4
  },
  btmButton: {
    backgroundColor: "#f3891f",
    flexDirection: "row",
    borderColor: "#ee830d",
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: "1%",
    paddingVertical: "0.5%"
  },
  bottomBtns: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row"
  },
  topline: {
    width: "100%"
  }
});
