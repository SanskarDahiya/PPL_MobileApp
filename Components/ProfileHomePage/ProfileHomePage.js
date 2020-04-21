import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import FooterBarProfile from './FooterBarProfile';
import MyAllPosts from './MyAllPosts';
import {setZIndex} from '../../REDUX/actions/zIndexAction';
import BottomFiltersButtons from './BottomFiltersButtons';
import DelayingScreen from '../DelayingScreen';

const ProfileHomePage = props => {
  const [SwipAnimUpload] = useState(new Animated.Value(100));
  const [SwipAnimFilter] = useState(new Animated.Value(100));

  const AnimateUploadBtn = (val = 'def') => {
    console.log(SwipAnimUpload, '<<upload');
    Animated.timing(SwipAnimUpload, {
      toValue:
        val !== 'def' ? val : JSON.stringify(SwipAnimUpload) === '0' ? 100 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const AnimateFilterBtn = (val = 'def') => {
    Animated.timing(SwipAnimFilter, {
      toValue:
        val !== 'def' ? val : JSON.stringify(SwipAnimFilter) === '0' ? 100 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // {props.zIndexVisibility != -1 && <DelayingScreen />}
  return (
    <>
      <DelayingScreen />
      <View style={[styles.container]}>
        {/* TOP PORTION */}
        {/* MaIN BODY POSTS */}
        <MainBodyContent
          {...props}
          SwipAnimUpload={SwipAnimUpload}
          SwipAnimFilter={SwipAnimFilter}
          AnimateFilterBtn={AnimateFilterBtn}
          AnimateUploadBtn={AnimateUploadBtn}
        />

        {/* BOTTOM BNS */}
        <FooterBarProfile
          AnimateFilterBtn={AnimateFilterBtn}
          AnimateUploadBtn={AnimateUploadBtn}
        />
      </View>
    </>
  );
};

export default connect(
  state => {
    return {zIndexVisibility: state.zIndex.value};
  },
  {setZIndex},
)(ProfileHomePage);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  uploadFilterButtons: {
    position: 'absolute',
    backgroundColor: '#ffa21d',
    width: '100%',
    bottom: 0,
    right: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  navtext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: 'white',
    width: '100%',
    borderBottomWidth: 5,
    color: 'white',
    textAlign: 'center',
  },
  behindNavbar: {
    flex: 1,
    zIndex: 5,
    width: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa21d',
  },
  topNavBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: -75,
    left: -75,
    backgroundColor: '#ffa21d',
    minHeight: 150,
    minWidth: 150,
    borderRadius: 100,
    zIndex: 5,
  },
  topNavBtn: {
    flexDirection: 'row',
    flex: 1,
    maxHeight: '50%',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'relative',
  },
  PostContainer: {
    flex: 10,
    backgroundColor: 'silver',
  },
});

const MainBodyContent_ = props => {
  // console.log(, "<<");
  return (
    <View style={[styles.container, styles.PostContainer]}>
      {/* MAIN BODY POSTS */}
      <MyAllPosts {...props} />

      {/* FOOTER BUTTONS FOR UPLOAS */}
      <Animated.View
        style={[
          styles.uploadFilterButtons,
          {
            right: props.SwipAnimUpload.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Text style={[styles.navtext]}>Upload Post</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            // console.log("This is Add Category btn");
          }}>
          <Text style={[styles.navtext]}>Add Category</Text>
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* FOOTER BUTTONS FOR FILTER */}
      <BottomFiltersButtons
        SwipAnimFilter={props.SwipAnimFilter}
        AnimateFilterBtn={props.AnimateFilterBtn}
      />
    </View>
  );
};

const MainBodyContent = connect(
  null,
  null,
)(MainBodyContent_);
