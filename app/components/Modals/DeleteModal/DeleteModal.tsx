import StyleConfig from "@/config/StyleConfig"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import styles from "./stylesheets/DeleteModalStyleSheet"
import DeleteModalInterface from "./interfaces/DeleteModalInterface"


function DeleteModal({
    closeModal,
    closeModalWithYes,
    show,
    name,
}: DeleteModalInterface): React.JSX.Element {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={{paddingLeft: 22}}>
                <Text style={styles.modalTitle}>{'Delete Recipe'}</Text>
            </View>
            <View style={[styles.modalContent,{flexDirection: 'row', width: '100%'}]}>
                <Text style={{fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '400', color: StyleConfig.secondaryColor, flex: 1}}>{'Are you sure you want to '}
                    <Text style={{color: '#F10', fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '400',flex: 1}}>{'DELETE'}</Text>
                    <Text style={{fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '400', color: StyleConfig.secondaryColor,flex: 1}}>{` the recipe for ${name}`}</Text>
                </Text>
               
                
            </View>
            <View style={[styles.modalButtonWrapper,{flexDirection: 'row'}]}>
                <TouchableOpacity
                  style={[styles.modalButton,{ backgroundColor: 'transparent', marginRight: 20, flex: 0.5}]}
                  onPress={() => {
                    closeModal()
                  }}
                >
                    <Text style={[styles.modalButtonText,{color: StyleConfig.neutralDark}]}>{'No'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton,{flex: 0.5}]}
                  onPress={() => {
                    closeModalWithYes()
                  }}
                >
                    <Text style={styles.modalButtonText}>{'Yes'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
}

export default DeleteModal