import StyleConfig from "@/config/StyleConfig"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import styles from "./stylesheets/CancelModalStyleSheet"
import CancelmodalInterface from "./interfaces/CancelModalInterface"


function CancelModal({
    closeModal,
    closeModalWithYes,
    show,
    name,
}: CancelmodalInterface): React.JSX.Element {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={{paddingLeft: 22}}>
                <Text style={styles.modalTitle}>{'Cancel'}</Text>
            </View>
            <View style={[styles.modalContent,{flexDirection: 'row'}]}>
                <Text style={{fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '400', color: StyleConfig.secondaryColor}}>{'Are you sure you want to cancel editing this recipe? Your progress will not be saved.'}</Text>
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

export default CancelModal