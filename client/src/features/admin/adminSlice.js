import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "../car/carService";
import { adminService } from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    cars: [],
    pagination: null,
    carEdit : {edit: {}, isEdit: false},
    allRentals: [],
    allUsers: [],
    allUserRentals: [],
    allReviews: [],
    isAdminLoading: false,
    isAdminSuccess: false,
    isAdminError: false,
    adminErrorMessage: "",
  },
  reducers: {
    update: (state, action) => {
      state.carEdit = { edit: action.payload, isEdit: true };
    },
    resetEdit: (state) => {
      state.carEdit = { edit: {}, isEdit: false };
    }
  },
  extraReducers: (builder) => {

    builder
      .addCase(adminAllCars.pending, (state, action) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.isAdminError = false;
      })
      .addCase(adminAllCars.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.cars = action.payload.cars;
        state.pagination = action.payload.pagination;
        state.isAdminError = false;
      })
      .addCase(adminAllCars.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = false;
        state.isAdminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllRentalsAdmin.pending, (state, action) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.isAdminError = false;
      })
      .addCase(getAllRentalsAdmin.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        // const formattedArray = Object.entries(action.payload).map(([key, value]) => ({
        //   key,
        //   value
        // }));
        state.allRentals = action.payload;
        state.allUsers = action.payload.users;
        state.allUserRentals = action.payload.users.map((user) => {
          return {
            rentals: user.rentals
          }
        });
        state.isAdminError = false;
      })
      .addCase(getAllRentalsAdmin.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = false;
        state.isAdminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllReviewsAdmin.pending, (state, action) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.isAdminError = false;
      })
      .addCase(getAllReviewsAdmin.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.allReviews = action.payload;
        state.isAdminError = false;
      })
      .addCase(getAllReviewsAdmin.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = false;
        state.isAdminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(addCar.pending, (state, action) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.isAdminError = false;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.cars = [...state.cars, action.payload.car];
        state.isAdminError = false;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = false;
        state.isAdminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(removeCar.pending, (state, action) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.isAdminError = false;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.cars = state.cars.filter((car) => car._id !== action.payload);
        state.isAdminError = false;
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = false;
        state.isAdminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(updateExistingCar.pending, (state, action) => {
        state.isAdminLoading = true;
        state.isAdminSuccess = false;
        state.isAdminError = false;
      })
      .addCase(updateExistingCar.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = true;
        state.cars = state.cars.map((car) =>
          car._id === action.payload.car._id ? action.payload.car : car
        );
        state.isAdminError = false;
      })
      .addCase(updateExistingCar.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.isAdminSuccess = false;
        state.isAdminError = true;
        state.adminErrorMessage = action.payload;
      });
  }
}
);

export default adminSlice.reducer;

export const { update, resetEdit } = adminSlice.actions;

export const adminAllCars = createAsyncThunk(
  "ADMIN/GET_ALLCARS",
  async (page = 1, thunkAPI) => {
    try {
      return await carService.fetchCars(page);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);

    }
  }
)

export const addCar = createAsyncThunk(
  "ADMIN/ADD_CAR",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.createCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateExistingCar = createAsyncThunk(
  "ADMIN/UPDATE_CAR",
  async ( formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    console.log(formData, "formData")
    try {
      return await adminService.updateCar( formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeCar = createAsyncThunk(
  "ADMIN/DELETE_CAR",
  async (carId, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    console.log(carId, "carId")
    try {
      return await adminService.deleteCar(carId, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllRentalsAdmin = createAsyncThunk(
  "ADMIN/GET_ALLRENTALS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.getAllRentals(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllReviewsAdmin = createAsyncThunk(
  "ADMIN/GET_ALLREVIEWS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.getAllReviews(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);