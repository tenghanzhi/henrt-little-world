import {
  SET_CLICKED_HOME_PAGE_ITEM_ID,
  SET_PORTFOLIO_DATA,
  SET_SELECTED_PORTFOLIO_ID,
  SET_LEETCODE_DATA,
  SET_SELECTED_LEETCODE_ID,
  SET_LEETCOD_TABLE_PAGENATION,
  SET_LEETCOD_TABLE_SORTER,
  SET_LEETCOD_TABLE_FILTER,
  SET_APPLICATION_DATA,
  SET_SELECTED_APPLICATION_ID,
  SET_APPLICATION_TABLE_PAGENATION,
  SET_APPLICATION_TABLE_SORTER,
  SET_APPLICATION_TABLE_FILTER,
  SET_COMPONENT_DATA,
  SET_SELECTED_COMPONENT_ID,
  SET_COMPONENT_TABLE_PAGENATION,
  SET_COMPONENT_TABLE_SORTER,
  SET_COMPONENT_TABLE_FILTER,
  SET_FAVORITE_DATA,
  SET_SELECTED_FAVORITE_ID,
  SET_FAVORITE_TABLE_PAGENATION,
  SET_FAVORITE_TABLE_SORTER,
  SET_FAVORITE_TABLE_FILTER,
  SET_USER_INFO_DATA,
} from "./constants";

const initialState = {
  clickedHomePageItemId: null,
  portfolioData: { data: [], meta: {} },
  selectedPortfolioId: null,
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
  leetcodeTableFilter: {
    difficulty: null,
    type: null,
    leetcodeIndex: null,
    title: null,
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
  applicationTableFilter: {
    name: null,
    type: null,
    description: null,
  },
  componentData: { data: [], meta: {} },
  selectedComponentId: null,
  componentTablePagenation: {
    current: 1,
    size: 20,
  },
  componentTableSorter: {
    sort: "name",
    order: ":asc",
  },
  componentTableFilter: {
    name: null,
    componentType: null,
    codeType: null,
  },
  favoriteData: { data: [], meta: {} },
  selectedFavoriteId: null,
  favoriteTablePagenation: {
    current: 1,
    size: 20,
  },
  favoriteTableSorter: {
    sort: "name",
    order: ":asc",
  },
  favoriteTableFilter: {
    name: null,
    type: null,
  },
  userInfoData: {
    jwt: null,
    user: {
      id: null,
      username: null,
      email: null,
      provider: null,
      confirmed: false,
      blocked: false,
      createdAt: null,
      updatedAt: null,
    },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLICKED_HOME_PAGE_ITEM_ID:
      return { ...state, clickedHomePageItemId: action.payload };
    case SET_PORTFOLIO_DATA:
      return { ...state, portfolioData: action.payload };
    case SET_SELECTED_PORTFOLIO_ID:
      return { ...state, selectedPortfolioId: action.payload };
    case SET_LEETCODE_DATA:
      return { ...state, leetcodeData: action.payload };
    case SET_SELECTED_LEETCODE_ID:
      return { ...state, selectedLeetcodeId: action.payload };
    case SET_LEETCOD_TABLE_PAGENATION:
      return { ...state, leetcodeTablePagenation: action.payload };
    case SET_LEETCOD_TABLE_SORTER:
      return { ...state, leetcodeTableSorter: action.payload };
    case SET_LEETCOD_TABLE_FILTER:
      return { ...state, leetcodeTableFilter: action.payload };
    case SET_APPLICATION_DATA:
      return { ...state, applicationData: action.payload };
    case SET_SELECTED_APPLICATION_ID:
      return { ...state, selectedApplicationId: action.payload };
    case SET_APPLICATION_TABLE_PAGENATION:
      return { ...state, applicationTablePagenation: action.payload };
    case SET_APPLICATION_TABLE_SORTER:
      return { ...state, applicationTableSorter: action.payload };
    case SET_APPLICATION_TABLE_FILTER:
      return { ...state, applicationTableFilter: action.payload };
    case SET_COMPONENT_DATA:
      return { ...state, componentData: action.payload };
    case SET_SELECTED_COMPONENT_ID:
      return { ...state, selectedComponentId: action.payload };
    case SET_COMPONENT_TABLE_PAGENATION:
      return { ...state, componentTablePagenation: action.payload };
    case SET_COMPONENT_TABLE_SORTER:
      return { ...state, componentTableSorter: action.payload };
    case SET_COMPONENT_TABLE_FILTER:
      return { ...state, componentTableFilter: action.payload };
    case SET_FAVORITE_DATA:
      return { ...state, favoriteData: action.payload };
    case SET_SELECTED_FAVORITE_ID:
      return { ...state, selectedFavoriteId: action.payload };
    case SET_FAVORITE_TABLE_PAGENATION:
      return { ...state, favoriteTablePagenation: action.payload };
    case SET_FAVORITE_TABLE_SORTER:
      return { ...state, favoriteTableSorter: action.payload };
    case SET_FAVORITE_TABLE_FILTER:
      return { ...state, favoriteTableFilter: action.payload };
    case SET_USER_INFO_DATA:
      return { ...state, userInfoData: action.payload };
    default:
      return state;
  }
}
