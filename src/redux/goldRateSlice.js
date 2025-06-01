import { createSlice } from '@reduxjs/toolkit';

const goldRateSlice = createSlice({
  name: 'goldRate',
  initialState: {
    rate: 0,
  },
  reducers: {
    updateRate: (state, action) => {
      state.rate = action.payload;
    },
  },
});

export const { updateRate } = goldRateSlice.actions;
export default goldRateSlice.reducer;
