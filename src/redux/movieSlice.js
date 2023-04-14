import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPopular = createAsyncThunk(
  "film/getPopular",
  async (getTag) => {
    const url = `https://api.themoviedb.org/3/${getTag}?api_key=7b383e246aa19716ce0c8d708f256643`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const getTopRated = createAsyncThunk(
  "film/getTopRated",
  async (getTag) => {
    const url = `https://api.themoviedb.org/3/${getTag}?api_key=7b383e246aa19716ce0c8d708f256643`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const getNowPlaying = createAsyncThunk(
  "film/getNowPlaying",
  async (getTag) => {
    const url = `https://api.themoviedb.org/3/${getTag}?api_key=7b383e246aa19716ce0c8d708f256643`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const getUpcoming = createAsyncThunk(
  "film/getLatest",
  async (getTag) => {
    const url = `https://api.themoviedb.org/3/${getTag}?api_key=7b383e246aa19716ce0c8d708f256643`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const getSimilar = createAsyncThunk(
  "film/getSimilar",
  async (getTag) => {
    const url = `https://api.themoviedb.org/3/${getTag}?api_key=7b383e246aa19716ce0c8d708f256643`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const filmSlice = createSlice({
  name: "films",
  initialState: {
    popular: [],
    topRated: [],
    nowPlaying: [],
    upcoming: [],
    similar: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopular.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopular.fulfilled, (state, { payload }) => {
        state.popular = payload.results;
        state.loading = false;
      })
      .addCase(getPopular.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTopRated.pending, (state) => {
        state.loading = false;
      })
      .addCase(getTopRated.fulfilled, (state, { payload }) => {
        state.topRated = payload.results;
        state.loading = false;
      })
      .addCase(getTopRated.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNowPlaying.pending, (state) => {
        state.loading = false;
      })
      .addCase(getNowPlaying.fulfilled, (state, { payload }) => {
        state.nowPlaying = payload.results;
        state.loading = false;
      })
      .addCase(getNowPlaying.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSimilar.pending, (state) => {
        state.loading = false;
      })
      .addCase(getSimilar.fulfilled, (state, { payload }) => {
        state.similar = payload.results;
        state.loading = false;
      })
      .addCase(getSimilar.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUpcoming.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUpcoming.fulfilled, (state, { payload }) => {
        state.upcoming = payload.results;
        state.loading = false;
      })
      .addCase(getUpcoming.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const filmReducer = filmSlice.reducer;
