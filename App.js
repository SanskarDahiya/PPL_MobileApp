import "react-native-gesture-handler";
import React from "react";
import store from "./REDUX/store";
import { Provider } from "react-redux";
import HomePage from "./Components/HomePage";

export default function App2() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
