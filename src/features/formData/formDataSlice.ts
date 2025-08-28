import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';
import type { Schema } from '../../utils/validation';
import type { RootState } from '../../app/store';

export interface FormDataState {
  data: Schema | null;
}

const initialState: FormDataState = {
  data: null,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Schema>) => {
      state.data = action.payload;
    },
  },
});

export const { addData } = formDataSlice.actions;

export const formData = (state: RootState) => state.formData.data;

export default formDataSlice.reducer;
