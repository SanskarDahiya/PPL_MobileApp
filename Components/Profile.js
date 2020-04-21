import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import ProfileHomePage from './ProfileHomePage/ProfileHomePage';
import ProfileUpload from './PostUploadSection/ProfileUpload';
import POSTWRAPPER from './ProfileHomePage/POSTWRAPPER';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileUser from './ProfileUser';
const Tab = createBottomTabNavigator();
const profileStack = createStackNavigator();

const ProfileHomeDivider = props => {
  // console.log("Profile Divider......", props.route.params);
  const singlePostWrapper = props => {
    console.log(props.route.params._id, 'singlepost wrapper');
    return (
      <ScrollView>
        <POSTWRAPPER {...props.route.params} isSinglePost={true} />
      </ScrollView>
    );
  };

  return (
    <profileStack.Navigator initialRouteName="allpost" headerMode="none">
      <profileStack.Screen
        name="allpost"
        component={ProfileHomePage}
        initialParams={{listen: props.navigation.addListener}}
        options={{
          title: '',
          headerStyle: {
            height: 0,
          },
        }}
      />
      <profileStack.Screen
        name="singlepost"
        component={singlePostWrapper}
        options={{
          title: '',
          headerStyle: {
            // height: 0,
          },
        }}
      />
    </profileStack.Navigator>
  );
};

const ProfileUserDivider = props => {
  // console.log("UserProfileDivider", props.route.params);
  const singlePostWrapper = props => {
    console.log(props.route.params._id, 'singlepost wrapper');
    return (
      <ScrollView>
        <POSTWRAPPER {...props.route.params} isSinglePost={true} />
      </ScrollView>
    );
  };

  return (
    <profileStack.Navigator initialRouteName="userprofile" headerMode="none">
      <profileStack.Screen
        name="userprofile"
        component={ProfileUser}
        initialParams={{
          ...props.route.params,
          addListenToTab: props.navigation.addListener,
        }}
        options={{
          title: '',
          headerStyle: {
            height: 0,
          },
        }}
      />
      <profileStack.Screen
        name="tosinglepost"
        component={singlePostWrapper}
        options={{
          title: '',
          headerStyle: {
            height: 0,
          },
        }}
      />
    </profileStack.Navigator>
  );
};

const Profile = props => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 10,
        },
      }}>
      <Tab.Screen
        name="home"
        component={ProfileHomeDivider}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="upload"
        component={ProfileUpload}
        options={{
          tabBarLabel: 'UPLOAD',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileUserDivider}
        initialParams={{...props.route.params}}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Profile;
