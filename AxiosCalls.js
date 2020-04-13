import Axios from "axios";
const urlPrefix = "http://192.168.43.116:8081/";

export const LoginCall = (data) => Axios.post(urlPrefix + "user/login", data);
export const SignupCall = (data) =>
  Axios.post(urlPrefix + "user/registration", data);

export const PostUploadCall = (data) =>
  new Promise((resolve, reject) => {
    let photo = data.photo;
    const photoExtension = photo.uri.substr(photo.uri.lastIndexOf(".") + 1);
    photo = {
      uri: photo.uri,
      type: photo.type + "/" + photoExtension,
      name: "1." + photoExtension,
    };

    let f = new FormData();
    Object.keys(data).forEach((key) => {
      f.append(key, JSON.stringify(data[key]));
    });
    f.append("photo", { ...photo });
    Axios.post(urlPrefix + "post/upload", f)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getPosts = (limit) =>
  Axios.post(urlPrefix + "post/getpost", { limit });

export const like_comment = (data) =>
  Axios.post(urlPrefix + "post/likecomment", data);

export const filterData = (data) =>
  Axios.post(urlPrefix + "post/filter", { ...data });
