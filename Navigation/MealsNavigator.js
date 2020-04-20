import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoryScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constant/Colors";
import FavouritScreen from "./../screens/FavouritScreen";
import FilterScreen from "./../screens/FilterScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.os === "ios" ? "" : Colors.primary,
  },
  headerTintColor: Platform.os === "ios" ? Colors.primary : "white",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoryScreen,
    },
    CategoryMeal: CategoryMealsScreen,
    MealDetail: { screen: MealDetailScreen },
  },
  {
    //mode: "modal",
    initialRouteName: "Categories",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const favouritNavigator = createStackNavigator(
  {
    Favaourits: {
      screen: FavouritScreen,
      navigationOptions: { headerTitle: "Your Favourits" },
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const filterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FilterScreen,
      navigationOptions: {
        headerTitle: "Filter Meals",
      },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={23} color={tabInfo.tintColor} />
        );
      },
      //tabBarColor: Colors.primary,
    },
  },
  Favaourits: {
    screen: favouritNavigator, //FavouritScreen,
    navigationOptions: {
      tabBarLabel: "Favaourits!",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={23} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accent,
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primary,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accent,
        },
      });

const MainNavigator = createDrawerNavigator(
  {
    MealFavs: MealsFavTabNavigator,
    Filters: {
      screen: filterNavigator,
      navigationOptions: {
        drawerLabel: "Filters",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accent,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
    //drawerBackgroundColor: Colors.primary,
  }
);

export default createAppContainer(MainNavigator);
