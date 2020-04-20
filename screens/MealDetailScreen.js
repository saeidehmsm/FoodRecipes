import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Icon } from "react-native-elements";
import Colors from "../constant/Colors";
import { toggleFavourit } from "../store/actions/meal";

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = useSelector((state) => state.mealsReducer.meals);
  const currentMealIsFav = useSelector((state) =>
    state.mealsReducer.favouritMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  // useEffect(() => {
  //   props.navigation.setParams({ mealTitle: selectedMeal.title });
  // }, [selectedMeal]);

  const dispatch = useDispatch();
  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavourit(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavHandler });
  }, [toggleFavHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFav });
  }, [currentMealIsFav]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <Text>{selectedMeal.duration}</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.list}>
        {selectedMeal.ingredients.map((ing) => (
          <Text style={styles.listItem} key={ing}>
            {ing}
          </Text>
        ))}
      </View>
      <Text style={styles.title}>Steps</Text>
      <View style={styles.list}>
        {selectedMeal.steps.map((step) => (
          <Text style={styles.listItem} key={step}>
            {step}
          </Text>
        ))}
      </View>
    </ScrollView>
    // <Button
    //   title="go back to categories"
    //   onPress={() => props.navigation.popToTop()}
    // />
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const selectedTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFave = navigationData.navigation.getParam("toggleFav");
  const isFavMeal = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: selectedTitle,
    headerRight: () => (
      <Icon
        containerStyle={styles.icon}
        type="ionicon"
        name={isFavMeal ? "ios-star" : "ios-star-outline"}
        color={Platform.OS === "ios" ? Colors.primary : "#ccc"}
        onPress={toggleFave}
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10,
  },
  detail: {
    flexDirection: "row",
    fontFamily: "open-sans",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  list: {
    fontFamily: "open-sans",
    fontSize: 22,
  },
  listItem: {
    paddingHorizontal: 20,
  },
});
export default MealDetailScreen;
