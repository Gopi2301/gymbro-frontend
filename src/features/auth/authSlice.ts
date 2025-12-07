import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string | null;
        email: string | null;
        fullName: string | null;
        role: string | null;
    };
    token: string | null;
    refreshToken: string | null;
}

// interface User {
//   id: string | null;
//   email: string | null;
//   fullName: string | null;
//   role?: string | null;
// }

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    fullName: null,
    role: null
  },
  token: null,
  refreshToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            // store tokens in localStorage
            localStorage.setItem("access_token", action.payload.token);
            localStorage.setItem("refresh_token", action.payload.refreshToken);
            localStorage.setItem("role", action.payload.role);
            
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                id: null,
                email: null,
                fullName: null,
                role: null,
            }

            // remove tokens from localStorage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
        setCredentials: (state, action: PayloadAction<{token: string, refreshToken?: string}>) => {
            state.token = action.payload.token;
            if(action.payload.refreshToken){
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem("refresh_token", action.payload.refreshToken);
            }
            localStorage.setItem("access_token", action.payload.token);
        },
    }
})

export const { login, logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: AuthState) => state.token;
export const selectCurrentRefreshToken = (state: AuthState) => state.refreshToken;

