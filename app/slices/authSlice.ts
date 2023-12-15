import { createAction, createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/config/store"
import { UserType } from "./types/UserType"
import { AuthStateType } from "./types/AuthStateType"
import React from "react"
import EncryptedStorage from "react-native-encrypted-storage"
import { useAppDispatch } from "@/hooks/defaultHooks"


//set initial auth state
const initialState: AuthStateType = {
    isLogin: false,
    user: null,
    token: null
}

export const setLogin = createAction<boolean>('setLogin')
export const setUser = createAction<UserType>('setUser')
export const setToken = createAction<string>('setToken')


//authentication slice
export const authSlice = createSlice({
  name: "auth", //name of the slice
  initialState,
  reducers: {

    //set login state
    setLogin(state, action) {
        state.isLogin = action.payload
        return state
    },
    //set user object
    setUser(state, action) {
        state.user = action.payload
        return state
    },

    //set token
    setToken(state, action) {
        state.token = action.payload
        return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLogin, (state, action) => {
        state.isLogin = action.payload        
    }).addCase(setToken, (state, action) => {
        state.token = action.payload
    }).addCase(setUser,(state, action) => {
        state.user = action.payload
    })
  },
})

export const selectCurrentLoginStatus = (state: AppState) => state.auth.isLogin
export const selectCurrentUser = (state: AppState) => state.auth.user
export const selectCurrentToken = (state: AppState) => state.auth.token

export default authSlice.reducer