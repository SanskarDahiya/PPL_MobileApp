import Axios from 'axios';
const urlPrefix = 'http://192.168.43.116:8088/';
// const urlPrefix = 'https://pplbackend.herokuapp.com/';
export const LoginCall = data => Axios.post(urlPrefix + 'user/login', data);
export const SignupCall = data =>
  Axios.post(urlPrefix + 'user/registration', data);

export const PostUploadCall = data =>
  new Promise((resolve, reject) => {
    Axios.post(urlPrefix + 'post/upload', data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

export const getPosts = limit =>
  Axios.post(urlPrefix + 'post/getpost', {limit});

export const like_comment = data =>
  Axios.post(urlPrefix + 'post/likecomment', data);

export const filterData = data =>
  Axios.post(urlPrefix + 'post/filter', {...data});

export const getUserPosts = (_id, offset) =>
  Axios.post(urlPrefix + 'post/getPostByUserId', {_id, offset});

export const getPostById = _id =>
  Axios.post(urlPrefix + 'post/getPostById', {_id});
