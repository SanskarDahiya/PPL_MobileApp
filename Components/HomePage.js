import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {getDataFromStorage} from '../asyncStorage';
import LoginSignupPage from './UserLoginSignup/LoginSignupPage';
import Profile from './Profile';
import {connect} from 'react-redux';
import {setZIndex} from '../REDUX/actions/zIndexAction';
import {createStackNavigator} from '@react-navigation/stack';
import DelayingScreen from './DelayingScreen';
import {
  userLoggedOutAction,
  userLoggedInAction,
} from '../REDUX/actions/loginSingupAction';
import singlepost from './DeepLinking/singlepost';

const Stack = createStackNavigator();
const RESET_REDUX_DATA = () => {
  return {
    type: 'RESET',
  };
};

function HomePage(props) {
  const getData = async (data = false) => {
    if (data) {
      props.setZIndex(-1);
      console.log('Setting data', data);
      props.userLoggedOutAction();
    } else {
      try {
        let res = await getDataFromStorage();
        props.setZIndex(-1);
        let data = JSON.parse(res);
        if (data) {
          console.log('Data found in db', data);
          props.userLoggedInAction(data);
        } else {
          props.userLoggedOutAction();
        }
      } catch (err) {
        props.userLoggedOutAction();
        console.log(err);
      }
    }
  };
  const INITILIZE_APP = () => {
    setTimeout(() => {
      getData();
    }, 1500);
    props.RESET_REDUX_DATA();
    console.log('REDUX DATA RESET');
    // props.setZIndex(10);
  };

  useEffect(() => {
    INITILIZE_APP();
  }, []);

  if (props.loginAuthReducer.isSearching) {
    props.setZIndex(10);
  }

  return (
    <Stack.Navigator>
      
      {props.loginAuthReducer.isSearching ? (
        <Stack.Screen
          name="searching"
          component={DelayingScreen}
          options={{
            title: '',
            headerStyle: {
              height: 0,
            },
          }}
        />
      ) : props.loginAuthReducer.isAllowed ? (
        // THis is Profile Page
        <Stack.Screen name="PPL" component={Profile} />
      ) : (
        // Login Page
        <Stack.Screen name="PPL LOGIN/SIGNUP" component={LoginSignupPage} />
      )}
      <Stack.Screen
        name="singlepost_id"
        component={singlepost}
        initialParams={{isAllowed: props.loginAuthReducer.isAllowed}}
      />
    </Stack.Navigator>
  );
}
export default connect(
  ({loginAuthReducer}) => {
    return {loginAuthReducer};
  },
  {setZIndex, RESET_REDUX_DATA, userLoggedInAction, userLoggedOutAction},
)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  hrLine: {
    borderColor: 'orange',
    borderBottomWidth: 2,
    width: '95%',
    height: 0,
  },
});
