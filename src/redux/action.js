import {
  SET_PORTFOLIO_DATA,
  SET_SELECTED_PORTFOLIO_ID,
  SET_LEETCODE_DATA,
  SET_SELECTED_LEETCODE_ID,
  SET_LEETCODE_TABLE_COLUMNS,
  SET_LEETCODE_TABLE_PAGENATION,
  SET_LEETCODE_TABLE_SORTER,
  SET_LEETCODE_TABLE_FILTER,
  SET_LEETCODE_TABLE_FILTER_TYPE,
  SET_APPLICATION_DATA,
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_COLUMNS,
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
  SET_FAVORITE_TABLE_COLUMNS,
  SET_FAVORITE_TABLE_PAGENATION,
  SET_FAVORITE_TABLE_SORTER,
  SET_FAVORITE_TABLE_FILTER,
  SET_BULLETINBOARD_DATA,
  SET_BULLETINBOARD_TABLE_PAGENATION,
  SET_BULLETINBOARD_TABLE_SORTER,
  SET_PROJECT_DATA,
  SET_PROJECT_PAGENATION,
  SET_SELECTED_PROJECT_ID,
  SET_USER_INFO_DATA,
  SET_QUICK_LINK_DATA,
  SET_SHOW_HOME_CARD,
  SET_SHOW_HOME_DATE,
  SET_SHOW_HOME_SEARCH,
  SET_SHOW_HOME_LINK,
  SET_SHOW_HOME_MENU,
  SET_SHOW_HOME_QUICK_LINK,
  SET_SHOW_HOME_FOOTER,
} from "./constants.js";

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

export function setLeetcodeTableColumns(leetcodeTableColumns) {
  return {
    type: SET_LEETCODE_TABLE_COLUMNS,
    leetcodeTableColumns,
  };
}

export function setLeetcodeTablePagenation(leetcodeTablePagenation) {
  return {
    type: SET_LEETCODE_TABLE_PAGENATION,
    leetcodeTablePagenation,
  };
}

export function setLeetcodeTableSorter(leetcodeTableSorter) {
  return {
    type: SET_LEETCODE_TABLE_SORTER,
    leetcodeTableSorter,
  };
}

export function setLeetcodeTableFilter(leetcodeTableFilter) {
  return {
    type: SET_LEETCODE_TABLE_FILTER,
    leetcodeTableFilter,
  };
}

export function setLeetcodeTableFilterType(leetcodeTableFilterType) {
  return {
    type: SET_LEETCODE_TABLE_FILTER_TYPE,
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

export function setApplicationTableColumns(applicationTableColumns) {
  return {
    type: SET_APPLICATION_TABLE_COLUMNS,
    applicationTableColumns,
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

//Favorite
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

export function setFavoriteTableColumns(favoriteTableColumns) {
  return {
    type: SET_FAVORITE_TABLE_COLUMNS,
    favoriteTableColumns,
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

export function setFavoriteTableFilter(favoriteTableFilter) {
  return {
    type: SET_FAVORITE_TABLE_FILTER,
    favoriteTableFilter,
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

//Project
export function setProjectData(projectData) {
  return {
    type: SET_PROJECT_DATA,
    projectData,
  };
}

export function setProjectPagenation(projectPagenation) {
  return {
    type: SET_PROJECT_PAGENATION,
    projectPagenation,
  };
}

export function setSelectedProjectId(selectedProjectId) {
  return {
    type: SET_SELECTED_PROJECT_ID,
    selectedProjectId,
  };
}

//User
export function setUserInfoData(userInfoData) {
  return {
    type: SET_USER_INFO_DATA,
    userInfoData,
  };
}

//Quick Link
export function setQuickLinkData(quickLinkData) {
  return {
    type: SET_QUICK_LINK_DATA,
    quickLinkData,
  };
}

//Home
export function setShowHomeCard(showHomeCard) {
  return {
    type: SET_SHOW_HOME_CARD,
    showHomeCard,
  };
}

export function setShowHomeDate(showHomeDate) {
  return {
    type: SET_SHOW_HOME_DATE,
    showHomeDate,
  };
}

export function setShowHomeSearch(showHomeSearch) {
  return {
    type: SET_SHOW_HOME_SEARCH,
    showHomeSearch,
  };
}

export function setShowHomeLink(showHomeLink) {
  return {
    type: SET_SHOW_HOME_LINK,
    showHomeLink,
  };
}

export function setShowHomeMenu(showHomeMenu) {
  return {
    type: SET_SHOW_HOME_MENU,
    showHomeMenu,
  };
}

export function setShowHomeQuickLink(showHomeQuickLink) {
  return {
    type: SET_SHOW_HOME_QUICK_LINK,
    showHomeQuickLink,
  };
}

export function setShowHomeFooter(showHomeFooter) {
  return {
    type: SET_SHOW_HOME_FOOTER,
    showHomeFooter,
  };
}
