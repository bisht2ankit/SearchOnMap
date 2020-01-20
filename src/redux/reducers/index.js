import {combineReducers} from 'redux';
import AutoCompleteReducers from './AutoCompleteReducers';
import RecentSearcheReducers from "./RecentSearcheReducers";

export default combineReducers({
    places: AutoCompleteReducers,
    recentSearches: RecentSearcheReducers
})