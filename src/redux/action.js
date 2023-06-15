import {
  SET_CLICKED_HOME_PAGE_ITEM_ID,
  SET_PORTFOLIO_DATA,
  SET_EDIT_PORTFOLIO_ID,
  SET_LEETCODE_DATA,
  SET_SELECTED_LEETCODE_ID,
  SET_LEETCOD_TABLE_PAGENATION,
  SET_LEETCOD_TABLE_SORTER,
  SET_APPLICATION_DATA,
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_PAGENATION,
  SET_APPLICATION_TABLE_SORTER,
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

export function setEditPortfolioId(editPortfolioId) {
  return {
    type: SET_EDIT_PORTFOLIO_ID,
    editPortfolioId,
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
