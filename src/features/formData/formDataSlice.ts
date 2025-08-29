import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';
import type { Schema } from '../../utils/validation';
import type { RootState } from '../../app/store';

export interface FormDataState {
  controlledForm: Schema | null;
  uncontrolledForm: Schema | null;
}

const initialState: FormDataState = {
  controlledForm: null,
  uncontrolledForm: null,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addControlledData: (state, action: PayloadAction<Schema>) => {
      state.controlledForm = action.payload;
    },
    addUncontrolledData: (state, action: PayloadAction<Schema>) => {
      state.uncontrolledForm = action.payload;
    },
  },
});

export const { addControlledData, addUncontrolledData } = formDataSlice.actions;

export const formControlledData = (state: RootState) =>
  state.formData.controlledForm;
export const formUncontrolledData = (state: RootState) =>
  state.formData.uncontrolledForm;

export default formDataSlice.reducer;
