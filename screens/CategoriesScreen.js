import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderIonicButton } from "../components/HeaderIonicButton";
import { Icon } from "react-native-elements";
import Colors from "../constant/Colors";

const CategoryScreen = (props) => {
  const renderGrid = (itemData) => {
    return (
      <TouchableOpacity
        style={{ ...styles.gridItem, backgroundColor: itemData.item.color }}
        onPress={() =>
          props.navigation.navigate({
            routeName: "CategoryMeal",
            params: { categoryId: itemData.item.id },
          })
        }
      >
        <Text style={styles.title}>{itemData.item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    // <View style={styles.screen}>
    //   <Text> Category Screen</Text>
    //   <Button
    //     title="go to Meals!"
    //     onPress={() => {
    //       props.navigation.navigate({ routeName: "CategoryMeal" });
    //       //props.navigation.replace("CategoryMeal");
    //     }}
    //   />
    // </View>
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGrid}
    />
  );
};

CategoryScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: () => (
      // <HeaderButtons HeaderButtonComponent={HeaderIonicButton}>
      //   <Item
      //     title="Menu"
      //     iconName="ios-menu"
      //     onPress={() => {
      //       navData.navigation.toggleDrawer();
      //     }}
      //   />
      // </HeaderButtons>
      <Icon
        containerStyle={styles.icon}
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
        color={Platform.OS === "ios" ? Colors.primary : "#ccc"}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    ),
  };
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    width: 150,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
  },
  icon: {
    paddingLeft: 10,
  },
});
export default CategoryScreen;
