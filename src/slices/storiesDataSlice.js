import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://hacker-news.firebaseio.com/v0/";

// количество новостей
const spl = 100;

export const getNewItems = createAsyncThunk(
  "itemData/getNewItems", 
  async () => {
    try {
        const response = await axios.get(
            `${URL}newstories.json`,
          );
          const newStories = response.data.splice(0, spl);
          const itemsData = await Promise.all(newStories.map(async (itemId) => {
            const response = await axios.get(`${URL}item/${itemId}.json`);
            return response.data;
          }));
          return itemsData;
      } catch (error) {
        console.error(error);
      }
  }
);
  
  const itemDataSlice = createSlice({
    name: "itemData",
    initialState: {
      items: [],
      isLoading: false,
      hasError: false
    },
  extraReducers: (builder) => {
    builder
      .addCase(getNewItems.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    })
      .addCase(getNewItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getNewItems.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
  }
});

// Selectors
export const selectItems = state => state.itemData.items;
export const selectLoadingState = state => state.itemData.isLoading;
export const selectErrorState = state => state.itemData.hasError;

export default itemDataSlice;