import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string | null;
        email: string | null;
        fullName: string | null;
        token: string | null;
    };
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: null,
        email: null,
        fullName: null,
        token: null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                id: null,
                email: null,
                fullName: null,
                token: null
            }
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
