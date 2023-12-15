import { createAction, createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/config/store"
import { ThemeStateType } from "./types/ThemeStateType"


//set initial auth state
const initialState: ThemeStateType = {
    theme: 'light'
}

export const setTheme = createAction<boolean>('setTheme')

//theme slice
export const themeSlice = createSlice({
  name: "theme", //name of the slice
  initialState,
  reducers: {

    //set theme state
    setTheme(state, action) {
      state.theme = action.payload
      return state
    },
  }
})

export const selectCurrentTheme = (state: AppState) => state.theme.theme
export default themeSlice.reducer