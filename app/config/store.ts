import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "@/slices/authSlice";
import { themeSlice } from "@/slices/themeSlice";


//configure our store
export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [themeSlice.name]: themeSlice.reducer
    },
})

//create now the make store function that returns the store object
const makeStore = () => store


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof makeStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;