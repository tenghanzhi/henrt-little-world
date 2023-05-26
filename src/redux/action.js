import { SET_CLICKED_HOME_PAGE_ITEM_ID, SET_PORTFOLIO_DATA, SET_EDIT_PORTFOLIO_ID } from './constants.js'

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

export function setEditPortfolioId(editPortfolioId) {
  return {
    type: SET_EDIT_PORTFOLIO_ID,
    editPortfolioId
  }
}