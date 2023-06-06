import {
  SET_CLICKED_HOME_PAGE_ITEM_ID,
  SET_PORTFOLIO_DATA,
  SET_EDIT_PORTFOLIO_ID,
  SET_LEETCODE_DATA,
  SET_EDIT_LEETCODE_ID,
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

export function setEditLeetcodeId(editLeetcodeId) {
  return {
    type: SET_EDIT_LEETCODE_ID,
    editLeetcodeId,
  };
}
