import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  admin: false,
  loading: false,
  isLoading: {},
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "getusers",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/user?search=${searchQuery}`); // Adjust the API endpoint for searching
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.error);
    }
  }
);


// export const fetchUsers = createAsyncThunk(
//   "getusers",
//   async ( payload , { rejectWithValue }) => {
//     // console.log(payload);
//     return await fetch("/api/user")
//       .then((data) => data)
//       .then((data) => data.json())
//       .catch((err) => rejectWithValue(err.error)); 
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    setAdminRole: (state, action) => {
      state.admin = action.payload; // Action to set admin role
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, { payload }) => {
        // state.isLoading["getUsers"] = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        // state.isLoading["getUsers"] = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        // console.log(action);
        // state.isLoading["getUsers"] = false;
      });
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = userSlice.actions;

export default userSlice.reducer;

