import { Text, View } from "react-native"
import { selectCurrentLoginStatus, setLogin, setToken, setUser } from '@/slices/authSlice'
import { useAppDispatch, useAppSelector } from "@/hooks/defaultHooks"
import LoginScreen from "@/screens/Login/LoginScreen"
import MainNavigator from "@/navigators/MainNavigator"
import { useEffect, useState } from "react"
import authServices from "@/services/auth/auth.services"
import EncryptedStorage from "react-native-encrypted-storage"
import SplashScreen from "@/screens/Splash/SplashScreen"


function MainContainer(): JSX.Element {

    //set loading by default to true
    const [loading,setLoading] = useState<boolean>(true)

    //get current login state
    const isLogin = useAppSelector(selectCurrentLoginStatus)

    //use app dispatch hook
    const dispatch = useAppDispatch()

    useEffect(() =>{
        checkLoginSession()
    },[])

    const checkLoginSession = async () => {
        try {
            let userSession = await EncryptedStorage.getItem('cooky_user_session')
            let userToken = await EncryptedStorage.getItem('cooky_user_token')

            setLoading(false)
            if ( userSession != null ) {
                dispatch(setLogin(true))
                dispatch(setUser(JSON.parse(userSession)))
            }

            if ( userToken != null ) {
                dispatch(setToken(userToken))
            }

        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <>
        {
            loading ? <SplashScreen /> : <MainNavigator />
        }
        </>
        
    )
}
export default MainContainer