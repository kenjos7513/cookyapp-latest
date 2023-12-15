import { useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from "./stylesheets/RegisterStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import CheckBox from '@react-native-community/checkbox';
import StyleConfig from "@/config/StyleConfig";
import RegisterFormType from "./types/RegisterFormType";
import authServices from "@/services/auth/auth.services";
import GenericModal from "@/components/Modals/GenericModal/GenericModal";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks/defaultHooks";
import { selectCurrentLoginStatus, setLogin, setToken, setUser } from "@/slices/authSlice";

function RegisterScreen({ navigation } : any): React.JSX.Element {

    //set default width and height based on device's dimension
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")
    const [termsConditions, setTermsConditions] = useState<boolean>(false)
    const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false)
    const [isPasswordEyeClosed, setPasswordEye ] = useState<boolean>(true)
    const [isRePasswordEyeClosed, setRePasswordEye ] = useState<boolean>(true)
    const [passwordErrorLabel, showPasswordErrorLabel] = useState<boolean>(false)
    const [rePasswordErrorLabel, showRePasswordErrorLabel] = useState<boolean>(false)
    const [nameErrorlabel, showNameErrorLabel] = useState<boolean>(false)
    const [emailErrorlabel, showEmailErrorLabel] = useState<boolean>(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("")
    const [errorModal, showErrorModal] = useState<boolean>(false)
    
    const [loading, setLoading] = useState<boolean>(false)



    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(selectCurrentLoginStatus)
    

    
    const [formErrors, setFormError] = useState<any>({
        name: true,
        email: true,
        password: true,
        rePassword: true,
        termsConditions: true,
        privacyPolicy: true       
    })

    const _initializeCookie = () => {
        
        //initialize cors cookie
        authServices.getCsrfCookie()
    }


    useEffect(() => {

        //initialize csrf cookie
        _initializeCookie()

        if ( isLogin ) {
            //redirect now to dashboard
            navigation.navigate('DashboardStack')
        }
    },[isLogin])

    const _togglePasswordEye = () => {
        //toggle eye close || open
        setPasswordEye(!isPasswordEyeClosed)
    }

    const _updateName = (value: string) => {
        setName(value)
        let formErrorsCopy = formErrors
        if ( value == "" ) {
            formErrorsCopy.name = true
            showNameErrorLabel(true)
        } else {
            formErrorsCopy.name = false
            showNameErrorLabel(false)
        }
        setFormError(formErrorsCopy)
    }

    const _updateEmail = (value: string) => {
        setEmail(value)
        let formErrorsCopy = formErrors
        if ( value == "" ) {
            formErrorsCopy.email = true
            setEmailErrorMessage("Email is required.")
            showEmailErrorLabel(true)
        } else {
            //validate if valid email using regular expression pattern
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

            if ( !value.match(validRegex) ) {
                formErrorsCopy.email = true
                showEmailErrorLabel(true)
                setEmailErrorMessage("Please enter a valid email address.")
            } else {
                formErrorsCopy.email = false
                showEmailErrorLabel(false)
            }
        }

        setFormError(formErrorsCopy)
    }

    const _signUp = () => {
        //check form first if all fields are valid
        let hasError: boolean = false

        let fields: string[] = ['name','email','password','rePassword', 'termsConditions','privacyPolicy']

        fields.map((field: string) => {
            if ( formErrors[field] )
                hasError = true
        })

        if ( !hasError ) {
            setLoading(true)
            authServices.register({
                name,
                email,
                password,
                re_password: rePassword
            }).then((r) => {
                setLoading(false)
                 //update user
                dispatch(setUser(r.user))

                //update token
                dispatch(setToken(r.token))

                //set login
                dispatch(setLogin(true))

            }).catch(e => {
                setLoading(false)
                console.log('error occured', e)
            })
        } else {
            console.log(formErrors)
            showErrorModal(true)
        }

    }

    const _updateTermsConditions = (value: boolean) => {
        console.log('terms', value)
        let formErrorsCopy = formErrors
        if ( !value ) {
            formErrorsCopy.termsConditions = true
        } else {
            formErrorsCopy.termsConditions = false
        }
        setTermsConditions(value)
        setFormError(formErrorsCopy)
    }

    const _updatePrivacyPolicy = (value: boolean) => {
        let formErrorsCopy = formErrors
        if ( !value ) {
            formErrorsCopy.privacyPolicy = true
        } else {
            formErrorsCopy.privacyPolicy = false
        }
        setPrivacyPolicy(value)
        setFormError(formErrorsCopy)
    }

    const _updatePassword = (value: string) => {
        setPassword(value)

        let formErrorsCopy = formErrors

        if ( value.length < 8 ) {
            formErrorsCopy.password = true
            showPasswordErrorLabel(true)
        } else {
            formErrorsCopy.password = false
            showPasswordErrorLabel(false)
        }
       
        //validate the re password too if re password is not empty
        if ( rePassword !== "" ) {
            if ( value !== password ) {
                formErrorsCopy.rePassword = true
                showRePasswordErrorLabel(true)
            } else {
                formErrorsCopy.rePassword = false
                showRePasswordErrorLabel(false)
            }
        }
        setFormError(formErrorsCopy)

    }

    const _updateRePassword = (value: string) => {
        setRePassword(value)

        let formErrorsCopy = formErrors
        //validate only if password field is not empty
        //else hide the re-password label by default
        if ( password != "" ) {
            
            if ( value !== password ) {
                formErrorsCopy.rePassword = true
                showRePasswordErrorLabel(true)
            } else {
                formErrorsCopy.rePassword = false
                showRePasswordErrorLabel(false)
            }
        }

        setFormError(formErrorsCopy)
    
    }

    const _closeModal = () => {
        showErrorModal(false)
    }

    const _toggleRePasswordEye = () => {
        //toggle eye close || open
        setRePasswordEye(!isRePasswordEyeClosed)
    }

    //update width and height if layout dimension changes
    const _onLayout = () => {
        const { width: dimensionWidth, height: dimensionHeight } = Dimensions.get('window')
        if (width !== dimensionWidth || height !== dimensionHeight ) {
          setWidth(dimensionWidth)
          setHeight(dimensionHeight)
        }
    }

    return (
        <KeyboardAvoidingView
            onLayout={_onLayout}
            behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
            style={[styles.container,{ width, height}]}>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <View style={{flex: 1, flexDirection: 'column', width: '100%', paddingTop: 80}}>
                    {
                        !loading ? (
                            <>
                            <View style={{width: '100%', flexDirection: 'row', marginBottom: 49 }}>
                                <Text style={styles.mainTitleLabel}>
                                    {'Sign up to'}
                                </Text>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={[styles.mainTitleLabel, styles.mainTitleSecondLabel]}>
                                        {'cooky'}
                                    </Text>
                                    <View style={{borderWidth: 2, borderColor: StyleConfig.primaryColor, width: '38%', marginTop: -8.2, marginLeft: 5}}></View>
                                </View>
                            </View>
                            <View style={[styles.viewGroup,{ marginBottom: 20}]}>
                                <Text style={[styles.inputLabel,{width: '100%'}]}>{'Name'}</Text>
                                <View style={[styles.textInputWrapper, {width: '100%'}]}>
                                    <TextInput
                                    style={[ styles.textInput ]}
                                    value={name}
                                    onChangeText={_updateName}
                                    underlineColorAndroid='transparent' />
                                </View>
                                {
                                    nameErrorlabel  &&
                                    <View style={{marginTop: 4}}>
                                        <Text style={styles.errorLabel}>{'Name is required.'}</Text>
                                    </View>
                                }
                            </View>
                            <View style={[styles.viewGroup,{ marginBottom: 20}]}>
                                <Text style={[styles.inputLabel,{width: '100%'}]}>{'Email Address'}</Text>
                                <View style={[styles.textInputWrapper, {width: '100%'}]}>
                                    <TextInput
                                    style={[ styles.textInput ]}
                                    value={email}
                                    onChangeText={_updateEmail}
                                    underlineColorAndroid='transparent' />
                                </View>
                                {
                                    emailErrorlabel  &&
                                    <View style={{marginTop: 4}}>
                                        <Text style={styles.errorLabel}>{emailErrorMessage}</Text>
                                    </View>
                                }
                            </View>
                            <View style={[styles.viewGroup, {position: 'relative', marginBottom: 20}]}>
                                <Text style={[styles.inputLabel,{width: '100%'}]}>{'Password'}</Text>
                                <View style={[styles.textInputWrapper, {width: '100%', position: 'relative'}]}>
                                    <TextInput
                                        style={[ styles.textInput ]}
                                        value={password}
                                        onChangeText={_updatePassword}
                                        secureTextEntry={(isPasswordEyeClosed) ? true : false}
                                        underlineColorAndroid='transparent' />

                                    <Pressable onPress={_togglePasswordEye} style={{position: 'absolute', right: 13, zIndex: 100, bottom: 12}}>
                                        <FontAwesomeIcon icon={(isPasswordEyeClosed) ? faEyeSlash : faEye} size={20} color="#757575"/>
                                    </Pressable>
                                </View>
                                {
                                    passwordErrorLabel  &&
                                    <View style={{marginTop: 4}}>
                                        <Text style={styles.errorLabel}>{'Password must contain at least 8 characters'}</Text>
                                    </View>
                                }
                            </View>
                            <View style={[styles.viewGroup, { position: 'relative', marginBottom: 20}]}>
                                <Text style={[styles.inputLabel,{width: '100%'}]}>{'Repeat Password'}</Text>
                                <View style={[styles.textInputWrapper, {width: '100%', position: 'relative'}]}>
                                    <TextInput
                                        style={[ styles.textInput ]}
                                        value={rePassword}
                                        onChangeText={_updateRePassword}
                                        secureTextEntry={(isRePasswordEyeClosed) ? true : false}
                                        underlineColorAndroid='transparent' />

                                    <Pressable onPress={_toggleRePasswordEye} style={{position: 'absolute', right: 13, zIndex: 100, bottom: 12}}>
                                        <FontAwesomeIcon icon={(isRePasswordEyeClosed) ? faEyeSlash : faEye} size={20} color="#757575"/>
                                    </Pressable>
                                </View>
                                {
                                    rePasswordErrorLabel  &&
                                    <View style={{marginTop: 4}}>
                                        <Text style={styles.errorLabel}>{'Password do not match.'}</Text>
                                    </View>
                                }
                            </View>
                            <View style={[styles.viewGroup, styles.checkboxWrapper, { marginBottom: 20}]}>
                                <CheckBox
                                    disabled={false}
                                    value={termsConditions}
                                    tintColors={{
                                        true: StyleConfig.primaryColor,
                                        false: StyleConfig.primaryColor,
                                    }}
                                    onValueChange={_updateTermsConditions}
                                />
                                <Text style={[styles.errorLabel,styles.termsConditionsLabel]}>{'I agree to the Terms and Conditions'}</Text>
                            </View>
                            <View style={[styles.viewGroup, styles.checkboxWrapper, { marginBottom: 20}]}>
                                <CheckBox
                                    disabled={false}
                                    value={privacyPolicy}
                                    tintColors={{
                                        true: StyleConfig.primaryColor,
                                        false: StyleConfig.primaryColor,
                                    }}
                                    onValueChange={_updatePrivacyPolicy}
                                />
                                <Text style={[styles.errorLabel,styles.termsConditionsLabel]}>{'I agree to the Privacy and Policy'}</Text>
                            </View>
                            <View style={[styles.viewGroup, {paddingBottom: 114, marginTop: 20}]}>
                                <TouchableOpacity
                                    onPress={_signUp}
                                    style={{backgroundColor: StyleConfig.primaryColor, paddingTop: 9, paddingBottom: 9, borderRadius: 200}}>
                                    <Text style={{color: 'white', fontFamily: 'Lexend-Regular', width: '100%', textAlign: 'center'}}>{'Sign up'}</Text>
                                </TouchableOpacity>
                                <View style={[styles.viewGroup,{flexDirection: 'row', justifyContent: 'center', marginTop: 20}]}>
                                    <Text style={{fontSize: 12, color: StyleConfig.secondaryColor, marginRight: 4, fontFamily: 'Lexend-Regular', fontWeight: '700'}}>{'Already have an account?'}</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('LoginStack')
                                    }}>
                                        <Text style={{color: StyleConfig.primaryColor, textDecorationLine: 'underline', textDecorationColor: StyleConfig.primaryColor, fontFamily: 'Lexend-Regular', fontSize: 12, fontWeight: '700'}}>{'Log In Instead'}</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                            </>
                        ): (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'Lexend-Regular', width: '100%', color: StyleConfig.secondaryColor, fontSize: 20, textAlign: 'center'}}>
                                    {'Registering...'}
                                </Text>
                            </View>     
                        )
                    }
                    
                    <GenericModal closeText='close' show={errorModal} closeModal={_closeModal} message='An error occured while trying to register the user. Make sure there is no error when submitting the fields.' title='Registration Error'/>
                </View>
                
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen