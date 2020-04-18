import React, {useState, useEffect} from 'react';
import {Animated, View, Text, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
var interval;
const DelayingScreen = props => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  const [rotate1] = useState(new Animated.Value(0));
  const [zIndex, zIndexUpdater] = useState(-1);
  // console.log(rotate1, "<><>", props);

  const AnimationCode = () => {
    if (props.zIndex == -1) {
      window.clearInterval(interval);
    }
    console.log('TO 360');
    Animated.timing(rotate1, {
      toValue: 360,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      console.log('TO 0');
      Animated.timing(rotate1, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };
  useEffect(() => {
    if (props.zIndex != -1) {
      AnimationCode();
      window.clearInterval(interval);
      interval = setInterval(() => {
        AnimationCode();
      }, 4000);
    } else {
      window.clearInterval(interval);
    }
    return function cleanup() {
      window.clearInterval(interval);
    };
  }, [props.zIndex]);

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          right: 0,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.backgroundColor || 'grey',
          width: screenWidth,
          height: screenHeight,
          zIndex: props.zIndex || -1,
          opacity: props.backgroundColor ? 1 : 0.8,
        },
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                scaleX: rotate1.interpolate({
                  inputRange: [0, 360],
                  outputRange: [1, 1.2],
                }),
              },
              {
                scaleY: rotate1.interpolate({
                  inputRange: [0, 360],
                  outputRange: [1, 1.2],
                }),
              },
              {
                rotate: rotate1.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            borderColor: '#ee830d',

            transform: [
              {
                scaleX: rotate1.interpolate({
                  inputRange: [0, 360],
                  outputRange: [1.5, 1],
                }),
              },
              {
                scaleY: rotate1.interpolate({
                  inputRange: [0, 360],
                  outputRange: [1.5, 1],
                }),
              },
              {
                rotate: rotate1.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['225deg', '45deg'],
                }),
              },
            ],
          },
        ]}
      />
      <Text style={{color: 'white'}}>LOADING</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    borderWidth: 5,
    borderRadius: 15,
    height: 100,
    width: 100,
    borderColor: 'orange',
  },
});
export default connect(
  states => {
    return {zIndex: states.zIndex.value};
  },
  null,
)(DelayingScreen);
