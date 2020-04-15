import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {removeDataFromStorage} from '../asyncStorage';
import DelayingScreen from './DelayingScreen';
import {userLoggedOutAction} from '../REDUX/actions/loginSingupAction';
import {getUserPosts} from '../AxiosCalls';

const Mobilewidth = Dimensions.get('window').width;
const MobileHeight = Dimensions.get('window').height;
const RESET_REDUX_DATA = () => {
  return {
    type: 'RESET',
  };
};
let scrollViewRef_ = false;
const ProfileUser = props => {
  let isPostFetchingFromDb = false;
  const [isMorePostAvailable, isMorePostAvailableU] = useState(true);
  const [thisUserPost, thisUserPostUpdater] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = props.route.params.addListenToTab('tabPress', e => {
        // e.preventDefault();
        console.log('ProfileBtn Clicked');
        scrollViewRef_.scrollTo({x: 0, animated: true});
      });
      return unsubscribe;
    } catch (e) {}
  }, [props.navigation]);

  const addSinglePostOnClick = data => {
    props.navigation.navigate('tosinglepost', {...data});
  };

  const LOGOUT = () => {
    removeDataFromStorage();
    props.userLoggedOutAction();
    props.RESET_REDUX_DATA();
  };
  const getPostFromDb = async () => {
    try {
      let _id = props.loginAuthReducer?.userData?._id || '',
        offset = thisUserPost.length || 0;
      let {
        data: {result},
      } = await getUserPosts(_id, offset);
      if (result) {
        if (result.length == 0) {
          isMorePostAvailableU(false);
        } else {
          thisUserPostUpdater([...thisUserPost, ...result]);

          console.log(result.length, 'data recived', isMorePostAvailable);
        }
      }
    } catch (err) {
      console.log(err, 'err aios call db');
    }
    isPostFetchingFromDb = false;
  };

  useEffect(() => {
    console.log('updating new post', thisUserPost.length, isMorePostAvailable);
    getPostFromDb();
  }, []);

  const isNearToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - MobileHeight / 2
    );
  };

  return (
    <>
      <DelayingScreen backgroundColor="white" />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          ref={ref => {
            scrollViewRef_ = ref;
          }}
          onScroll={({nativeEvent}) => {
            if (isNearToBottom(nativeEvent)) {
              // console.log("bottom,userproifle");
              if (!isPostFetchingFromDb && isMorePostAvailable) {
                isPostFetchingFromDb = true;
                getPostFromDb();
              }
            }
          }}
          style={{width: '100%', borderWidth: 1, flex: 1}}>
          <UserMenu {...props.loginAuthReducer.userData} LOGOUT={LOGOUT} />
          <Text style={{borderBottomWidth: 1, width: '100%'}} />
          <UserPost
            posts={thisUserPost}
            addSinglePostOnClick={addSinglePostOnClick}
          />
        </ScrollView>
      </View>
    </>
  );
};

// export default ProfileUser;

export default connect(
  ({post: {data}, loginAuthReducer}) => {
    return {getAllPosts: data, loginAuthReducer};
  },
  {userLoggedOutAction, RESET_REDUX_DATA},
)(ProfileUser);

const UserMenu = props => {
  let selfData = props.data || {};
  delete selfData.password;
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          paddingVertical: 16,
        }}>
        Hello {selfData.firstname + ' ' + selfData.lastname}
      </Text>
      <View>
        {['username', 'email'].map((val, id) => {
          let returning_data = <></>;
          try {
            returning_data = (
              <View
                key={id + 'UserDetails'}
                style={[
                  {
                    flexDirection: 'row',
                    width: '100%',
                    borderWidth: 1,
                    padding: 10,
                  },
                ]}>
                <Text style={{width: '25%'}}>{val}</Text>
                <Text>:</Text>
                <Text style={{fontWeight: 'bold'}}>{props.data[val]}</Text>
              </View>
            );
          } catch (e) {
            returning_data = <View key={id + 'UserDetails'} />;
          }
          return returning_data;
        })}
      </View>
      <TouchableOpacity onPress={props.LOGOUT}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'lightgrey',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
          }}>
          <Text>LOGOUT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const UserPost = props => {
  return (
    <View style={[styles.parentWrap]}>
      {props.posts.map((value, _id) => (
        <TouchableOpacity
          style={[styles.smallPostCover]}
          key={value._id + 'UP' || _id + 'UP'}
          onPress={() => {
            console.log('btn Presed');
            props.addSinglePostOnClick(value);
            // props.navigation.navigate("singlepost");
          }}>
          <Image
            source={{uri: value.photo.uri}}
            style={{width: '100%', height: '100%', margin: 0.5}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  parentWrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  smallPostCover: {
    flex: 1,
    flexBasis: '30%',
    margin: 0.5,
    borderWidth: 1,
    maxWidth: Mobilewidth / 3 - 3,
    height: Mobilewidth / 3,
  },
});
