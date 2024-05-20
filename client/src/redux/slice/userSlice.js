
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../service/userService";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            return await userService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)
export const signupUser = createAsyncThunk(
    'auth/signup',
    async (userData, thunkAPI) => {
        try {
            return await userService.signup(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)
export const changePassword=createAsyncThunk(
    'auth/changePassword',
    async (userData, thunkAPI) => {
        try {
            return await userService.changePassword(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)

export const logOutUser = createAsyncThunk(
    'auth/logout',
    async (thunkAPI) => {
        try {
            return await userService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const isAdmin = createAsyncThunk(
    'canbo/isAdmin',
    async (thunkAPI) => {
        try {
            return await userService.isAdmin();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }

    }
)
const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const stateInformation = {
    user: getUserFromLocalStorage,
    status: '',
    message: ''
}
export const userSlice = createSlice({
    name: 'user',
    initialState: stateInformation,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'Loading';

            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'Successful';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'Rejected';
                state.message = action.error;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'Loading';

            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'Successful';
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'Rejected';
                state.message = action.error;
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.status = 'Successful';
                state.user = null;

            }).addCase(changePassword.pending, (state) => {
            state.status = 'Loading';

        })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = 'Successful';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'Rejected';
            })
    }

})

export default userSlice.reducer;