export const TOGGLE_FAVARITE = "TOGGLE_FAVARITE";
export const SET_FILTERS = "SET_FILTERS";

export const toggleFavourit = (id) => {
  return { type: TOGGLE_FAVARITE, mealId: id };
};

export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};
