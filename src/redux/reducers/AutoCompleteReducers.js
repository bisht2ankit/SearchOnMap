import { types } from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case types.GET_AUTOCOMPLETE_RESULT:
            return action.payload;
        case types.CLEAR_AUTOCOMPLETE_RESULT:
            return action.payload;
        default:
            return state;
    }
}