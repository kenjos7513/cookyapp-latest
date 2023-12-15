import { TouchableOpacity, View } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash, faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";



import { Tooltip } from '@rneui/themed'
import { useState } from "react";
import authServices from "@/services/auth/auth.services";
import { useAppDispatch } from "@/hooks/defaultHooks";
import { selectCurrentLoginStatus, setLogin, setToken } from "@/slices/authSlice";


function HeaderRight(props: any): React.JSX.Element {

    const {
        color,
        navigation
    } = props

    const [open, setOpen] = useState<boolean>(false)
    
    const dispatch = useAppDispatch()

    const _logout = () => {
        
        authServices.logout().then(() => {
            dispatch(setLogin(false))
            dispatch(setToken(''))
            navigation.navigate('Login')
        })

    }



    return (
    <View style={{position: 'absolute', right: 17}}>
        <TouchableOpacity onPress={_logout}>
            <FontAwesomeIcon icon={faSignOut} size={20} color={color}/>
        </TouchableOpacity>
    
    </View>)
}

export default HeaderRight