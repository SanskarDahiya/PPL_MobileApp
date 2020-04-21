import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  Button,
  Dimensions,
} from 'react-native';
import POSTWRAPPER from './POSTWRAPPER';
import {connect} from 'react-redux';
import {filterData} from '../../AxiosCalls';
import {setZIndex} from '../../REDUX/actions/zIndexAction';
import {setAllPost} from '../../REDUX/actions/mypostAction';
import {PostFilterAction} from '../../REDUX/actions/postFilterMenu';
const MobileHeight = Dimensions.get('window').height;

let isToTop = true,
  isToBottom = false,
  ifNewPostIsFetched = false,
  ifHomeButtonIsPressedOnTopForNewPost = false;

const MyAllPosts = props => {
  let scrollViewRef = false;
  const [allPostFetched, allPostFetchedUpdater] = useState(false);
  useEffect(() => {
    try {
      // scrollViewRef.scrollTo({ x: 0, animated: true });
    } catch (e) {}
  }, [props.getAllPosts]);

  useEffect(() => {
    if (scrollViewRef) scrollViewRef.scrollTo({x: 0, animated: true});
    allPostFetchedUpdater(false);
  }, [props.postFilter]);
  useEffect(() => {
    const unsubscribe = props.route.params.listen('tabPress', e => {
      try {
        if (props.navigation.isFocused()) {
          // e.preventDefault();
          console.log('Homebtn Clicked', isToTop);
          if (scrollViewRef) scrollViewRef.scrollTo({x: 0, animated: true});

          if (isToTop && !ifHomeButtonIsPressedOnTopForNewPost) {
            ifHomeButtonIsPressedOnTopForNewPost = true;
            props.setZIndex(10);
            props.PostFilterAction({
              filter: 'createdDate',
            });
            RefreshNewPost(0);
            props.setAllPost([]);
          }
        }
      } catch (e) {}
    });
    return unsubscribe;
  }, [props.navigation]);

  const getNewPosts = async len => {
    try {
      let offset = 0;
      if (len != 0 && props?.getAllPosts?.length > 0) {
        offset = props.getAllPosts.length;
      }
      console.log('OFFSET is set to>> ', offset);
      let {
        data: {result},
      } = await filterData({
        ...props.postFilter,
        offset,
      });
      if (!result) {
        throw new Error('No Post Available');
      }
      if (result.length === 0) {
        allPostFetchedUpdater(true);
      }
      props.setAllPost([...props.getAllPosts, ...result]);
      console.log('POST UPDATED IN REDUX ');
      props.setZIndex(-1);
    } catch (err) {
      console.log(err, 'error in getting post');
      alert('Unable to Fetch Post');
    }
    ifNewPostIsFetched = false;
    ifHomeButtonIsPressedOnTopForNewPost = false;
  };

  const RefreshNewPost = len => {
    console.log('Refreshing post');
    getNewPosts(len);
  };

  function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - MobileHeight / 2
    );
  }

  function isCloseToTop({layoutMeasurement, contentOffset, contentSize}) {
    return contentOffset.y == 0;
  }

  useEffect(() => {
    props.setZIndex(10);
    getNewPosts(0);
  }, []);

  // return (
  //   <View>
  //     <FlatList
  //       data={props.getAllPosts}
  //       renderItem={({index, item}) => (
  //         <POSTWRAPPER {...item} ToSinglePost={props.navigation.navigate} />
  //       )}
  //       keyExtractor={item => item._id}
  //     />
  //   </View>
  // );

  return (
    <View>
      <ScrollView
        key={1234}
        ref={ref => {
          if (!scrollViewRef) {
            scrollViewRef = ref;
          }
        }}
        style={{width: '100%', borderWidth: 1, flex: 1}}
        onScroll={({nativeEvent}) => {
          //Setting Value to false
          isToBottom = false;
          isToTop = false;

          if (isCloseToTop(nativeEvent)) {
            //do something
            isToTop = true;
            console.log('top', isToTop);
          }
          if (isCloseToBottom(nativeEvent)) {
            //do something
            console.log('bottom');
            isToBottom = true;
            if (
              !allPostFetched &&
              !ifNewPostIsFetched &&
              props.getAllPosts.length > 0
            ) {
              ifNewPostIsFetched = true;
              console.log('fetching new post');
              RefreshNewPost();
            }
          }
        }}>
        {props.getAllPosts.map((value, _id) => (
          <POSTWRAPPER
            index={_id}
            key={value._id}
            {...value}
            ToSinglePost={props.navigation.navigate}
          />
        ))}
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{!allPostFetched ? 'Fetching More Post' : 'No More Post'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default connect(
  states => {
    const {
      post: {data},
      postFilter: {filter},
    } = states;
    return {getAllPosts: data, postFilter: filter};
  },
  {setZIndex, setAllPost, PostFilterAction},
)(MyAllPosts);

const AddCategoryTopPortion = props => {
  return (
    <View>
      <Text>This is Add Category Portion</Text>
      <Text />
      <Button
        title="BACK"
        onPress={() => {
          props.AnimateUploadBtn();
        }}
      />
    </View>
  );
};
