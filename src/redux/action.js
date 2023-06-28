import {
  SET_CLICKED_HOME_PAGE_ITEM_ID,
  SET_PORTFOLIO_DATA,
  SET_SELECTED_PORTFOLIO_ID,
  SET_LEETCODE_DATA,
  SET_SELECTED_LEETCODE_ID,
  SET_LEETCOD_TABLE_PAGENATION,
  SET_LEETCOD_TABLE_SORTER,
  SET_LEETCOD_TABLE_FILTER,
  SET_LEETCOD_TABLE_FILTER_TYPE,
  SET_APPLICATION_DATA,
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_PAGENATION,
  SET_APPLICATION_TABLE_SORTER,
  SET_APPLICATION_TABLE_FILTER,
  SET_APPLICATION_TABLE_FILTER_TYPE,
  SET_COMPONENT_DATA,
  SET_SELECTED_COMPONENT_ID,
  SET_COMPONENT_TABLE_PAGENATION,
  SET_COMPONENT_TABLE_SORTER,
  SET_COMPONENT_TABLE_FILTER,
  SET_COMPONENT_TABLE_FILTER_TYPE,
  SET_FAVORITE_DATA,
  SET_SELECTED_FAVORITE_ID,
  SET_FAVORITE_TABLE_PAGENATION,
  SET_FAVORITE_TABLE_SORTER,
  SET_FAVORITE_TABLE_FILTER,
  SET_BULLETINBOARD_DATA,
  SET_BULLETINBOARD_TABLE_PAGENATION,
  SET_BULLETINBOARD_TABLE_SORTER,
  SET_USER_INFO_DATA,
} from "./constants.js";

//Home
export function setClickedHomePageItemId(clickedHomePageItemId) {
  return {
    type: SET_CLICKED_HOME_PAGE_ITEM_ID,
    clickedHomePageItemId,
  };
}

//Portfolio
export function setPortfolioData(portfolioData) {
  return {
    type: SET_PORTFOLIO_DATA,
    portfolioData,
  };
}

export function setSelectedPortfolioId(selectedPortfolioId) {
  return {
    type: SET_SELECTED_PORTFOLIO_ID,
    selectedPortfolioId,
  };
}

//Leetcode
export function setLeetcodeData(leetcodeData) {
  return {
    type: SET_LEETCODE_DATA,
    leetcodeData,
  };
}

export function setEditLeetcodeId(selectedLeetcodeId) {
  return {
    type: SET_SELECTED_LEETCODE_ID,
    selectedLeetcodeId,
  };
}

export function setLeetcodeTablePagenation(leetcodeTablePagenation) {
  return {
    type: SET_LEETCOD_TABLE_PAGENATION,
    leetcodeTablePagenation,
  };
}

export function setLeetcodeTableSorter(leetcodeTableSorter) {
  return {
    type: SET_LEETCOD_TABLE_SORTER,
    leetcodeTableSorter,
  };
}

export function setLeetcodeTableFilter(leetcodeTableFilter) {
  return {
    type: SET_LEETCOD_TABLE_FILTER,
    leetcodeTableFilter,
  };
}

export function setLeetcodeTableFilterType(leetcodeTableFilterType) {
  return {
    type: SET_LEETCOD_TABLE_FILTER_TYPE,
    leetcodeTableFilterType,
  };
}

//Application
export function setApplicationData(applicationData) {
  return {
    type: SET_APPLICATION_DATA,
    applicationData,
  };
}

export function setEditLeetcodeId(selectedApplicationId) {
  return {
    type: SET_SELECTED_APPLICATION_ID,
    selectedApplicationId,
  };
}

export function setApplicationTablePagenation(applicationTablePagenation) {
  return {
    type: SET_APPLICATION_TABLE_PAGENATION,
    applicationTablePagenation,
  };
}

export function setApplicationTableSorter(applicationTableSorter) {
  return {
    type: SET_APPLICATION_TABLE_SORTER,
    applicationTableSorter,
  };
}

export function setApplicationTableFilter(applicationTableFilter) {
  return {
    type: SET_APPLICATION_TABLE_FILTER,
    applicationTableFilter,
  };
}

export function setApplicationTableFilterType(applicationTableFilterType) {
  return {
    type: SET_APPLICATION_TABLE_FILTER_TYPE,
    applicationTableFilterType,
  };
}

//Component
export function setComponentData(componentData) {
  return {
    type: SET_COMPONENT_DATA,
    componentData,
  };
}

export function setComponentId(selectedComponentId) {
  return {
    type: SET_SELECTED_COMPONENT_ID,
    selectedComponentId,
  };
}

export function setComponentTablePagenation(componentTablePagenation) {
  return {
    type: SET_COMPONENT_TABLE_PAGENATION,
    componentTablePagenation,
  };
}

export function setComponentTableSorter(componentTableSorter) {
  return {
    type: SET_COMPONENT_TABLE_SORTER,
    componentTableSorter,
  };
}

export function setComponentTableFilter(componentTableFilter) {
  return {
    type: SET_COMPONENT_TABLE_FILTER,
    componentTableFilter,
  };
}

export function setComponentTableFilterType(componentTableFilterType) {
  return {
    type: SET_COMPONENT_TABLE_FILTER_TYPE,
    componentTableFilterType,
  };
}

//Favoite
export function setFavoriteData(favoriteData) {
  return {
    type: SET_FAVORITE_DATA,
    favoriteData,
  };
}

export function setFavoriteId(selectedFavoriteId) {
  return {
    type: SET_SELECTED_FAVORITE_ID,
    selectedFavoriteId,
  };
}

export function setFavoriteTablePagenation(favoriteTablePagenation) {
  return {
    type: SET_FAVORITE_TABLE_PAGENATION,
    favoriteTablePagenation,
  };
}

export function setFavoriteTableSorter(favoriteTableSorter) {
  return {
    type: SET_FAVORITE_TABLE_SORTER,
    favoriteTableSorter,
  };
}

export function setFavoriteTableFilterType(favoriteTableFilterType) {
  return {
    type: SET_FAVORITE_TABLE_FILTER_TYPE,
    favoriteTableFilterType,
  };
}

//Bulletin Board
export function setBulletinboardData(bulletinboardData) {
  return {
    type: SET_BULLETINBOARD_DATA,
    bulletinboardData,
  };
}

export function setBulletinboardTablePagenation(bulletinboardTablePagenation) {
  return {
    type: SET_BULLETINBOARD_TABLE_PAGENATION,
    bulletinboardTablePagenation,
  };
}

export function setBulletinboardTableSorter(bulletinboardTableSorter) {
  return {
    type: SET_BULLETINBOARD_TABLE_SORTER,
    bulletinboardTableSorter,
  };
}

//User
export function setUserInfoData(userInfoData) {
  return {
    type: SET_USER_INFO_DATA,
    userInfoData,
  };
}
