import { types } from "../actions/types";
let recentSearches = [];

export default (state = [], action) => {
    switch (action.type) {
        case types.GET_RECENT_SEARCHES:
            const found = recentSearches.some(item => item.id === action.payload.id);
            if(recentSearches.length < 5 && !found){
                recentSearches = [...recentSearches, action.payload]
            }
            return recentSearches;
        default:
            return state;
    }
}