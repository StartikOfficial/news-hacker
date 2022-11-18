import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://hacker-news.firebaseio.com/v0/";

export const getComments = createAsyncThunk(
  "commentsData/getComments", 
  async (arr) => {
    try {
          const comments = await Promise.all(arr.map(async (itemId) => {
            const response = await axios.get(`${URL}item/${itemId}.json`);
            return response.data;
          }));
          console.log(comments);
          return comments;
      } catch (error) {
        console.error(error);
      }
  }
);
  
  const commentsDataSlice = createSlice({
    name: "commentsData",
    initialState: {
      items: [],
      isLoading: false,
      hasError: false
    },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    })
      .addCase(getComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
  }
});

// Selectors
export const selectComments = state => state.commentsData.items;
export const selectLoadingState = state => state.commentsData.isLoading;
export const selectErrorState = state => state.commentsData.hasError;

export default commentsDataSlice;