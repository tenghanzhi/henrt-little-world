import { SET_CLICKED_HOME_PAGE_ITEM, SET_PORTFOLIO_DATA } from './constants.js'

export function setClickedHomePageItem(clickedHomePageItem) {
  return {
    type: SET_CLICKED_HOME_PAGE_ITEM,
    clickedHomePageItem
  }
}

export function setPortfolioData(portfolioData) {
  return {
    type: SET_PORTFOLIO_DATA,
    portfolioData
  }
}