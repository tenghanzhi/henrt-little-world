import {
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
  SET_QUICK_LINK_DATA,
  SET_SHOW_HOME_CARD,
  SET_SHOW_HOME_DATE,
  SET_SHOW_HOME_SEARCH,
  SET_SHOW_HOME_LINK,
  SET_SHOW_HOME_MENU,
  SET_SHOW_HOME_QUICK_LINK,
  SET_SHOW_HOME_FOOTER,
} from "./constants";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const showHomeCard = localStorage.getItem("showHomeCard");
const showHomeDate = localStorage.getItem("showHomeDate");
const showHomeSearch = localStorage.getItem("showHomeSearch");
const showHomeLink = localStorage.getItem("showHomeLink");
const showHomeMenu = localStorage.getItem("showHomeMenu");
const showHomeQuickLink = localStorage.getItem("showHomeQuickLink");
const showHomeFooter = localStorage.getItem("showHomeFooter");

const initialState = {
  portfolioData: { data: [], meta: {} },
  selectedPortfolioId: null,
  leetcodeData: { data: [], meta: {} },
  selectedLeetcodeId: null,
  leetcodeTablePagenation: {
    current: 1,
    size: 25,
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
  leetcodeTableFilterType: null,
  applicationData: { data: [], meta: {} },
  selectedApplicationId: null,
  applicationTablePagenation: {
    current: 1,
    size: 25,
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
  applicationTableFilterType: null,
  componentData: { data: [], meta: {} },
  selectedComponentId: null,
  componentTablePagenation: {
    current: 1,
    size: 25,
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
  componentTableFilterType: null,
  favoriteData: { data: [], meta: {} },
  selectedFavoriteId: null,
  favoriteTablePagenation: {
    current: 1,
    size: 25,
  },
  favoriteTableSorter: {
    sort: "name",
    order: ":asc",
  },
  favoriteTableFilter: {
    name: null,
    type: null,
  },
  bulletinboardData: { data: [], meta: {} },
  bulletinboardTablePagenation: {
    current: 1,
    size: 25,
  },
  bulletinboardTableSorter: {
    sort: "createdAt",
    order: ":desc",
  },
  userInfoData: {
    jwt: token?.toString() === "null" ? null : token,
    user:
      user?.toString() === "null"
        ? {
            id: null,
            username: null,
            email: null,
            provider: null,
            confirmed: false,
            blocked: false,
            createdAt: null,
            updatedAt: null,
          }
        : JSON.parse(user),
  },
  quickLinkData: { data: [], meta: {} },
  showHomeCard: showHomeCard?.toString() === "false" ? false : true,
  showHomeDate: showHomeDate?.toString() === "false" ? false : true,
  showHomeSearch: showHomeSearch?.toString() === "false" ? false : true,
  showHomeLink: showHomeLink?.toString() === "false" ? false : true,
  showHomeMenu: showHomeMenu?.toString() === "false" ? false : true,
  showHomeQuickLink: showHomeQuickLink?.toString() === "false" ? false : true,
  showHomeFooter: showHomeFooter?.toString() === "false" ? false : true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    case SET_LEETCOD_TABLE_FILTER_TYPE:
      return { ...state, leetcodeTableFilterType: action.payload };
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
    case SET_APPLICATION_TABLE_FILTER_TYPE:
      return { ...state, applicationTableFilterType: action.payload };
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
    case SET_COMPONENT_TABLE_FILTER_TYPE:
      return { ...state, componentTableFilterType: action.payload };
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
    case SET_BULLETINBOARD_DATA:
      return { ...state, bulletinboardData: action.payload };
    case SET_BULLETINBOARD_TABLE_PAGENATION:
      return { ...state, bulletinboardTablePagenation: action.payload };
    case SET_BULLETINBOARD_TABLE_SORTER:
      return { ...state, bulletinboardTableSorter: action.payload };
    case SET_USER_INFO_DATA:
      localStorage.setItem("token", action.payload.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, userInfoData: action.payload };
    case SET_QUICK_LINK_DATA:
      return { ...state, quickLinkData: action.payload };
    case SET_SHOW_HOME_CARD:
      localStorage.setItem("showHomeCard", action.payload);
      return { ...state, showHomeCard: action.payload };
    case SET_SHOW_HOME_DATE:
      localStorage.setItem("showHomeDate", action.payload);
      return { ...state, showHomeDate: action.payload };
    case SET_SHOW_HOME_SEARCH:
      localStorage.setItem("showHomeSearch", action.payload);
      return { ...state, showHomeSearch: action.payload };
    case SET_SHOW_HOME_LINK:
      localStorage.setItem("showHomeLink", action.payload);
      return { ...state, showHomeLink: action.payload };
    case SET_SHOW_HOME_MENU:
      localStorage.setItem("showHomeMenu", action.payload);
      return { ...state, showHomeMenu: action.payload };
    case SET_SHOW_HOME_QUICK_LINK:
      localStorage.setItem("showHomeQuickLink", action.payload);
      return { ...state, showHomeQuickLink: action.payload };
    case SET_SHOW_HOME_FOOTER:
      localStorage.setItem("showHomeFooter", action.payload);
      return { ...state, showHomeFooter: action.payload };
    default:
      return state;
  }
}
