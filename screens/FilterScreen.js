import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { Icon } from "react-native-elements";
import Colors from "../constant/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meal";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.value}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.primary }}
        thumbColor={Platform.OS == "android" ? Colors.primary : ""}
      />
    </View>
  );
};

const FilterScreen = (props) => {
  const { navigation } = props;

  const [isGlutonFree, setGlutonFree] = useState(false);
  const [isLactoseFree, setLactoseFree] = useState(false);
  const [isVegan, setVegan] = useState(false);
  const [isVegeterian, setVegeterian] = useState(false);
  const dispatch = useDispatch();

  const saveFilter = useCallback(() => {
    // cache func and just run if dependencies has changed!
    const appliedFilters = {
      glutonFree: isGlutonFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      Vegetarian: isVegeterian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutonFree, isLactoseFree, isVegan, isVegeterian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilter });
  }, [saveFilter]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-Free"
        value={isGlutonFree}
        onChange={(newValue) => setGlutonFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-Free"
        value={isLactoseFree}
        onChange={(newValue) => setLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onChange={(newValue) => setVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        value={isVegeterian}
        onChange={(newValue) => setVegeterian(newValue)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <Icon
        containerStyle={styles.icon}
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
        color={Platform.OS === "ios" ? Colors.primary : "#ccc"}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    ),
    headerRight: () => (
      <Icon
        containerStyle={styles.icon}
        type="ionicon"
        name="ios-save"
        color={Platform.OS === "ios" ? Colors.primary : "#ccc"}
        onPress={navData.navigation.getParam("save")}
      />
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginVertical: 10,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 22,
  },
});
export default FilterScreen;
