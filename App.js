import React, { useState } from "react";
import { StyleSheet } from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import MealsNavigator from "./Navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mealReducer from "./store/reducers/meal";
import { composeWithDevTools } from "redux-devtools-extension";

enableScreens();

//if we have multiple reducer , we use combineReducers
const rootReducer = combineReducers({
  mealsReducer: mealReducer,
});

//should be removed this code, when you deploy for production
const store = createStore(rootReducer, composeWithDevTools());

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
