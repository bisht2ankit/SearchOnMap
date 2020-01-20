import axios from 'axios';
import { baseUrl } from "./baseUrls";
import { GOOGLE_API_KEY } from "../../constants";
import { handleApiResponseErrorCase } from "../../utils.js";
import { types } from './types';

export const getAutoCompleteResults = (queryParams) => async dispatch  => {
    let url = `${baseUrl.GOOGLE_API}/api/place/autocomplete/json?key=${GOOGLE_API_KEY}`
    try {
        const res = await axios.get(url, {params:queryParams })
        dispatch({
            type: types.GET_AUTOCOMPLETE_RESULT,
            payload: res.data && res.data.predictions ? res.data.predictions : []
        })
    } catch (error) {
        handleApiResponseErrorCase(error);
    }
}

export const geocodeApi = async (queryParams) => {
    let url = `${baseUrl.GOOGLE_API}/api/geocode/json?key=${GOOGLE_API_KEY}`
    try {
        const res = await axios.get(url, {params:queryParams })
        return res.data && res.data.results ? res.data.results[0] : [];
    } catch (error) {
        handleApiResponseErrorCase(error);
    }
}

export const clearAutoCompleteResults = () => async dispatch  => {
    dispatch({
        type: types.CLEAR_AUTOCOMPLETE_RESULT,
        payload: []
    })
}

export const saveRecentSearches = (data) => async dispatch  => {
    dispatch({
        type: types.GET_RECENT_SEARCHES,
        payload: data
    })
}

export const reverseGeocoding = async(queryParams) => {
    let url = `${baseUrl.GOOGLE_API}/api/geocode/json?key=${GOOGLE_API_KEY}`
    try {
        const res = await axios.get(url, {params:queryParams })
        return res.data && res.data.results ? res.data.results[0] : [];
    } catch (e) {
        handleApiResponseErrorCase(e,false);
    }
}
