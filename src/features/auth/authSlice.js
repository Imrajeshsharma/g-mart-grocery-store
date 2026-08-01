import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
};

const initialState = {
    user: loadUser(),
    success: null,
    message: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        register: (state, action) => {
            const { name, email, password } = action.payload;

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const alreadyExists = users.find((u) => u.email === email);

            if (alreadyExists) {
                state.success = false;
                state.message = "Email already exists";
                return;
            }

            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
            };

            users.push(newUser);

            localStorage.setItem("users", JSON.stringify(users));

            state.success = true;
            state.message = "Registration successful";
        },

        login: (state, action) => {
            const { email, password } = action.payload;

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            );

            if (!foundUser) {
                state.success = false;
                state.message = "Invalid Email or Password";
                return;
            }

            state.user = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
            };

            sessionStorage.setItem("user", JSON.stringify(state.user));

            state.success = true;
            state.message = "Login Successful";
        },

        logout: (state) => {
            state.user = null;
            state.success = null;
            state.message = "";

            sessionStorage.removeItem("user");
        },

        clearAuthMessage: (state) => {
            state.success = null;
            state.message = "";
        },
    },
});

export const {
    register,
    login,
    logout,
    clearAuthMessage,
} = authSlice.actions;

export default authSlice.reducer;