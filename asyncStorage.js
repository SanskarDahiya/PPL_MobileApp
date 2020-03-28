import { AsyncStorage } from "react-native";

const userid = "userid";
export const addDataToStorage = async data => {
  AsyncStorage.setItem(userid, data);
};

export const removeDataFromStorage = () => AsyncStorage.removeItem(userid);

export const getDataFromStorage = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(userid)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
