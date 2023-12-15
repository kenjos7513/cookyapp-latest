import CustomIcon from '@/components/CustomIcon/CustomIcon'
import StyleConfig from '@/config/StyleConfig'
import { useEffect, useState } from 'react'
import { Text, View, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './stylesheets/LoginStyleSheet'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import authServices from '@/services/auth/auth.services'
import { useAppDispatch, useAppSelector } from '@/hooks/defaultHooks'
import { selectCurrentLoginStatus, setLogin, setToken, setUser } from '@/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import GenericModal from '@/components/Modals/GenericModal/GenericModal'
//import Icon from 'react-native-vector-icons/FontAwesome'



function LoginScreen({ navigation }: any): React.JSX.Element {

    //set default width and height based on device's dimension
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [isEyeClosed, setEye] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorModal, showErrorModal] = useState<boolean>(false)

    const dispatch = useAppDispatch()


    const [username, setUsername] = useState<string>('')
    const [password, setPassword ] = useState<string>('')

    const [shouldRedirect, setRedirect ] =useState<boolean>(false)


    const isLogin = useAppSelector(selectCurrentLoginStatus)

    //load only once to fill up width and height
    useEffect(() => {
        
        setWidth(Dimensions.get('window').width)
        setHeight(Dimensions.get('window').height)

        //initialize csrf cookie
        _initializeCookie()

        if ( isLogin ) {

            //redirect now to dashboard
            navigation.navigate('DashboardStack')
        }


    },[ isLogin])

    const _closeModal = () => {
        showErrorModal(false)
    }

    const _initializeCookie = () => {
        
        //initialize cors cookie
        authServices.getCsrfCookie()
    }

    const _toggleEye = () => {
        //toggle eye close || open
        setEye(!isEyeClosed)
    }

    //update width and height if layout dimension changes
    const _onLayout = () => {
        const { width: dimensionWidth, height: dimensionHeight } = Dimensions.get('window')
        if (width !== dimensionWidth || height !== dimensionHeight ) {
          setWidth(dimensionWidth)
          setHeight(dimensionHeight)
        }
    }

    const _login = () => {

        setLoading(true)
        showErrorModal(false)
        authServices.login({
            email: username,
            password
        }).then(r => {
            setLoading(false)

            //update user
            dispatch(setUser(r.user))

            //update token
            dispatch(setToken(r.token))

            //set login
            dispatch(setLogin(true))

            setRedirect(true)


        

        }).catch(e => {
            
            setLoading(false)
            showErrorModal(true)
            console.log('wrong username or password ', e)
        })
    }

    return (
        <KeyboardAvoidingView
            onLayout={_onLayout}
            behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
            style={[styles.container,{ width, height}]}>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <>
                <View style={{flex: 1, flexDirection: 'column', width: '100%', position: 'relative'}}>
                    {
                        !loading ?
                        (<><View style={{flex: 0.6,width: '100%', flexDirection: 'column',  justifyContent: 'center',alignItems: 'center'}}>
                            <CustomIcon name='cooky' />
                            <Text style={styles.subTitle}>
                                {'Recipes from all over the world'}
                                {
                                    isLogin ? 'true' : 'false'
                                }
                            </Text>
                        </View>
                        
                        <View style={[styles.viewGroup,{ paddingBottom: 24}]}>
                            <Text style={[styles.inputLabel,{width: '100%'}]}>{'Email Address'}</Text>
                            <View style={[styles.textInputWrapper, {width: '100%'}]}>
                            <TextInput
                                style={[ styles.textInput ]}
                                value={username}
                                onChangeText={setUsername}
                                underlineColorAndroid='transparent' />
                            </View>
                        </View>

                        <View style={[styles.viewGroup, { paddingBottom: 24, position: 'relative'}]}>
                            <Text style={[styles.inputLabel,{width: '100%'}]}>{'Password'}</Text>
                            <View style={[styles.textInputWrapper, {width: '100%', position: 'relative'}]}>
                                <TextInput
                                    style={[ styles.textInput ]}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={(isEyeClosed) ? true : false}
                                    underlineColorAndroid='transparent' />

                                <Pressable onPress={_toggleEye} style={{position: 'absolute', right: 13, zIndex: 100, bottom: 12}}>
                                    <FontAwesomeIcon icon={(isEyeClosed) ? faEyeSlash : faEye} size={20} color="#757575"/>
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.viewGroup, {paddingBottom: 114}]}>
                            <TouchableOpacity
                                onPress={_login}
                                style={{backgroundColor: StyleConfig.primaryColor, paddingTop: 9, paddingBottom: 9, borderRadius: 200}}>
                                <Text style={{color: 'white', fontFamily: 'Lexend-Regular', width: '100%', textAlign: 'center'}}>{'Log In'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.viewGroup,{flexDirection: 'row', justifyContent: 'center'}]}>
                            <Text style={{fontWeight: '700',color: StyleConfig.secondaryColor, marginRight: 4, fontFamily: 'Lexend-Regular'}}>{'Not yet registered?'}</Text>
                            <TouchableOpacity style={{marginTop: 2}} onPress={() => {
                                navigation.navigate('RegisterStack')
                            }}>
                                <Text style={{color: StyleConfig.primaryColor, textDecorationLine: 'underline', textDecorationColor: StyleConfig.primaryColor, fontFamily: 'Lexend-Regular', fontSize: 12, fontWeight: '700', textTransform: 'uppercase'}}>{'Sign up Now!'}</Text>
                            </TouchableOpacity>
                            
                        </View>
                        </>
                        ) : (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'Lexend-Regular', width: '100%', color: StyleConfig.secondaryColor, fontSize: 20, textAlign: 'center'}}>
                                    {'Logging in...'}
                                </Text>
                            </View>     
                        )
                    }
                </View>
                <GenericModal closeText='close' show={errorModal} closeModal={_closeModal} message='Wrong username or password' title='Login Error'/>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}



export default LoginScreen