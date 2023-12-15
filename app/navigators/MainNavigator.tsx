import HeaderRight from "@/components/Headers/HeaderRight/HeaderRight";
import HeaderTitle from "@/components/Headers/HeaderTitle/HeaderTitle";
import StyleConfig from "@/config/StyleConfig";
import { useAppSelector } from "@/hooks/defaultHooks";
import DashboardScreen from "@/screens/Dashboard/DashboardScreen";
import HomeScreen from "@/screens/Home/HomeScreen";
import LoginScreen from "@/screens/Login/LoginScreen";
import RecipeItemCreate from "@/screens/Recipe/Create/RecipeItemCreate";
import RecipeItemEdit from "@/screens/Recipe/Edit/RecipeItemEdit";
import RecipeItem from "@/screens/Recipe/View/RecipeItem";
import RegisterScreen from "@/screens/Register/RegisterScreen";
import { selectCurrentLoginStatus } from "@/slices/authSlice";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets, createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function MainNavigator(): React.JSX.Element {

    //get current login state
    const isLogin = useAppSelector(selectCurrentLoginStatus)
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    isLogin ? (
                    <>
                    <Stack.Screen
                        name="DashboardStack"
                        options={({route, navigation}) =>({
                            //headerShown: false,
                            headerTitle: (props) => <HeaderTitle {...props} ></HeaderTitle>,
                            headerRight: (props) => <HeaderRight {...props} color={StyleConfig.whiteColor}></HeaderRight>,
                            drawerActiveTintColor: 'white',
                            headerStyle: {
                                backgroundColor: StyleConfig.primaryColor,
                                shadowColor: 'transparent',
                                height: 52

                            },
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                            ...TransitionPresets.DefaultTransition,
                        })}
                        component={DashboardScreen}
                    />
                    <Stack.Screen
                        name="RecipeItemCreateStack"
                        options={({route, navigation}) =>({
                            //headerShown: false,
                            headerLeft: (props) => <></>,
                            headerTitle: (props) => <HeaderTitle {...props} ></HeaderTitle>,
                            headerRight: (props) => <HeaderRight {...props} color={StyleConfig.whiteColor}></HeaderRight>,
                            drawerActiveTintColor: 'white',
                            headerStyle: {
                                backgroundColor: StyleConfig.primaryColor,
                                shadowColor: 'transparent',
                                height: 52
                            },
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                            ...TransitionPresets.DefaultTransition,
                        })}
                        component={RecipeItemCreate}
                    />
                    <Stack.Screen
                        name="RecipeItemEditStack"
                        options={({route, navigation}) =>({
                            //headerShown: false,
                            headerLeft: (props) => <></>,
                            headerTitle: (props) => <HeaderTitle {...props} ></HeaderTitle>,
                            headerRight: (props) => <HeaderRight {...props} color={StyleConfig.whiteColor}></HeaderRight>,
                            drawerActiveTintColor: 'white',
                            headerStyle: {
                                backgroundColor: StyleConfig.primaryColor,
                                shadowColor: 'transparent',
                                height: 52
                            },
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                            ...TransitionPresets.DefaultTransition,
                        })}
                        component={RecipeItemEdit}
                    />
                    <Stack.Screen
                        name="RecipeViewItemStack"
                        options={({route, navigation}) =>({
                            //headerShown: false,
                            headerLeft: (props) => <></>,
                            headerTitle: (props) => <HeaderTitle {...props} ></HeaderTitle>,
                            headerRight: (props) => <HeaderRight {...props} color={StyleConfig.whiteColor}></HeaderRight>,
                            drawerActiveTintColor: 'white',
                            headerStyle: {
                                backgroundColor: StyleConfig.primaryColor,
                                shadowColor: 'transparent',
                                height: 52

                            },
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                            ...TransitionPresets.DefaultTransition,
                        })}
                        component={RecipeItem}
                    />
                    </>
                    ) : 
                    (
                    <>
                    <Stack.Screen
                        name="LoginStack"
                        options={({route, navigation}) =>({
                            headerShown: false,
                            headerMode: 'screen',
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                            ...TransitionPresets.SlideFromRightIOS,
                        })}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="RegisterStack"
                        options={({route, navigation}) =>({
                            headerMode: 'screen',
                            headerShown: false,
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                            ...TransitionPresets.DefaultTransition,
                        })}
                        component={RegisterScreen}
                    />
                    </>
                    )
                }
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator