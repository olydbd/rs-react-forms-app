import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';

const initialCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Australia',
  'Brazil',
  'India',
  'China',
  'Japan',
  'South Korea',
  'Mexico',
  'Russia',
  'Belarus',
  'South Africa',
  'Ukraine',
  'Norway',
  'Sweden',
  'Poland',
];

export const countriesSlice = createSlice({
  initialState: initialCountries,
  name: 'countries',
  reducers: {
    setCountries: (_state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
