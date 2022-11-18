import { configureStore, combineReducers} from '@reduxjs/toolkit';
import itemDataSlice from './slices/storiesDataSlice';
import commentsDataSlice from './slices/commentsSlice';
import {
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    itemData: itemDataSlice.reducer,
    commentsData: commentsDataSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  // reducer: reducers,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store); 