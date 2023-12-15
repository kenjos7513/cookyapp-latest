import StyleConfig from "@/config/StyleConfig";
import { StyleSheet } from 'react-native' 

const styles = StyleSheet.create( {

    tabButton: {
        fontFamily: 'Lexend-Regular',
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal'
    },
    recipeItemWrapper: {
        borderLeftWidth: 4,
        borderColor: StyleConfig.secondaryFirstColor,
        paddingLeft: 8,
        marginBottom: 20
    },
    recipeItem: {
        fontFamily: 'Lexend-Regular',
        color: StyleConfig.secondaryColor,
        fontSize: 14,
        fontWeight: '700',
        fontStyle: 'normal'
    }
})

export default styles