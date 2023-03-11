import { createSlice } from '@reduxjs/toolkit';
import type { CalculatorSchema } from '../types/calculatorSchema';

const initialState: CalculatorSchema = {
  value: '0',
  a: '',
  b: '',
  sign: '',
  empty: false,
  order: [ { id: 1, elm: 0 },
    { id: 2, elm: 1 },
    { id: 3, elm: 2 },
    { id: 4, elm: 3 } ],
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    choose: (state, { payload }) => {

      if (state.empty) {
        state.value = '';
        state.empty = false;
      }

      if (!state.a) {
        state.value = '';
      }

      if (state.sign) {
        state.b += payload;
        state.value += payload;
      } else {
        state.a += payload;
        state.value += payload;
      }
    },
    chooseSign: (state, { payload }) => {
      if (state.value && !state.a) {
        state.a = state.value;
      }

      state.empty = true;
      state.sign = payload;
    },
    equal: (state) => {
      switch (state.sign) {
      case '+': {
        state.value = String(Number(state.a) + Number(state.b));
        return;
      }
      case '-': {
        state.value = String(Number(state.a) - Number(state.b));
        return;
      }
      case 'x': {
        state.value = String(Number(state.a) * Number(state.b));
        return;
      }
      case '/': {
        state.value = String(Number(state.a) / Number(state.b));
        return;
      }
      default: return;
      }
    },
    clear: (state) => {
      state.empty = false;
      state.a = '';
      state.b = '';
      state.sign = '';
    },
    order: (state, { payload }) => {
      state.order = payload;
    },
    emptyValue: (state) => {
      state.value = '0';
      state.empty = true;
    }
  },
});

export const { actions: calculatorActions } = calculatorSlice;
export const { reducer: calculatorReducer } = calculatorSlice;
