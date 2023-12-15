import StyleConfig from "@/config/StyleConfig";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View, Text, TextInput, Button, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./stylesheets/RecipeItemCreateStyleSheet";

import moment from 'moment'


import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import recipeServices from "@/services/recipe/recipe.services";
import { useAppSelector } from "@/hooks/defaultHooks";
import { selectCurrentToken, selectCurrentUser } from "@/slices/authSlice";
import GenericModal from "@/components/Modals/GenericModal/GenericModal";
function RecipeItemCreate({ navigation }: any): React.JSX.Element {


    const currentUser = useAppSelector(selectCurrentUser)
    const currentToken = useAppSelector(selectCurrentToken)
    //set default width and height based on device's dimension
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [imagePath, setImagePath] = useState<ImagePickerResponse>({})
    const [displayImagePath, setDisplayImagePath] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)
    const [errorModal, showErrorModal] = useState<boolean>(false)

    const [saveModal, showSaveModal] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [preparationTime, setTime] = useState(moment(new Date()).format("YYYY-MM-D-ss"))
    const [numOfServings, setNumOfServings] = useState('')
    const [ingredients, setIngredients] = useState<string>('')
    const [procedure, setProcedure] = useState<string>('')

    //load only once to fill up width and height
    useEffect(() => {
        setWidth(Dimensions.get('window').width)
        setHeight(Dimensions.get('window').height)
        setTime('01:00')
    },[])

    const _handleImage = () => {
        launchImageLibrary({mediaType: 'photo'}, (response) => {
            console.log('imagge response', response)
            setImagePath(response)
            if ( typeof response.assets !='undefined' ) {
                if ( response.assets.length > 0 ) {
                    setDisplayImagePath(typeof response.assets[0].fileName == 'undefined' ? '' : response.assets[0].fileName)
                }
            }
            
        })
    }
    const _cancelEdit = () => {
        setName('')
        setTime('01:00')
        setNumOfServings('')
        setIngredients('')
        setProcedure('')
        setImagePath({})
        setDisplayImagePath('')
    }


    const _closeModal = () => {
        showSaveModal(false)
    }

    const _closeErrorModal = () => {
        showErrorModal(false)
    }

    const _createRecipe = () => {
        let userId = currentUser == null ? 0 : currentUser.id
        setLoading(true)
        showErrorModal(false)
        let buildPhoto: any = {
            name: '',
            type: '',
            uri: ''
        }
        
        if ( typeof imagePath.assets !='undefined' ) {
            if ( imagePath.assets.length > 0 ) {
                if ( typeof imagePath.assets[0].fileName != 'undefined' ) {
                    buildPhoto.name = imagePath.assets[0].fileName
                    buildPhoto.type = imagePath.assets[0].type
                    if ( typeof imagePath.assets[0].uri != 'undefined' ) {
                        buildPhoto.uri = Platform.OS === 'ios' ? imagePath.assets[0].uri.replace('file://', '') : imagePath.assets[0].uri
                    }           
                }
            }
        }


        recipeServices.createRecipe(currentToken, {
            name,
            preparation_time: preparationTime,
            number_of_servings: numOfServings,
            ingredients,
            procedure,
            user_id: userId,
            image_path: buildPhoto
        }).then(r => {
            setLoading(false)
            showSaveModal(true)
        }).catch(e => {
            setLoading(false)
            showErrorModal(true)
            console.log(e)
        })
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
        <SafeAreaView onLayout={_onLayout} style={{flexDirection: 'column', backgroundColor: StyleConfig.whiteColor, height, width}}>
            <ScrollView style={{width: '100%'}}>
                <View style={{width: '100%', position: 'relative', flexDirection: 'column', marginBottom: 24}}>
                    <View
                        style={{zIndex: 10, flexDirection: 'row', paddingLeft: 17, paddingTop: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}
                            style={{flexDirection: 'row'}}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size={20} color={StyleConfig.secondaryGreyColor}/>
                            <Text style={{color: StyleConfig.secondaryGreyColor, marginLeft: 8, fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '600', fontStyle: 'normal'}}>{'Back to Feed'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.viewGroup,{ paddingBottom: 24, paddingLeft: 17, paddingRight: 17}]}>
                    <Text style={[styles.inputLabel,{width: '100%'}]}>{'Recipe Name'}</Text>
                    <View style={[styles.textInputWrapper, {width: '100%'}]}>
                        <TextInput
                            style={[ styles.textInput ]}
                            value={name}
                            onChangeText={setName}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>
                <View style={[styles.viewGroup,{ paddingBottom: 24, paddingLeft: 17, paddingRight: 17, flexDirection: 'row'}]}>
                    <View style={{flex: 0.5, marginRight: 12}}>
                        <Text style={[styles.inputLabel,{width: '100%'}]}>{'Number of Servings'}</Text>
                        <View style={[styles.textInputWrapper, {width: '100%'}]}>
                            <TextInput
                                style={[ styles.textInput ]}
                                value={numOfServings}
                                onChangeText={setNumOfServings}
                                inputMode='numeric'
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={[styles.inputLabel,{width: '100%'}]}>{'Preparation Time'}</Text>
                        <View style={[styles.textInputWrapper, {width: '100%'}]}>
                            <TextInput
                                style={[ styles.textInput ]}
                                value={preparationTime}
                                onChangeText={setTime}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </View>
                    
                </View>
                <View style={[styles.viewGroup,{ paddingBottom: 24, paddingLeft: 17, paddingRight: 17}]}>
                    <Text style={[styles.inputLabel,{width: '100%'}]}>{'Main Image'}</Text>
                    <View style={[styles.textInputWrapper, {width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 2, paddingBottom: 2, alignItems: 'center'}]}>
                        <Text style={{fontFamily: 'Lexend-Regular', fontSize: 14, color: StyleConfig.neutralDark, fontWeight: '400', fontStyle: 'normal'}}>
                            {displayImagePath}
                        </Text>
                        <TouchableOpacity style={{backgroundColor: StyleConfig.primaryColor, borderRadius: 10, minWidth: 82,paddingTop: 10, paddingBottom: 10}} onPress={() => {
                            _handleImage()
                        }}>
                            <Text style={{fontFamily: 'Lexend-Regular', fontSize: 12, fontWeight: '400', fontStyle: 'normal', color: StyleConfig.whiteColor, width: '100%', textAlign: 'center'}}>{'Browse'}</Text>
                        </TouchableOpacity>
                            
                    </View>
                </View>
                <View style={[styles.viewGroup,{ paddingBottom: 10, paddingLeft: 17, paddingRight: 17, marginBottom: 24}]}>
                    <Text style={[styles.inputLabel,{width: '100%'}]}>{'Ingredients'}</Text>
                    <View style={[styles.textInputWrapper, {width: '100%', padding: 0}]}>
                    <TextInput
                    
                        multiline={true}
                        numberOfLines={10}
                        style={{color: StyleConfig.secondaryColor, fontFamily: 'Lexend-Regular',fontSize: 16, fontWeight: '400', textAlignVertical: 'top' }}
                        onChangeText={setIngredients}
                        value={ingredients}/>
                    </View>
                </View>
                <View style={[styles.viewGroup,{ paddingBottom: 24, paddingLeft: 17, paddingRight: 17}]}>
                    <Text style={[styles.inputLabel,{width: '100%'}]}>{'Procedure'}</Text>
                    <View style={[styles.textInputWrapper, {width: '100%'}]}>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={{color: StyleConfig.secondaryColor, fontFamily: 'Lexend-Regular',fontSize: 16, fontWeight: '400', textAlignVertical: 'top'}}
                        onChangeText={setProcedure}
                        value={procedure}/>
                    </View>
                </View>
                <View style={[styles.viewGroup,{ paddingLeft: 17, paddingRight: 17, paddingBottom: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <TouchableOpacity
                        onPress={() => {
                            _cancelEdit()
                        }}
                        style={{backgroundColor: 'transparent', borderRadius: 200, paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25}}>
                        <Text style={{fontFamily: 'Lexend-Regular', color: StyleConfig.secondaryColor, fontSize: 14, fontWeight: '400', width: '100%', textAlign: 'center'}}>{'Cancel Edit'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={_createRecipe}
                        disabled={loading}
                        style={{backgroundColor: StyleConfig.primaryColor, borderRadius: 200, paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25}}>
                        <Text style={{color: StyleConfig.whiteColor}}>{loading ? 'Saving...' : 'Save Changes'}</Text>
                    </TouchableOpacity>
                </View>
                
                <GenericModal closeText='close' show={errorModal} closeModal={_closeErrorModal} message='An error occured while trying to save recipe.' title='Save Error'/>

                <GenericModal closeText='close' show={saveModal} closeModal={_closeModal} message='The details of Steamed Salmon Recipe has been saved.' title='Save Success'/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeItemCreate