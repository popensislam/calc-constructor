import { configureStore } from '@reduxjs/toolkit';


export function createReduxStore() {
  return configureStore({
    reducer: {},
    devTools: __IS_DEV__,
  });
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
