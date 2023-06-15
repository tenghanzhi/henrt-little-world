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
} from "./constants";

const initialState = {
  clickedHomePageItemId: null,
  portfolioData: { data: [], meta: {} },
  editPortfolioId: null,
  leetcodeData: { data: [], meta: {} },
  selectedLeetcodeId: null,
  leetcodeTablePagenation: {
    current: 1,
    size: 20,
  },
  leetcodeTableSorter: {
    sort: "leetcodeIndex",
    order: ":asc",
  },
  applicationData: { data: [], meta: {} },
  selectedApplicationId: null,
  applicationTablePagenation: {
    current: 1,
    size: 20,
  },
  applicationTableSorter: {
    sort: "type",
    order: ":asc",
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLICKED_HOME_PAGE_ITEM_ID:
      return { ...state, clickedHomePageItemId: action.payload };
    case SET_PORTFOLIO_DATA:
      return { ...state, portfolioData: action.payload };
    case SET_EDIT_PORTFOLIO_ID:
      return { ...state, editPortfolioId: action.payload };
    case SET_LEETCODE_DATA:
      return { ...state, leetcodeData: action.payload };
    case SET_SELECTED_LEETCODE_ID:
      return { ...state, selectedLeetcodeId: action.payload };
    case SET_LEETCOD_TABLE_PAGENATION:
      return { ...state, leetcodeTablePagenation: action.payload };
    case SET_LEETCOD_TABLE_SORTER:
      return { ...state, leetcodeTableSorter: action.payload };
    case SET_APPLICATION_DATA:
      return { ...state, applicationData: action.payload };
    case SET_SELECTED_APPLICATION_ID:
      return { ...state, selectedApplicationId: action.payload };
    case SET_APPLICATION_TABLE_PAGENATION:
      return { ...state, applicationTablePagenation: action.payload };
    case SET_APPLICATION_TABLE_SORTER:
      return { ...state, applicationTableSorter: action.payload };
    default:
      return state;
  }
}
