import { ThunkMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import searchReducer from 'features/search/searchSlice';
import forecastReducer from 'features/forecast/forecastSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  search: searchReducer,
  forecast: forecastReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk] as [ThunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
