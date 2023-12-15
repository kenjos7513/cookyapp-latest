import StyleConfig from "@/config/StyleConfig";
import { StyleSheet } from 'react-native' 

const styles = StyleSheet.create({
    modalWrapper: {
        justifyContent: 'center',
        padding: 20,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalContainer: {
        backgroundColor: StyleConfig.whiteColor,
        borderRadius: 4,
        paddingBottom: 15,
        shadowColor: StyleConfig.mainShadowColor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        textAlign: 'left',
        color: StyleConfig.primaryColor,
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 24,
        fontFamily: 'PaytoneOne-Regular',
        fontWeight: '400'
    },
    modalContent: {
        flexDirection: 'column',
        paddingLeft: 22,
        paddingRight: 15
    },
    modalButtonWrapper: {
        alignItems: 'center',
        marginTop: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25
    },
    modalButton: {
        backgroundColor: StyleConfig.primaryColor,
        borderRadius: 4,
        padding: 15,
        width: '100%'
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 13,
        height: 15
    }
})

export default styles