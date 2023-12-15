import StyleConfig from "@/config/StyleConfig";
import { StyleSheet } from 'react-native' 
import loginStyle from '@/screens/Login/stylesheets/LoginStyleSheet'

const styles = StyleSheet.create( {
    ...loginStyle,
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 36,
        paddingRight: 36
    },
    mainTitleLabel: {
        fontFamily: 'PaytoneOne-Regular',
        color: StyleConfig.primaryColor,
        fontSize: 24,
        fontWeight: '400',
        fontStyle: 'normal'
    },
    mainTitleSecondLabel: {
        textDecorationColor: StyleConfig.secondaryColor,
        marginLeft: 5
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorLabel: {
        fontFamily: 'Lexend-Regular',
        color: StyleConfig.label.errorColor,
        fontSize: 12,
        fontWeight: '400',
    },
    termsConditionsLabel: {
        color: StyleConfig.primaryColor
    }
})

export default styles
