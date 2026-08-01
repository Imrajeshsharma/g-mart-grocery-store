import { createSlice } from "@reduxjs/toolkit";

const loadRecentSearches = () => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
};

const initialState = {
    searchTerm: "",
    selectedIndex: -1,
    showSearch: false,
    recentSearches: loadRecentSearches(),
};

const searchSlice = createSlice({
    name: "search",
    initialState,

    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },

        setSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload;
        },

        setShowSearch: (state, action) => {
            state.showSearch = action.payload;
        },

        addRecentSearch: (state, action) => {
            const value = action.payload.trim();

            if (!value) return;

            state.recentSearches = [
                value,
                ...state.recentSearches.filter(
                    (item) => item.toLowerCase() !== value.toLowerCase()
                ),
            ].slice(0, 8);

            localStorage.setItem(
                "recentSearches",
                JSON.stringify(state.recentSearches)
            );
        },

        removeRecentSearch: (state, action) => {
            state.recentSearches = state.recentSearches.filter(
                (item) => item !== action.payload
            );

            localStorage.setItem(
                "recentSearches",
                JSON.stringify(state.recentSearches)
            );
        },

        clearRecentSearches: (state) => {
            state.recentSearches = [];
            localStorage.removeItem("recentSearches");
        },

        resetSearch: (state) => {
            state.searchTerm = "";
            state.selectedIndex = -1;
            state.showSearch = false;
        },

        openSearch: (state) => {
            state.showSearch = true;
        },

        closeSearch: (state) => {
            state.showSearch = false;
        },
    },
});

export const {
    setSearchTerm,
    setSelectedIndex,
    setShowSearch,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    resetSearch,
    openSearch,
    closeSearch,
} = searchSlice.actions;

export default searchSlice.reducer;