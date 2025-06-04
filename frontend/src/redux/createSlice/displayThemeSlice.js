import { createSlice } from '@reduxjs/toolkit';

// Helper: Initialize displayTheme from localStorage or system preference
const initializeDisplayTheme = () => {
  try {
    return (
      JSON.parse(localStorage.getItem('AppDetail'))['displayTheme'] ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  } catch (err) {
    console.error('Failed to read displayTheme from localStorage', err);
    return 'light'; 
  }
};

const updateDisplayTheme = (value) => {
  try {
    const appDetail =JSON.parse(localStorage.getItem('AppDetail')) || {}
    appDetail['displayTheme']=value
    localStorage.setItem('AppDetail', JSON.stringify(appDetail));
  } catch (err) {
    console.error('Failed to set displayTheme in localStorage', err);
  }
};

const clearDisplayTheme = () => {
  try {
    const appDetail = JSON.parse(localStorage.getItem('AppDetail')) || {};
    delete appDetail['displayTheme'];
    localStorage.setItem('AppDetail', JSON.stringify(appDetail));
    return 
  } catch (err) {
    console.error('Failed to remove displayTheme from localStorage', err);
  }
};

const displayThemeSlice = createSlice({
  name: 'displayTheme',
  initialState: initializeDisplayTheme(),
  reducers: {
    changeDisplayTheme(state, action) {
      updateDisplayTheme(action.payload);
      return action.payload;
    },
    resetDisplayTheme() {
      clearDisplayTheme();
      updateDisplayTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }
});

export const { changeDisplayTheme, resetDisplayTheme } = displayThemeSlice.actions;
export default displayThemeSlice.reducer;