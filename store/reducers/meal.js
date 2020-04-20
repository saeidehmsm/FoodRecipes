import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVARITE, SET_FILTERS } from "../actions/meal";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouritMeals: [],
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVARITE:
      const existingMealIndex = state.favouritMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingMealIndex >= 0) {
        const updatedFavMeals = [...state.favouritMeals];
        updatedFavMeals.splice(existingMealIndex, 1);
        return { ...state, favouritMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        const newFav = state.favouritMeals.concat(meal);
        return { ...state, favouritMeals: newFav };
      }

    case SET_FILTERS:
      const updatedappliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (
          (updatedappliedFilters.glutonFree && !meal.isGlutenFree) ||
          (updatedappliedFilters.lactosFree && !meal.isLactosFree) ||
          (updatedappliedFilters.Vegetarian && !meal.isVegetarian) ||
          (updatedappliedFilters.vegan && !meal.isVegan)
        ) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: filteredMeals };
    default:
      return state;
  }
};

export default mealReducer;
