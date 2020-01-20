import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from "../reducers";
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['recentSearches']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);