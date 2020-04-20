import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {PostUploadCall} from '../AxiosCalls';
import {getDataFromStorage} from '../asyncStorage';
import {setZIndex} from '../REDUX/actions/zIndexAction';
import DelayingScreen from './DelayingScreen';
const AllCategory = ['Rabbit', 'DOG', 'RAT'];

const UploadPostTopPortion = props => {
  const [imageUrl, imageUrlUpdate] = useState(false);
  const [category, categoryUpdate] = useState(false);
  const [uploadAlert, uploadAlertUpdater] = useState(false);
  const [title, titleUpdate] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', e => {
      try {
        // e.preventDefault();
        console.log('update Clicked');
        titleUpdate('');
        imageUrlUpdate({});
        categoryUpdate(false);
      } catch (e) {}
    });
    return unsubscribe;
  }, [props.navigation]);

  const handlePhotoUpload = async () => {
    try {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!pickerResult.cancelled) {
        delete pickerResult.cancelled;
        imageUrlUpdate(pickerResult);
      }
    } catch (err) {
      console.log(err, 'ERROR AT IMAGE PICKER UPLOADING POST');
    }
  };

  const handleUploadButton = async () => {
    uploadAlertUpdater(false);
    try {
      if (title.trim() != '' && category && imageUrl) {
        props.setZIndex(10);
        let {
          _id,
          data: {username},
        } = JSON.parse(await getDataFromStorage());

        let {
          data: {result},
        } = await PostUploadCall({
          uploadedBy: {_id, username},
          title,
          category,
          photo: imageUrl,
        });
        console.log(result, '<<<response');
        props.navigation.navigate('home');
      } else {
        console.log('No POST to Upload');
        uploadAlertUpdater(true);
      }
    } catch (err) {
      console.log(err, 'ERORR');
    }
    props.setZIndex(-1);
  };

  return (
    <>
      <DelayingScreen />
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View style={{paddingTop: 10, borderBottomWidth: 2, marginBottom: 15}}>
          <Text style={{fontSize: 16}}>Upload Post</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              position: 'relative',
            }}>
            <View
              style={{
                position: 'absolute',
                opacity: 0.5,
                width: 100,
                height: 100,
                backgroundColor: 'white',
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback onPress={handlePhotoUpload}>
                <View>
                  <Text>Click To</Text>
                  <Text>{imageUrl ? 'Change' : 'Upload'}</Text>
                  <Text>Photo</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            {imageUrl && (
              <Image
                source={imageUrl}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  borderColor: 'black',
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.uploadPostTextFields}>
              <Text>Title</Text>
              <TextInput
                onChangeText={text => titleUpdate(text)}
                value={title}
                style={{borderBottomWidth: 1, backgroundColor: '#e0e0e0'}}
              />
            </View>
            <View style={{flex: 1}} />
            <View style={styles.uploadPostTextFields}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) =>
                  categoryUpdate(itemValue)
                }>
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
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <TouchableWithoutFeedback
            onPress={() => {
              props.AnimateUploadBtn();
              // console.log(props);
            }}
          >
            <View style={[styles.topPortionBtn]}>
              <Text style={{ fontSize: 14, color: "white" }}>BACK</Text>
            </View>
          </TouchableWithoutFeedback> */}
          <TouchableWithoutFeedback onPress={handleUploadButton}>
            <View style={[styles.topPortionBtn]}>
              <Text style={{fontSize: 14, color: 'white'}}>UPLOAD</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{marginTop: '15%'}}>
          <Text>{uploadAlert ? 'Please Fill All Details' : ''}</Text>
        </View>
      </View>
    </>
  );
};
export default connect(
  null,
  {setZIndex},
)(UploadPostTopPortion);

const styles = StyleSheet.create({
  uploadPostTextFields: {
    flex: 10,
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#f3f3f3',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  topPortionBtn: {
    minWidth: '75%',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee830d',
  },
});
