import { SET_CLICKED_HOME_PAGE_ITEM_ID, SET_PORTFOLIO_DATA } from './constants.js'

export function setClickedHomePageItemId(clickedHomePageItemId) {
  return {
    type: SET_CLICKED_HOME_PAGE_ITEM_ID,
    clickedHomePageItemId
  }
}

export function setPortfolioData(portfolioData) {
  return {
    type: SET_PORTFOLIO_DATA,
    portfolioData
  }
}