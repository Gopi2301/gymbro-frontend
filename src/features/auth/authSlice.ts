import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    value: boolean;
}

const initialState: AuthState = {
    value: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
