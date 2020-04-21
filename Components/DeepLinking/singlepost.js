import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import POSTWRAPPER from '../ProfileHomePage/POSTWRAPPER';
import DelayingScreen from '../DelayingScreen';
import {connect} from 'react-redux';
import {setZIndex} from '../../REDUX/actions/zIndexAction';
import {getPostById} from '../../AxiosCalls';
import {ScrollView} from 'react-native-gesture-handler';

const singlepost = props => {
  let _id = props.route.params.postid || false;
  if (!_id) {
    BACK();
    return null;
  }
  let isAllowed = props.route.params.isAllowed;
  const [postData, postDataUpdater] = useState(false);
  const BACK = () => {
    props.navigation.navigate(isAllowed ? 'PPL' : 'PPL LOGIN/SIGNUP');
  };

  useEffect(() => {
    if (_id) {
      props.setZIndex(10);
      getPostById(_id)
        .then(({data: {result}}) => {
          props.setZIndex(-1);
          if (result.error) {
            alert('Invalid URL');
            BACK();
          } else {
            console.log('data', result);
            postDataUpdater({...result[0]});
          }
        })
        .catch(err => {
          props.setZIndex(-1);
          console.log('error for post');
          alert('Invalid URL');
          BACK();
        });
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <DelayingScreen />
      <ScrollView>
        {/* <Text>
          1234324
          {JSON.stringify(props.route.params) || 342}
        </Text> */}
        {postData && (
          <POSTWRAPPER externalUrl={true} {...postData} isSinglePost={true} />
        )}
      </ScrollView>
    </View>
  );
};

export default connect(
  null,
  {setZIndex},
)(singlepost);
