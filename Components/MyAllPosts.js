import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Picker,
  TextInput
} from "react-native";
import POSTWRAPPER from "./POSTWRAPPER";
import { toogleTopPorton } from "../REDUX/actions/topPortionAction";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { PostUploadCall, getPosts } from "../AxiosCalls";
import { getDataFromStorage } from "../asyncStorage";
import { setZIndex } from "../REDUX/actions/zIndexAction";

const AllCategory = ["Rabbit", "DOG"];

let AllPosts = [
  {
    title: "Hello There... Misti Doi",
    categoryName: "RABBIT",
    postDate: "04 Mar 2020",
    postTime: "06:32pm",
    allLikes: ["5e4f7d5cca8d92219ddf413a", "5e68d6ca727f015033f2875b"],
    allUnlikes: [],
    allFlags: [],
    comments: [{ _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: ":P" }],
    _id: "5e60f84ceeeb8a347612d8ec3",
    userid: "5e4f7d5cca8d92219ddf413a",
    userName: "ABCD PQR",
    postImage: "b.png"
  },
  {
    title: "twitty :)",
    categoryName: "OTHERS",
    postDate: "05 Mar 2020",
    postTime: "03:40pm",
    allLikes: [
      "5e5f6ce6237c360b99f65398",
      "5e4f7d5cca8d92219ddf413a",
      "5e68d6ca727f015033f2875b"
    ],
    allUnlikes: [],
    allFlags: [],
    comments: [
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "hi twitty"
      },
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "kaim choooo"
      },
      {
        _id: "5e4a38fc3ad75c674ea54cd8",
        username: "admin",
        value: "Tweety Sweety"
      },
      { _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: "zZ" }
    ],
    _id: "5e62217e5380593a379d21be3",
    userid: "5e621f5c5380593a379d21ba",
    userName: "nancy arora",
    postImage: "a.png"
  },
  {
    title: "Hello There... Misti Doi",
    categoryName: "RABBIT",
    postDate: "04 Mar 2020",
    postTime: "06:32pm",
    allLikes: ["5e4f7d5cca8d92219ddf413a", "5e68d6ca727f015033f2875b"],
    allUnlikes: [],
    allFlags: [],
    comments: [{ _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: ":P" }],
    _id: "5e60f84ceeeb8a347612d8ec2",
    userid: "5e4f7d5cca8d92219ddf413a",
    userName: "ABCD PQR",
    postImage: "b.png"
  },
  {
    title: "twitty :)",
    categoryName: "OTHERS",
    postDate: "05 Mar 2020",
    postTime: "03:40pm",
    allLikes: [
      "5e5f6ce6237c360b99f65398",
      "5e4f7d5cca8d92219ddf413a",
      "5e68d6ca727f015033f2875b"
    ],
    allUnlikes: [],
    allFlags: [],
    comments: [
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "hi twitty"
      },
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "kaim choooo"
      },
      {
        _id: "5e4a38fc3ad75c674ea54cd8",
        username: "admin",
        value: "Tweety Sweety"
      },
      { _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: "zZ" }
    ],
    _id: "5e62217e5380593a379d21be2",
    userid: "5e621f5c5380593a379d21ba",
    userName: "nancy arora",
    postImage: "a.png"
  },
  {
    title: "Hello There... Misti Doi",
    categoryName: "RABBIT",
    postDate: "04 Mar 2020",
    postTime: "06:32pm",
    allLikes: ["5e4f7d5cca8d92219ddf413a", "5e68d6ca727f015033f2875b"],
    allUnlikes: [],
    allFlags: [],
    comments: [{ _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: ":P" }],
    _id: "5e60f84ceeeb8a347612d8ec1",
    userid: "5e4f7d5cca8d92219ddf413a",
    userName: "ABCD PQR",
    postImage: "b.png"
  },
  {
    title: "twitty :)",
    categoryName: "OTHERS",
    postDate: "05 Mar 2020",
    postTime: "03:40pm",
    allLikes: [
      "5e5f6ce6237c360b99f65398",
      "5e4f7d5cca8d92219ddf413a",
      "5e68d6ca727f015033f2875b"
    ],
    allUnlikes: [],
    allFlags: [],
    comments: [
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "hi twitty"
      },
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "kaim choooo"
      },
      {
        _id: "5e4a38fc3ad75c674ea54cd8",
        username: "admin",
        value: "Tweety Sweety"
      },
      { _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: "zZ" }
    ],
    _id: "5e62217e5380593a379d21be1",
    userid: "5e621f5c5380593a379d21ba",
    userName: "nancy arora",
    postImage: "a.png"
  },
  {
    title: "Hello There... Misti Doi",
    categoryName: "RABBIT",
    postDate: "04 Mar 2020",
    postTime: "06:32pm",
    allLikes: ["5e4f7d5cca8d92219ddf413a", "5e68d6ca727f015033f2875b"],
    allUnlikes: [],
    allFlags: [],
    comments: [{ _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: ":P" }],
    _id: "5e60f84ceeeb8a347612d8ec",
    userid: "5e4f7d5cca8d92219ddf413a",
    userName: "ABCD PQR",
    postImage: "b.png"
  },
  {
    title: "twitty :)",
    categoryName: "OTHERS",
    postDate: "05 Mar 2020",
    postTime: "03:40pm",
    allLikes: [
      "5e5f6ce6237c360b99f65398",
      "5e4f7d5cca8d92219ddf413a",
      "5e68d6ca727f015033f2875b"
    ],
    allUnlikes: [],
    allFlags: [],
    comments: [
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "hi twitty"
      },
      {
        _id: "5e621f5c5380593a379d21ba",
        username: "nancy",
        value: "kaim choooo"
      },
      {
        _id: "5e4a38fc3ad75c674ea54cd8",
        username: "admin",
        value: "Tweety Sweety"
      },
      { _id: "5e4f7d5cca8d92219ddf413a", username: "1", value: "zZ" }
    ],
    _id: "5e62217e5380593a379d21be",
    userid: "5e621f5c5380593a379d21ba",
    userName: "nancy arora",
    postImage: "a.png"
  }
];

const MyAllPosts = props => {
  console.log("THIS IS ALL POSTS");
  const [isHasMoreDataToRender, isHasMoreDataToRenderUpdated] = useState(true);
  let isNewAddInserted = true;
  const [postToBeDisplayed, postToBeDisplayedUpdater] = useState([]);
  const getNewPosts = async () => {
    let {
      data: { result }
    } = await getPosts(postToBeDisplayed.length);
    if (result.length != 5) {
      isHasMoreDataToRenderUpdated(false);
    }
    postToBeDisplayedUpdater([...postToBeDisplayed, ...result]);
    props.setZIndex(-1);
  };

  const RefreshNewPost = () => {
    postToBeDisplayedUpdater([]);
    getNewPosts();
  };
  useEffect(() => {
    // props.setZIndex(10);
    // getNewPosts();
  }, []);

  useEffect(() => {
    console.log("Setting it to true again", postToBeDisplayed.length);
    console.log("has More data", isHasMoreDataToRender);
    isNewAddInserted = true;
  }, [postToBeDisplayed]);
  const getTopPortion = () => {
    switch (props.topVal) {
      case "post":
        return (
          <UploadPostTopPortion {...props} RefreshNewPost={RefreshNewPost} />
        );
      case "category":
        return <AddCategoryTopPortion {...props} />;
      default:
        return <View></View>;
    }
  };
  function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  function isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    return contentOffset.y == 0;
  }
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f3f3"
        }}
      >
        {getTopPortion()}
      </View>
      <ScrollView
        style={{ width: "100%", borderWidth: 1, flex: 1 }}
        onScroll={({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent)) {
            //do something
            console.log("top");
          }
          if (isCloseToBottom(nativeEvent)) {
            //do something
            if (isNewAddInserted && isHasMoreDataToRender) {
              isNewAddInserted = false;
              console.log("bottom");
            }
          }
        }}
      >
        {postToBeDisplayed.map((value, id) => (
          <POSTWRAPPER key={id} {...value} />
        ))}
      </ScrollView>
    </View>
  );
};

export default connect(
  ({ topPortion: { value: topVal } }) => {
    return { topVal };
  },
  { toogleTopPorton, setZIndex }
)(MyAllPosts);

const AddCategoryTopPortion = props => {
  return (
    <View>
      <Text>This is Add Category Portion</Text>
      <Text></Text>
      <Button
        title="BACK"
        onPress={() => {
          props.toogleTopPorton(false);
        }}
      />
    </View>
  );
};
const UploadPostTopPortionCode = props => {
  const [imageUrl, imageUrlUpdate] = useState();
  const [category, categoryUpdate] = useState();
  const [title, titleUpdate] = useState();

  const [imageUrlAlert, imageUrlAlertUpdate] = useState();
  const [categoryAlert, categoryAlertUpdate] = useState();
  const [titleAlert, titleAlertUpdate] = useState();
  const handlePhotoUpload = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      delete pickerResult.cancelled;
      imageUrlUpdate(pickerResult);
    }
  };

  const handleUploadButton = async () => {
    props.setZIndex(10);
    try {
      if (title && category && imageUrl) {
        let {
          _id,
          data: { username }
        } = JSON.parse(await getDataFromStorage());

        let {
          data: { result }
        } = await PostUploadCall({
          uploadedBy: { _id, username },
          title,
          category,
          photo: imageUrl
        });
        console.log(result, "<<<response");
        props.toogleTopPorton(false);
        props.RefreshNewPost();
      } else {
        console.log("No POST to Upload");
      }
    } catch (err) {
      console.log(err, "ERORR");
    }
    props.setZIndex(-1);
  };

  return (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ paddingTop: 10, borderBottomWidth: 2, marginBottom: 15 }}>
        <Text style={{ fontSize: 16 }}>Upload Post</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            position: "relative"
          }}
        >
          <View
            style={{
              position: "absolute",
              opacity: 0.5,
              width: 100,
              height: 100,
              backgroundColor: "white",
              zIndex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback onPress={handlePhotoUpload}>
              <View>
                <Text>Click To</Text>
                <Text>{imageUrl ? "Change" : "Upload"}</Text>
                <Text>Photo</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Image
            source={imageUrl}
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: "black"
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.uploadPostTextFields}>
            <Text>Title</Text>
            <TextInput
              onChangeText={text => titleUpdate(text.trim())}
              style={{ borderBottomWidth: 1, backgroundColor: "#e0e0e0" }}
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={styles.uploadPostTextFields}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) =>
                categoryUpdate(itemValue)
              }
            >
              <Picker.Item label="SELECT CATEGORY" value={false} />
              {AllCategory.map((val, id) => {
                val = val.toUpperCase();
                return <Picker.Item key={id} label={val} value={val} />;
              })}
              <Picker.Item value="OTHERS" label="OTHERS" />
            </Picker>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly"
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            props.toogleTopPorton(false);
          }}
        >
          <View style={[styles.topPortionBtn]}>
            <Text style={{ fontSize: 14, color: "white" }}>BACK</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleUploadButton}>
          <View style={[styles.topPortionBtn]}>
            <Text style={{ fontSize: 14, color: "white" }}>UPLOAD</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const UploadPostTopPortion = connect(null, { setZIndex })(
  UploadPostTopPortionCode
);

const styles = StyleSheet.create({
  uploadPostTextFields: {
    flex: 10,
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#f3f3f3",
    borderBottomWidth: 1,
    justifyContent: "center"
  },
  topPortionBtn: {
    width: "25%",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ee830d"
  }
});
