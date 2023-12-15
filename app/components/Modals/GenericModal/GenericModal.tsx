import StyleConfig from "@/config/StyleConfig"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import styles from "./stylesheets/GenericModalStyleSheet"
import GenericModalInterface from "./interfaces/GenericModalInterface"


function GenericModal({
    closeModal,
    message,
    show,
    title,
    closeText
}: GenericModalInterface): React.JSX.Element {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={{paddingLeft: 22}}>
                <Text style={styles.modalTitle}>{title}</Text>
            </View>
            <View style={styles.modalContent}>
                <Text style={{fontFamily: 'Lexend-Regular', fontSize: 14, fontWeight: '400', color: StyleConfig.secondaryColor}}>{message}</Text>
            </View>
            <View style={styles.modalButtonWrapper}>
          
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    closeModal()
                  }}
                >
                    <Text style={styles.modalButtonText}>{closeText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
}

export default GenericModal