import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from './api/baseApi';
import {rtkQueryErrorMiddleware} from './middleware/errorMiddleware';
import { authSlice, appSlice } from './slices';

export const store = configureStore({
  reducer: {
    // API
    [baseApi.reducerPath]: baseApi.reducer,
    
    // App slices
    auth: authSlice,
    app: appSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [baseApi.util.resetApiState.type],
      },
    })
    .concat(baseApi.middleware)
    .concat(rtkQueryErrorMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;