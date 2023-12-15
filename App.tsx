import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/config/store';
import MainNavigator from '@/navigators/MainNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useAppDispatch, useAppSelector } from '@/hooks/defaultHooks';
import { selectCurrentLoginStatus, setLogin } from '@/slices/authSlice';
import SplashScreen from '@/screens/Splash/SplashScreen';
import MainContainer from '@/containers/MainContainer';
import { LogBox } from 'react-native';



export default function App(): JSX.Element {

    
    useEffect(() => {
        //Ignore all log notifications
        LogBox.ignoreAllLogs()
    })
    
    return (
        <Provider store={store}>
            <MainContainer />
        </Provider>
    )
}
