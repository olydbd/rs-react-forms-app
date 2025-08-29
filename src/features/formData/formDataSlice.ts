import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';
import type { Schema } from '../../utils/validation';
import type { RootState } from '../../app/store';

export type SchemaStore = Omit<Schema, 'picture'> & { picture: string };

export interface FormDataState {
  controlledForm: SchemaStore | null;
  uncontrolledForm: SchemaStore | null;
}

const initialState: FormDataState = {
  controlledForm: null,
  uncontrolledForm: null,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addControlledData: (state, action: PayloadAction<SchemaStore>) => {
      state.controlledForm = action.payload;
    },
    addUncontrolledData: (state, action: PayloadAction<SchemaStore>) => {
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
