import { SET_CLICKED_HOME_PAGE_ITEM } from "./constants";

const initialState = {
    clickedHomePageItem: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLICKED_HOME_PAGE_ITEM:
            return { ...state, clickedHomePageItem: action.payload };
        default:
            return state;
    }
}