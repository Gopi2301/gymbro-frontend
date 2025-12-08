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
    role: string | null;
}

// Hydrate state from localStorage
const token = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");
const role = localStorage.getItem("role");

const initialState: AuthState = {
  isAuthenticated: !!token,
  user: {
    id: null,
    email: null,
    fullName: null,
    role: role
  },
  token: token,
  refreshToken: refreshToken,
  role: role,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{user: AuthState['user'], token: string, refreshToken: string, role: string}>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.role = action.payload.role;
            
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
            state.token = null;
            state.refreshToken = null;
            state.role = null;

            // remove tokens from localStorage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("role");
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