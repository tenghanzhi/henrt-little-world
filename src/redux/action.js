import { SET_CLICKED_HOME_PAGE_ITEM } from './constants.js'

export function setClickedHomePageItem(clickedHomePageItem) {
  return {
    type: SET_CLICKED_HOME_PAGE_ITEM,
    clickedHomePageItem
  }
}