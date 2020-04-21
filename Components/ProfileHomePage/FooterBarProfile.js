import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';

const FooterBarProfile = props => {
  return (
    <View style={[styles.footer]}>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          props.AnimateUploadBtn();
          props.AnimateFilterBtn(100);
        }}
      >
        <View style={[styles.bottomBtn, { width: "100%" }]}>
          <Text>UPLOAD</Text>
        </View>
      </TouchableWithoutFeedback> */}
      <TouchableWithoutFeedback
        onPress={() => {
          props.AnimateFilterBtn();
          // props.AnimateUploadBtn(100);
        }}>
        <View style={[styles.bottomBtn, {width: '100%'}]}>
          <Text>FILTER</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default connect(
  null,
  null,
)(FooterBarProfile);

const styles = StyleSheet.create({
  bottomBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
});
