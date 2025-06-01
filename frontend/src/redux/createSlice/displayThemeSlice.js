import { createSlice } from '@reduxjs/toolkit';

const initializeDisplayTheme = () => {
  return localStorage.getItem('displayTheme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};


const displayThemeSlice = createSlice({
    name:'displayTheme',
    initialState:initializeDisplayTheme(),
    reducers:{
        changeDisplayTheme(state, action) {
            localStorage.setItem('displayTheme', action.payload);
            return action.payload;
        }

    }
})

export const { changeDisplayTheme}= displayThemeSlice.actions;
export default displayThemeSlice.reducer