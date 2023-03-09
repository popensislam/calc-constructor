import { configureStore } from '@reduxjs/toolkit';
import { calculatorReducer } from 'entities/Calculator';

export function createReduxStore() {
  return configureStore({
    reducer: { calc: calculatorReducer },
    devTools: __IS_DEV__,
  });
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
