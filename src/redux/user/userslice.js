import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

//The Redux Thunk supports 3 different actions based on the API state are like 'pending', 'fulfilled', and 'rejected'.
export const fetchAllUser = createAsyncThunk("users/getAPI", async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
});
export const addUser = createAsyncThunk("user/addUser", async (payload , { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/addUser",
      payload
    );
    if (response.data.dataUser) {
      return response.data.dataUser;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data.message)
  }
  
});
export const updateUser = createAsyncThunk(
  "user/updateApi",
  async (payload, { rejectWithValue }) => {
    const response = await axios.put(
      `http://localhost:5000/users/editUser/${payload._id}`,
      payload
    );
    if (response.data.dataUser) {
      return response.data.dataUser;
    } else {
      return rejectWithValue(response.data.messages);
    }
  }
);
export const deleteUser = createAsyncThunk('user/delete', async(id) => {
    const request = await axios.delete(`http://localhost:5000/users/delete/${id}`);
    return request.data;
})
const initialState = {
  allUser: [],
  loading: true,
  error: null
};

const userslice = createSlice({
  name: "users",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.allUser = action.payload;
      state.loading = false;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.allUser.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.allUser = state.allUser.filter((_) => _._id !== action.payload._id);
      state.allUser.unshift(action.payload);
    });
    builder.addCase(deleteUser.pending, (state,action) => {
        state.loading = true; 
    });
    builder.addCase(deleteUser.fulfilled, (state,action) => {
        state.loading = false;
        state.allUser = state.allUser.filter((_) => _._id !== action.payload);
    })
  },
});

export const getAllUser = (state) => state.user.allUser;
export const getLoading = (state) => state.user.loading;
export const getError = (state) => state.user.error;

export const getUserId = (id) => {
    return(state) => state.user.allUser.filter((_) => _._id === id);
}
export default userslice.reducer;
