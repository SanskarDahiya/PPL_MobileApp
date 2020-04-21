import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  TextInput,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native';
import styles from '../../css/styles';
import Video from 'react-native-video';

import {like_comment} from '../../AxiosCalls';
import {getDataFromStorage} from '../../asyncStorage';
import {connect} from 'react-redux';
import {updatePostAtIndex} from '../../REDUX/actions/mypostAction';
import {DownloadVideo, getDownloadedFile} from '../SaveOffline/download';

const USERIMAGE = require('../../images/ppl/img_6.png');
const bottomIcons = [
  require('../../images/ppl/icon_001.png'),
  require('../../images/ppl/icon_004.png'),
  require('../../images/ppl/icon_003.png'),
  require('../../images/ppl/icon_002.png'),
  require('../../images/ppl/icon_003.png'),
];
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const POSTWRAPPER = originalprops => {
  const [props, propsUpdater] = useState({...originalprops});
  useEffect(() => {
    UpdateDataAtRedux();
  }, [props]);
  // convert nanosecond to datetime
  let postDateTime = new Date(0);
  if (props.createdDate) {
    // postDateTime = new Date(props.createdDate._seconds * 1000);
    postDateTime.setSeconds(props.createdDate._seconds + 5 * 60 * 60 + 30 * 60);
  }

  // Setting photo height
  let PhotoHeight = 100;
  if (props.photo && props.photo.height) {
    PhotoHeight = (props.photo.height / props.photo.width) * (screenWidth - 20);
  }
  let PhotoWidth = screenWidth - 20;
  // if (props.photo && props.photo.width) {
  //   PhotoWidth = (props.photo.width / props.photo.height) * screenHeight - 20;
  // }
  const UpdateDataAtRedux = () => {
    try {
      if (props.isSinglePost && !props.externalUrl) {
        let data = {...props};
        delete data.isSinglePost;
        delete data.updatePostAtIndex;
        props.updatePostAtIndex(data);
        console.log('Data UPDATE redux');
      }
    } catch (e) {}
  };
  const ToSinglePost = (_id = false) => {
    console.log('To Single Post');
    if (_id && !props.isSinglePost) {
      console.log('Done');
      props.ToSinglePost('singlepost', {...props});
    }
  };
  const handelBottomButtons = async (name, comment = false) => {
    try {
      let userdata = JSON.parse(await getDataFromStorage());
      if (!userdata) {
        throw new Error('user data not found');
      }
      switch (name) {
        case 1:
          // COMMENT
          if (!props.isSinglePost) {
            ToSinglePost(props._id);
          } else {
            console.log('Comment Clicked');
            if (comment) {
              let allComments = props.comments;
              allComments.data.push({
                data: comment,
                uploadedBy: {
                  _id: userdata._id,
                  username: userdata.data.username,
                },
              });
              allComments.length += 1;

              like_comment({
                method: 'comments',
                ...allComments,
              });
              // props.comments = [...allComments];
              propsUpdater({...props, comments: allComments});
              console.log('Comment Data>> ', comment);
            }
            // like_comment({
            //   method: "comment",
            //   postId: props._id,
            //   userId: userdata._id,
            //   commentid: props.comments._id
            // });
          }
          break;
        case 2:
          let likesL = props.likes.length;
          let likes = new Set(props.likes.data);
          if (likes.has(userdata._id)) {
            console.log('Unliked');
            likesL -= 1;
            likes.delete(userdata._id);
          } else {
            console.log('Liked');
            likesL += 1;
            likes.add(userdata._id);
          }
          console.log({
            method: 'like',
            ...props.likes,
            length: likesL,
            data: [...likes],
          });

          like_comment({
            method: 'like',
            ...props.likes,
            length: likesL,
            data: [...likes],
          });
          // props.likes.data = [...likes];
          propsUpdater({
            ...props,
            likes: {...props.likes, length: likesL, data: [...likes]},
          });
          break;
        default:
          console.log('No Action for id', name);
          alert('We are working on it.');
          break;
      }
    } catch (err) {
      if (err.message.toString().search('user data') >= 0) {
        alert('Please Login');
      }
    }
  };

  return (
    <View style={styles.MainBody}>
      <View style={styles.topline} />
      {/* TOP PORTION */}
      <View style={styles.topPortion}>
        <Text style={styles.title}>{props.title || 'POST TITLE'}</Text>
        <View style={styles.categori}>
          <Text style={{color: 'white'}}>{props.category || 'Unknown'}</Text>
        </View>
      </View>

      {/* USER INFFO */}
      <View style={styles.userInfo_dateTime}>
        {/* User */}
        <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}]}>
          <Image source={USERIMAGE} style={{height: 25, width: 20}} />
          <Text style={{paddingLeft: 15, fontSize: 12, color: '#6f6f6f'}}>
            {props.uploadedBy?.username || 'username'}
          </Text>
        </View>

        {/* DATE TIME */}
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            },
          ]}>
          <Text style={{color: '#6f6f6f', fontSize: 11, paddingLeft: 10}}>
            {postDateTime.toISOString().split('T')[0] || 'Date'}
            {' : '}
            {postDateTime
              .toISOString()
              .split('T')[1]
              .split('.')[0]
              .slice(
                0,
                postDateTime
                  .toISOString()
                  .split('T')[1]
                  .split('.')[0]
                  .lastIndexOf(':'),
              ) || 'Time'}
          </Text>
        </View>
      </View>
      {/* POST */}
      <View
        style={[
          {
            flex: 1,
            borderWidth: 1,
            borderColor: 'white',
            Width: '100%',
            minHeight: 200,
            minWidth: screenWidth / 2,
            backgroundColor: '#f3f3f3',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          },
        ]}>
        {/* POST IMAGE */}
        {props.photo ? (
          props.photo.type.toString().search('video') >= 0 ? (
            <CustomizeVideoComponent
              {...props.photo}
              isSinglePost={props.isSinglePost}
              ToSinglePost={() => ToSinglePost(props._id)}
            />
          ) : (
            <CustomImageComponent
              ToSinglePost={() => {
                ToSinglePost(props._id);
              }}
              {...{
                uri: props.photo.uri,
                filename: props.photo.filename,
                height: PhotoHeight,
                width: PhotoWidth,
              }}
            />
          )
        ) : (
          <View>
            <Text>No Image</Text>
          </View>
        )}
      </View>
      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomBtns}>
        {[
          {name: 'Share'},
          {
            name:
              props.comments && props.comments.length >= 10
                ? props.comments.length + ' Comments'
                : (props.comments?.length || 0) + ' Comment',
          },
          {
            name:
              props.likes && props.likes['length'] >= 10
                ? props.likes['length'] + ' Likes'
                : ((props.likes && props.likes['length']) || 0) + ' Like',
          },
        ].map((val, id) => (
          <TouchableWithoutFeedback
            key={id}
            onPress={() => handelBottomButtons(id)}>
            <View style={styles.btmButton}>
              <Image source={bottomIcons[id]} style={{marginRight: 4}} />
              <Text style={{color: 'white'}}>{val.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      {props.isSinglePost && props.comments && props.comments.data && (
        <CommentWrapper
          handelBottomButtons={handelBottomButtons}
          comments={props.comments.data}
        />
      )}
    </View>
  );
};

export default connect(
  null,
  {updatePostAtIndex},
)(POSTWRAPPER);

const CommentWrapper = props => {
  const [comment, commentUpdater] = useState('');
  const [alert, alertUpdater] = useState({});
  return (
    <View style={{flex: 1, width: '100%'}}>
      {/* <Text>Comments</Text> */}
      {props.comments.map((val, id) => (
        <View
          key={id}
          style={{
            flex: 1,
            marginTop: 5,
            borderWidth: 1,
            paddingTop: 10,
            paddingHorizontal: 4,
          }}>
          <View style={[{flex: 1, flexDirection: 'row'}]}>
            <Image source={USERIMAGE} style={{height: 25, width: 20}} />
            <Text style={{paddingLeft: 15, fontSize: 12, color: '#6f6f6f'}}>
              {val.uploadedBy?.username || 'username'}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}>
            <Text>{val.data || 'Unable to load comment'}</Text>
          </View>
        </View>
      ))}
      <View style={{flex: 1, marginTop: 5}}>
        <View style={[{flex: 1, flexDirection: 'row'}]} />

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          <TextInput
            placeholder={'Enter Comment'}
            onChangeText={text => {
              commentUpdater(text);
            }}
            value={comment.toString()}
            style={[
              {
                borderWidth: 1,
                borderColor: 'grey',
                paddingHorizontal: 10,
                paddingVertical: 10,
              },
              alert,
            ]}
          />
          <Button
            title={'comment'}
            onPress={() => {
              if (comment.trim() == '') {
                alertUpdater({
                  borderWidth: 2,
                  borderColor: 'red',
                });
                setTimeout(() => {
                  alertUpdater({});
                }, 1000);
              } else {
                props.handelBottomButtons(1, comment.trim());
                commentUpdater('');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const CustomizeVideoComponent = props => {
  let refVideo = false;
  const [showOverlayScreen, showOverlayScreenUpdater] = useState(
    props.isSinglePost,
  );
  const [videoUri, videoUriUpdater] = useState(props.uri);
  const [currentVideoTime, currentVideoTimeUpdater] = useState(0);
  const [isVideoPaused, isVideoPausedUpdater] = useState(true);
  const [videoDimention, videoDimentionUpdater] = useState({
    width: '100%',
    height: '100%',
  });
  const [videoTimeProgress, videoTimeProgressUpdater] = useState('00:00/00:00');

  const onLoadVideo = ({naturalSize}) => {
    let photoHeight = (naturalSize.height / naturalSize.width) * screenWidth;
    videoDimentionUpdater({width: '100%', height: photoHeight});
    console.log(naturalSize, 'onLoad');
  };
  useEffect(() => {
    if (refVideo) {
      refVideo.seek(currentVideoTime);
    }
  }, [videoUri]);
  useEffect(() => {
    showOverlayScreenUpdater(!isVideoPaused);
  }, [isVideoPaused]);
  const onProgressVideo = ({
    currentTime,
    seekableDuration,
    playableDuration,
  }) => {
    currentVideoTimeUpdater(currentTime);

    currentTime = new Date(currentTime * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0]
      .toString();

    playableDuration = new Date(playableDuration * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0]
      .toString();
    seekableDuration = new Date(seekableDuration * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0]
      .toString();
    videoTimeProgressUpdater(currentTime + '/' + seekableDuration);
  };

  useEffect(() => {
    console.log('123');
    getDownloadedFile(props.filename, (err, data) => {
      if (data) {
        videoUriUpdater(data);
      }
    });
    return () => {
      console.log('Component unMount');
    };
  }, []);
  return (
    <>
      {!showOverlayScreen && (
        <TouchableNativeFeedback
          onPress={() => {
            if (props.isSinglePost) {
              //We will play video herr
              console.log('press');
              isVideoPausedUpdater(!isVideoPaused);
            } else {
              props.ToSinglePost();
            }
          }}>
          <View
            style={{
              position: 'absolute',
              borderWidth: 2,
              borderColor: 'blue',
              height: '100%',
              width: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 4,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                borderWidth: 5,
                borderRadius: 50,
                height: 100,
                width: 100,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {isVideoPaused ? 'Click to play' : 'click to pause'}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )}

      <TouchableNativeFeedback
        onPress={() => {
          isVideoPausedUpdater(!isVideoPaused);
          console.log('press', isVideoPaused);
        }}>
        <View
          style={[
            {
              width: '100%',
              flex: 1,
            },
          ]}>
          {props.isSinglePost && (
            <Video
              source={{uri: videoUri, catch: true}} // Can be a URL or a local file.
              ref={ref => {
                refVideo = ref;
              }}
              onBuffer={() => {
                console.log('buffer');
              }}
              onError={() => {
                console.log('Vide Error');
              }}
              // controls={true}
              onEnd={() => {
                console.log('Video ENd here');
                isVideoPausedUpdater(true);
                refVideo && refVideo.seek(0);
              }}
              paused={isVideoPaused}
              onProgress={onProgressVideo}
              onLoad={onLoadVideo}
              onLoadStart={() => {
                console.log('onLoadStart');
                isVideoPausedUpdater(false);
              }}
              resizeMode="contain"
              // onBuffer={this.onBuffer} // Callback when remote video is buffering
              // onError={this.videoError} // Callback when video cannot be loaded
              style={[
                videoDimention,
                {borderWidth: 1, width: screenWidth - 20},
              ]}
            />
          )}
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const CustomImageComponent = props => {
  const [uri, uriUpdater] = useState(props.uri);
  const [setDisplay, setDisplayUpdater] = useState('none');
  const [setText, setTextUpdater] = useState('Loading Image');
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          props.ToSinglePost();
        }}>
        <>
          <Image
            source={{
              uri: uri || '',
            }}
            onLoad={() => {
              setDisplayUpdater('flex');
              // console.log('image load');
            }}
            onError={err => {
              console.log('Error to load Image');
              setTextUpdater('Error To Load Image');
            }}
            style={[
              {
                flex: 1,
                width: '100%',
                resizeMode: 'contain',
                minHeight: props.height,
                minWidth: props.width,
                display: setDisplay,
              },
            ]}
          />
          {setDisplay === 'none' && <Text>{setText}</Text>}
        </>
      </TouchableHighlight>
    </View>
  );
};
