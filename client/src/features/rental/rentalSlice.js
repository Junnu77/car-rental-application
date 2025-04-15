import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rentalService from "./rentalService";

const rentalSlice = createSlice({
  name: "rental",
  initialState: {
    rentals: [],
    rental: {},
    rentalEdit: { edit: {}, isEdit: false },
    isRentalLoading: false,
    isRentalSuccess: false,
    isRentalError: false,
    rentalErrorMessage: "",
  },
  reducers: {
    update: (state, action) => {
      state.rentalEdit = { edit: action.payload, isEdit: true };
    },
    resetEdit: (state) => {
      state.rentalEdit = { edit: {}, isEdit: false };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRentals.pending, (state, action) => {
        state.isRentalLoading = true;
        state.isRentalSuccess = false;
        state.isRentalError = false;
      })
      .addCase(getRentals.fulfilled, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = true;
        state.rentals = action.payload;
        state.isRentalError = false;
      })
      .addCase(getRentals.rejected, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = false;
        state.isRentalError = true;
        state.rentalErrorMessage = action.payload;
      })
      .addCase(getRental.pending, (state, action) => {
        state.isRentalLoading = true;
        state.isRentalSuccess = false;
        state.isRentalError = false;
      })
      .addCase(getRental.fulfilled, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = true;
        state.rental = action.payload;
        state.isRentalError = false;
      })
      .addCase(getRental.rejected, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = false;
        state.isRentalError = true;
        state.rentalErrorMessage = action.payload;
      })
      .addCase(addRental.pending, (state, action) => {
        state.isRentalLoading = true;
        state.isRentalSuccess = false;
        state.isRentalError = false;
      })
      .addCase(addRental.fulfilled, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = true;
        state.rental = action.payload;
        state.isRentalError = false;
      })
      .addCase(addRental.rejected, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = false;
        state.isRentalError = true;
        state.rentalErrorMessage = action.payload;
      })
      .addCase(updateCarRental.pending, (state) => {
        state.isRentalLoading = true;
        state.isRentalError = false;
      })
      .addCase(updateCarRental.fulfilled, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalSuccess = true;
        state.rental = {...state.rental , ...action.payload.bookingDetails};
        state.rentals = state.rentals.map((rental) =>
          rental._id === action.payload.bookingDetails.rentalId 
            ? { ...rental, ...action.payload.bookingDetails } 
            : rental
        );
        state.rentalEdit = { edit: {}, isEdit: false };
      })
      .addCase(updateCarRental.rejected, (state, action) => {
        state.isRentalLoading = false;
        state.isRentalError = true;
        state.rentalErrorMessage = action.payload;
      });
  },
});

export const { update, resetEdit } = rentalSlice.actions;

export default rentalSlice.reducer;

// GET Rentals
export const getRentals = createAsyncThunk(
  "FETCH/RENTALS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await rentalService.fetchRentals(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET Rental
export const getRental = createAsyncThunk(
  "FETCH/RENTAL",
  async (cid, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await rentalService.fetchRental(cid, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Rental
export const addRental = createAsyncThunk(
  "RENTAL/ADD",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await rentalService.createRental(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Rental
export const updateCarRental = createAsyncThunk(
  "RENTAL/UPDATE",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    console.log(formData)
    try {
      return await rentalService.updateRental(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);