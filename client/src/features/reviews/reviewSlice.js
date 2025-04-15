import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addReview, getReviews } from "./reviewService";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCarReview.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
            .addCase(addCarReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews.push(action.payload)
                // state.reviews = [...state.reviews, action.payload]
                state.isSuccess = true;
            })
            .addCase(addCarReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCarReviews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getCarReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getCarReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});


export const addCarReview = createAsyncThunk("review/addReview", async ({id, rating, comment}, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    // const token = thunkAPI.getState()

    console.log( token)
    try {
        return await addReview({id, rating, comment, token});
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
    }
});

export const getCarReviews = createAsyncThunk("review/getReviews", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
        return await getReviews(id, token);
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
    }
});


export default reviewSlice.reducer;

