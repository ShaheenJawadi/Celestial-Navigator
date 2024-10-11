import { configureStore } from '@reduxjs/toolkit';
import generalState from './generalState';

const store = configureStore({
  reducer: {
    generalState,
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
