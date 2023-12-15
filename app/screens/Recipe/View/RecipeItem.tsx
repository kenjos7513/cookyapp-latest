import StyleConfig from "@/config/StyleConfig"
import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Dimensions, SafeAreaView, ScrollView, Text, View, Image, Pressable } from "react-native"




import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircle, faEye, faEyeSlash, faPenClip, faPencil, faPencilAlt, faPencilRuler, faStopwatch, faTrash, faUtensilSpoon, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from "react-native-gesture-handler"
import RenderHtml from 'react-native-render-html'
import { useAppSelector } from "@/hooks/defaultHooks"
import { selectCurrentToken, selectCurrentUser } from "@/slices/authSlice"
import DeleteModal from "@/components/Modals/DeleteModal/DeleteModal"
import recipeServices from "@/services/recipe/recipe.services"
import GenericModal from "@/components/Modals/GenericModal/GenericModal"


function RecipeItem({ navigation}: any): React.JSX.Element {


    const currentUser = useAppSelector(selectCurrentUser)
    const currentToken = useAppSelector(selectCurrentToken)

    const route = useRoute()
    const {
        params
    }: any = route


    //set default width and height based on device's dimension
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    

    const [confirmDeleteModal, showConfirmDeleteModal ] = useState<boolean>(false)
    const [successDeleteModal, showSuccessDeleteModal ] = useState<boolean>(false)




    //update width and height if layout dimension changes
    const _onLayout = () => {
        const { width: dimensionWidth, height: dimensionHeight } = Dimensions.get('window')
        if (width !== dimensionWidth || height !== dimensionHeight ) {
          setWidth(dimensionWidth)
          setHeight(dimensionHeight)
        }
    }
    

    //load only once to fill up width and height
    useEffect(() => {
        setWidth(Dimensions.get('window').width)
        setHeight(Dimensions.get('window').height)
    },[])


    const _deleteRecipe = () => {
        showConfirmDeleteModal(true)
    }

    const _closeDeleteModalWithYes = () => {
        showConfirmDeleteModal(false)
        let userId = currentUser == null ? 0 : currentUser.id

        recipeServices.deleteRecipe(userId,currentToken,params.id).then(() => {
            showSuccessDeleteModal(true)
        }).catch(e => {

        })
    }
    const _closeDeleteModal =() => {
        showConfirmDeleteModal(false)
    }

    const _closeSuccessModal =() => {
        showSuccessDeleteModal(false)
        navigation.navigate('DashboardStack')
    }

    return (
    <SafeAreaView onLayout={_onLayout} style={{flexDirection: 'column', backgroundColor: StyleConfig.whiteColor, height, width}}>
        <ScrollView style={{width: '100%'}}>

            { /* recipe cover photo*/ }
            <View style={{width: '100%', position: 'relative', height: 250, flexDirection: 'column'}}>
                <Image resizeMode="cover" source={{uri: params.image_path }} style={{width: '100%', height: 250, position: 'absolute', zIndex: 1, top: 0}} />

                { /* top group */}
                <View
                    style={{zIndex: 10, flexDirection: 'row', paddingLeft: 17, paddingTop: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{flexDirection: 'row'}}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size={20} color={StyleConfig.whiteColor}/>
                        <Text style={{color: StyleConfig.whiteColor, marginLeft: 5, fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '600', fontStyle: 'normal'}}>Back to feed</Text>
                    </TouchableOpacity>
                    {
                        (currentUser?.id == params.user.id || currentUser?.role_id == 1) &&
                        <View style={{flexDirection: 'row', paddingRight: 17}}>
                            <Pressable
                                onPress={() => {
                                    console.log('params', params)
                                    navigation.navigate('RecipeItemEditStack', params)
                                }}
                                
                                style={{borderRadius: 100, borderWidth: 2, borderColor: StyleConfig.whiteColor, width: 38, height: 38, justifyContent: 'center', alignItems: 'center', marginRight: 12}}>
                                { /*<CustomIcon name="pencil" width={16} height={16} /> */}
                                <FontAwesomeIcon icon={faPencil} size={20} color={StyleConfig.whiteColor}/>
                            </Pressable>

                            <Pressable
                                onPress={_deleteRecipe}

                                style={{borderRadius: 100, borderWidth: 2, borderColor: StyleConfig.orangeColor, width: 38, height: 38, justifyContent: 'center', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faTrash} size={20} color={StyleConfig.orangeColor}/>
                            </Pressable>
                        </View>    
                    }
                    
                </View>
                <View style={{flexDirection: 'column', zIndex: 10, paddingLeft: 17, position: 'absolute', bottom: 19}}>
                    <Text style={{fontFamily: 'PaytoneOne-Regular', fontSize: 24, fontStyle: 'normal', fontWeight: '400', color: StyleConfig.whiteColor}}>{params.name}</Text>
                    <Text style={{fontFamily: 'PaytoneOne-Regular', fontSize: 12, fontStyle: 'normal', fontWeight: '400', color: StyleConfig.whiteColor}}>{`by ${params.user.name}`}</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesomeIcon icon={faUtensils} size={20} color={StyleConfig.secondaryFirstColor}/>
                            <Text style={{color: StyleConfig.secondaryFirstColor, fontFamily: 'Lexend-Regular', fontSize: 12, fontWeight: '400', marginLeft: 8}}>{`${params.number_of_servings} Servings`}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 30, alignItems: 'center'}}>
                            <FontAwesomeIcon icon={faStopwatch} size={20} color={StyleConfig.secondaryFirstColor}/>
                            <Text style={{color: StyleConfig.secondaryFirstColor, fontFamily: 'Lexend-Regular', fontSize: 12, fontWeight: '400', marginLeft: 8}}>{params.preparation_time}</Text>
                        </View>
                        
                    </View>
                </View>
            </View>

            { /* main content */ }
            <View style={{flexDirection: 'column', paddingLeft: 17, paddingRight: 17}}>
                
                    <Text style={{fontFamily: 'PaytoneOne-Regular', color: StyleConfig.primaryColor, fontSize: 20, fontWeight: '400', marginTop: 33}}>{'Ingredients'}</Text>

                    <RenderHtml
                        contentWidth={width}
                        tagsStyles={{
                            body: {
                                color: StyleConfig.secondaryColor,
                                fontFamily: 'Lexend-Regular',
                                fontSize: 16,
                                fontWeight: '400'
                            }
                        }}
                        source={{
                            html: params.ingredients
                        }}
                    />

                    <Text style={{fontFamily: 'PaytoneOne-Regular', color: StyleConfig.primaryColor, fontSize: 20, fontWeight: '400', marginTop: 40, marginBottom: 20}}>{'Procedure'}</Text>
                
                    <RenderHtml
                        contentWidth={width}
                        tagsStyles={{
                            body: {
                                color: StyleConfig.secondaryColor,
                                fontFamily: 'Lexend-Regular',
                                fontSize: 16,
                                fontWeight: '400'
                            }
                        }}
                        source={{
                            html: params.procedure
                        }}
                    />

                    <DeleteModal closeModal={_closeDeleteModal} show={confirmDeleteModal} name={params.name} closeModalWithYes={_closeDeleteModalWithYes} />

                    <GenericModal closeText='close' show={successDeleteModal} closeModal={_closeSuccessModal} message='The recipe for Steamed Salmon has been deleted.' title='Deleted'/>
                
            </View>
        </ScrollView>
    </SafeAreaView>
    
    )
}

export default RecipeItem
