import StyleConfig from "@/config/StyleConfig";
import { StyleSheet } from 'react-native' 


const styles = StyleSheet.create( {
    viewGroup: {
        flexDirection: 'column',
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 36,
        paddingRight: 36
    },
    textInput: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: 'transparent'
    },
    textInputWrapper: {
        backgroundColor: StyleConfig.input.background.primaryColor,
        borderRadius: 30,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8
    },
    inputLabel: {
        fontFamily: 'Lexend-Regular',
        fontSize: 12,
        fontWeight: '400',
        paddingBottom: 4,
        color: StyleConfig.primaryColor,
        fontStyle: 'normal',
        textAlign: 'left'
    },
    subTitle: {
        fontFamily: 'Lexend-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 10,
        color: '#000'
    }
})

export default styles