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

const selectedPortfolioId = sessionStorage.getItem("selectedPortfolioId");
const selectedLeetcodeId = sessionStorage.getItem("selectedLeetcodeId");
const selectedApplicationId = sessionStorage.getItem("selectedApplicationId");
const selectedComponentId = sessionStorage.getItem("selectedComponentId");
const selectedFavoriteId = sessionStorage.getItem("selectedFavoriteId");
const selectedProjectId = sessionStorage.getItem("selectedProjectId");

const initialState = {
  portfolioData: { data: [], meta: {} },
  selectedPortfolioId: selectedPortfolioId ? selectedPortfolioId : null,
  leetcodeData: { data: [], meta: {} },
  selectedLeetcodeId: selectedLeetcodeId ? selectedLeetcodeId : null,
  leetcodeTablePagenation: {
    current: 1,
    size: 25,
  },
  leetcodeTableColumns: {
    index: true,
    title: true,
    createdAt: true,
    updatedAt: true,
    firstCompletedDate: true,
    difficulty: true,
    type: true,
    action: true,
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
  selectedApplicationId: selectedApplicationId ? selectedApplicationId : null,
  applicationTableColumns: {
    name: true,
    type: true,
    createdAt: true,
    updatedAt: true,
    description: true,
    action: true,
  },
  applicationTablePagenation: {
    current: 1,
    size: 25,
  },
  applicationTableSorter: {
    sort: "updatedAt",
    order: ":desc",
  },
  applicationTableFilter: {
    name: null,
    type: null,
    description: null,
  },
  applicationTableFilterType: null,
  componentData: { data: [], meta: {} },
  selectedComponentId: selectedComponentId ? selectedComponentId : null,
  componentTablePagenation: {
    current: 1,
    size: 25,
  },
  componentTableSorter: {
    sort: "updatedAt",
    order: ":desc",
  },
  componentTableFilter: {
    name: null,
    componentType: null,
    codeType: null,
  },
  componentTableFilterType: null,
  favoriteData: { data: [], meta: {} },
  selectedFavoriteId: selectedFavoriteId ? selectedFavoriteId : null,
  favoriteTableColumns: {
    name: true,
    type: true,
    createdAt: true,
    updatedAt: true,
    description: true,
    action: true,
  },
  favoriteTablePagenation: {
    current: 1,
    size: 25,
  },
  favoriteTableSorter: {
    sort: "updatedAt",
    order: ":desc",
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
  projectData: { data: [], meta: {} },
  projectPagenation: {
    current: 1,
    size: 10,
  },
  selectedProjectId: selectedProjectId ? selectedProjectId : null,
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
      sessionStorage.setItem("selectedPortfolioId", action.payload);
      return { ...state, selectedPortfolioId: action.payload };
    case SET_LEETCODE_DATA:
      return { ...state, leetcodeData: action.payload };
    case SET_SELECTED_LEETCODE_ID:
      sessionStorage.setItem("selectedLeetcodeId", action.payload);
      return { ...state, selectedLeetcodeId: action.payload };
    case SET_LEETCODE_TABLE_COLUMNS:
      return { ...state, leetcodeTableColumns: action.payload };
    case SET_LEETCODE_TABLE_PAGENATION:
      return { ...state, leetcodeTablePagenation: action.payload };
    case SET_LEETCODE_TABLE_SORTER:
      return { ...state, leetcodeTableSorter: action.payload };
    case SET_LEETCODE_TABLE_FILTER:
      return { ...state, leetcodeTableFilter: action.payload };
    case SET_LEETCODE_TABLE_FILTER_TYPE:
      return { ...state, leetcodeTableFilterType: action.payload };
    case SET_APPLICATION_DATA:
      return { ...state, applicationData: action.payload };
    case SET_SELECTED_APPLICATION_ID:
      sessionStorage.setItem("selectedApplicationId", action.payload);
      return { ...state, selectedApplicationId: action.payload };
    case SET_APPLICATION_TABLE_COLUMNS:
      return { ...state, applicationTableColumns: action.payload };
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
      sessionStorage.setItem("selectedComponentId", action.payload);
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
      sessionStorage.setItem("selectedFavoriteId", action.payload);
      return { ...state, selectedFavoriteId: action.payload };
    case SET_FAVORITE_TABLE_COLUMNS:
      return { ...state, favoriteTableColumns: action.payload };
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

    case SET_PROJECT_DATA:
      return { ...state, projectData: action.payload };
    case SET_PROJECT_PAGENATION: {
      return { ...state, projectPagenation: action.payload };
    }
    case SET_SELECTED_PROJECT_ID: {
      return { ...state, selectedProjectId: action.payload };
    }
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
