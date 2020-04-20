import React from "react";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { StyleSheet, View, Text } from "react-native";

const CategoryMealsScreen = (props) => {
  const cateId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(
    (state) => state.mealsReducer.filteredMeals
  );

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(cateId) >= 0
  );

  const goToMealDetai = () => {
    props.navigation.navigate({ routeName: "MealDetail" });
  };

  if (!displayedMeals || displayedMeals.length == 0) {
    return (
      <View style={styles.screen}>
        <Text>no meals found! maybe check your filters!</Text>
      </View>
    );
  }
  return (
    // <View style={styles.screen}>
    //   {/* <Text>{selectedCategory.title}</Text> */}
    //   <Button
    //     title="go to Detail"
    //     onPress={() => props.navigation.navigate({ routeName: "MealDetail" })}
    //   />
    //   <Button title="go back" onPress={() => props.navigation.goBack()} />
    // </View>

    <MealList listData={displayedMeals} navigation={props.navigation} />
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const cateId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === cateId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
