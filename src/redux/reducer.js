import {
    SET_CLICKED_HOME_PAGE_ITEM_ID,
    SET_PORTFOLIO_DATA,
    SET_EDIT_PORTFOLIO_ID,
    SET_LEETCODE_DATA,
    SET_EDIT_LEETCODE_ID
} from "./constants";

const initialState = {
    clickedHomePageItemId: null,
    portfolioData: { data: [], meta: {} },
    editPortfolioId: null,
    leetcodeData: { data: [], meta: {} },
    editLeetcodeId: null,
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
            case SET_EDIT_LEETCODE_ID:
                return { ...state, editLeetcodeId: action.payload };
        default:
            return state;
    }
}
