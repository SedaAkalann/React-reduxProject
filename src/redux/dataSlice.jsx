import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  newData: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createDataFunc: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    sortingDataFunc: (state, action) => {
      state.data = [
        ...state.data.sort((a, b) => {
          return action.payload == "asc"
            ? a.price - b.price
            : action.payload == "desc"
            ? b.price - a.price
            : null;
        }),
      ];
    },
    deleteDataItem: (state, action) => {
      state.data = [
        ...state.data.filter((item) => {
          return item.id !== action.payload;
        }),
      ];
    },
    updateDataItem: (state, action) => {
      state.data = [
        ...state.data.map((item) => {
          return item.id == action.payload.id
            ? { ...item, ...action.payload }
            : item;
        }),
      ];
    },
    searchDataFunc: (state, action) => {
      state.newData = action.payload;
    },
  },
});

export const {
  createDataFunc,
  deleteDataItem,
  updateDataItem,
  sortingDataFunc,
  searchDataFunc,
} = dataSlice.actions;

export default dataSlice.reducer;
