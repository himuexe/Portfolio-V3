import { configureStore } from '@reduxjs/toolkit';
import isLoaderReducer from './isLoader.slice';
import workSectionIndexReducer from './workSectionIndex.slice';

export const store = configureStore({
  reducer: {
    isLoader: isLoaderReducer,
    workSectionIndex: workSectionIndexReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 