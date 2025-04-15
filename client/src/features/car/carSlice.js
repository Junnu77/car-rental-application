import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";

const initialState = {
  cars: [],
  filters: {
    search: null,
    company: null,
    category: null,
    fuelType: null,
    transmission: null,
  },
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
    limit: 10
  },
  car: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload.cars;
        state.filters = action.payload.filters;
        state.pagination = action.payload.pagination;
        state.isError = false;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCar.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.car = action.payload;
        state.isError = false;
      })
      .addCase(getCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findCar.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(findCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
        state.isError = false;
      })
      .addCase(findCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});


// Get Cars
export const getCars = createAsyncThunk("FETCH/CARS", async (page = 1, thunkAPI) => {
  try {
    return await carService.fetchCars(page);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Car
export const getCar = createAsyncThunk("FETCH/CAR", async (id, thunkAPI) => {
  try {
    return await carService.fetchCar(id);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Find Car
export const findCar = createAsyncThunk("FETCH/FIND", async (query, thunkAPI) => {
  try {
    return await carService.searchCar(query);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export default carSlice.reducer;
