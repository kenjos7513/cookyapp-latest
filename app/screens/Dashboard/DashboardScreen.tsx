import StyleConfig from "@/config/StyleConfig";
import { ThemeClass, ThemeFactory } from "@/factories/ThemeFactory";
import { useAppSelector } from "@/hooks/defaultHooks";
import { ThemeFactoryInteface } from "@/interfaces/ThemeFactoryInterface";
import { selectCurrentTheme } from "@/slices/themeSlice";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView, Text, View, Image, RefreshControl } from "react-native";
import styles from "./stylesheets/DashboardStyleSheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import ItemType from "@/types/ItemType";
import { selectCurrentToken, selectCurrentUser } from "@/slices/authSlice";
import recipeServices from "@/services/recipe/recipe.services";
import apiConfig from "@/config/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown, faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";


function DashboardScreen({ navigation }: any): React.JSX.Element {
    
    //set default width and height based on device's dimension
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)


    //flatlist reference
    let flatListRef = useRef<FlatList>(null)

    const [componentLoading, setComponentLoading] = useState<boolean>(false)

    const [activeTab, setActiveTab] = useState<string>('own')

    //get current set theme
    const currentTheme = useAppSelector(selectCurrentTheme)

    //get current user
    const currentUser = useAppSelector(selectCurrentUser)

    //get current user token
    const currentToken = useAppSelector(selectCurrentToken)
    
    const [themeObject, setThemeObject ] =useState<ThemeFactoryInteface>(ThemeFactory(currentTheme))

    //update width and height if layout dimension changes
    const _onLayout = () => {
        const { width: dimensionWidth, height: dimensionHeight } = Dimensions.get('window')
        if (width !== dimensionWidth || height !== dimensionHeight ) {
          setWidth(dimensionWidth)
          setHeight(dimensionHeight)
        }
    }


    //recipe items
    const [items, setItems] = useState([])



    const _onRefresh = () =>{
        _fetchItems()
    }

    const _fetchItems = () => {
        //fetch recipes
        let userId = currentUser == null ? 0 : currentUser.id

        if ( activeTab == 'own' ) {
            recipeServices.getAllRecipesByUserId(userId, currentToken).then(res => {
                setComponentLoading(false)
                setItems(res)
            }).catch(e => {
                console.log('error occured fetching recipe')
            })
        } else {
            recipeServices.getAllRecipesByOtherUser(userId, currentToken).then(res => {
                setComponentLoading(false)
                setItems(res)
            }).catch(e => {
                console.log('error occured fetching recipe')
            })
        }
    }

    //load only once to fill up width and height
    useEffect(() => {
        setWidth(Dimensions.get('window').width)
        setHeight(Dimensions.get('window').height)

        
        setComponentLoading(true)
        
        //fetch recipe items
        _fetchItems()

        


    },[activeTab])

    const _filterContent = (currentTab: string) => {

        setItems([])
        setActiveTab(currentTab)
        console.log('fetch items')
        //_fetchItems()
    }


    const _scrollTop = () => {

        if(flatListRef.current){
            flatListRef.current.scrollToIndex({ animated: true, index: 0 })
        }
    }

    const _renderItem = ({ item }: {item: ItemType} ) => {
        return (
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('RecipeViewItemStack', item)
                }} 
                style={{width: '100%', flexDirection: 'column'}}
            >
                <Image resizeMode="cover" source={{uri: item.image_path }} style={{height: 150,width, borderRadius: 12, marginBottom: 8}} />
                <View style={[styles.recipeItemWrapper]}>
                    <Text style={[styles.recipeItem]}>
                        {
                            item.name
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const _keyExtract = (item: any, index: number) => {
        return `recipe-item-${item.id}`
    }
    return (
        <SafeAreaView onLayout={_onLayout} style={{flexDirection: 'column', paddingLeft: 16, paddingRight: 16, paddingTop: 32, backgroundColor: StyleConfig.whiteColor, height}}>
            {
                themeObject != null &&
                <>
                    <View style={{flexDirection: 'column', width: '100%', marginBottom: 27}}>
                        <Text style={{fontFamily: 'PaytoneOne-Regular',fontSize: 20, color: themeObject.welcomeColor()}}>
                        {`Hi, ${currentUser?.name}!` }
                        </Text>
                        <Text style={{fontFamily: 'PaytoneOne-Regular',fontSize: 14, color: themeObject.primaryColor()}}>
                        {'This is your recipe collection ' }
                        </Text>
                    </View>

                    { /* tab group*/ }
                    <View style={{flexDirection: 'row', width: '100%', marginBottom: 39}}>
                        <Pressable onPress={() => { _filterContent('own')}} style={{flex: 0.5, backgroundColor: activeTab == 'own' ? themeObject.primaryColor() : StyleConfig.whiteColor, paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10}}>
                            <Text style={[styles.tabButton,{color: activeTab == 'own' ? themeObject.activeTabTextColor() : themeObject.inactiveTabTextColor()}]} >
                                { 'Own Recipes'}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => { _filterContent('others')}} style={{flex: 0.5,backgroundColor: activeTab == 'others' ? themeObject.primaryColor() : StyleConfig.whiteColor,paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10}}>
                            <Text style={[styles.tabButton,{color: activeTab == 'others' ? themeObject.activeTabTextColor() : themeObject.inactiveTabTextColor()}]} >
                                { 'Others’ Recipes'}
                            </Text>
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%', flex: 1}}>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 100 }}
                            data={items}
                            ref={flatListRef}
                            onEndReachedThreshold={1.5}
                            refreshControl={
                                <RefreshControl
                                  refreshing={componentLoading}
                                  onRefresh={_onRefresh}
                                />
                            }
                            ListFooterComponent={(props) => {
                                return (
                                    <>
                                    {
                                        !componentLoading &&
                                        <View style={{flex: 1, width: '100%'}}>
                                            <Text style={{color: StyleConfig.primaryColor, fontFamily: 'Lexend-Regular', fontSize: 12, fontWeight: '400', width: '100%', textAlign: 'center'}}>{'That’s all we have for now'}</Text>
                                        </View>
                                    }
                                    
                                    </>
                                    
                                )
                            }}
                            renderItem={_renderItem }
                            keyExtractor={_keyExtract}
                        />
                        <View style={{position: 'absolute', right: 0, zIndex:200, flexDirection: 'column', top: '10%'}}>
                            <Pressable
                                onPress={_scrollTop}
                                style={{borderRadius: 100, backgroundColor: StyleConfig.primaryColor, width: 45, height: 45, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <FontAwesomeIcon icon={faArrowUp} size={20} color={StyleConfig.whiteColor} />
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    navigation.navigate('RecipeItemCreateStack')
                                }}
                                style={{borderRadius: 100, backgroundColor: StyleConfig.primaryColor, width: 45, height: 45, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                                <FontAwesomeIcon icon={faPlus} size={20} color={StyleConfig.whiteColor} />
                            </Pressable>
                            
                        </View>
                    </View>
                    
                    
                </>
                
                
            }
        </SafeAreaView>
    )
}
export default DashboardScreen