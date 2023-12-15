import apiConfig from "@/config/apiConfig"
import axios from "axios"
import EncryptedStorage from "react-native-encrypted-storage"
import LoginFormType from "./types/LoginFormType"
import UserRegisterType from "./types/UserRegisterType"

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const authServices = {
    login,
    register,
    getCsrfCookie,
    logout
}


function getCsrfCookie() {
    return axios.get(`${apiConfig.apiGateway.URL}${apiConfig.Account.endpoints.cookie}`).then(res => {
        return Promise.resolve(res.data)
    }).catch(e => {
        return Promise.reject(e)
    })
    
}

function register(fields: UserRegisterType) {
    
    return axios.post(
        `${apiConfig.apiGateway.URL}${apiConfig.Account.endpoints.register}`,
        fields
    ).then(res => {
        if ( res.data.status == "ok") {

            //save user session to encrypted storage
            EncryptedStorage.setItem('cooky_user_session', JSON.stringify(res.data.user))

            //save user token too for requesting protected routes
            EncryptedStorage.setItem('cooky_user_token', res.data.token)

            return Promise.resolve({
                status: res.data.status,
                user: res.data.user,
                token: res.data.token
            })
        } else {
            return Promise.reject("An error occured while trying to register a user.")
        }
        
    }).catch(e => {
        return Promise.reject(e)
    })
}

function logout() {
    return EncryptedStorage.removeItem('cooky_user_session').then(() => {
        //save user token too for requesting protected routes
        EncryptedStorage.removeItem('cooky_user_token')
        return Promise.resolve('ok')
    })


}
function login(fields: LoginFormType) {
    return axios.post(
        `${apiConfig.apiGateway.URL}${apiConfig.Account.endpoints.login}`,
        fields
    ).then(res => {

        //save user session to encrypted storage
        EncryptedStorage.setItem('cooky_user_session', JSON.stringify(res.data.user))

        //save user token too for requesting protected routes
        EncryptedStorage.setItem('cooky_user_token', res.data.token)

        return Promise.resolve({
            user: res.data.user,
            token: res.data.token
        })
    }).catch(e => {
        return Promise.reject(e)
    })

}


export default authServices