import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";

const FavouritScreen = (props) => {
  const favMeals = useSelector((state) => state.mealsReducer.favouritMeals);

  if (!favMeals || favMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.empty}>
          No favourit meals found. start adding some
        </Text>
      </View>
    );
  }
  return <MealList listData={favMeals} navigation={props.navigation} />;
};

// FavouritScreen.navigationOptions = (navData) => {
//   return {
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderIonicButton}>
//         <Item
//           title="Menu"
//           iconName="ios-menu"
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
});
export default FavouritScreen;
