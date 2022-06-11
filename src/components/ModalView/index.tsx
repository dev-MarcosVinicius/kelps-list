import React, { ReactNode } from 'react'
import { 
    View, 
    Modal, 
    ModalProps, 
    TouchableWithoutFeedback, 
    StyleSheet, 
    KeyboardAvoidingView, 
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
}

export default function ModalView({children, closeModal, ...rest}: Props) {
    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            {...rest}
        >
            <KeyboardAvoidingView 
                style={styles.keyboardAvoid}
                behavior={'padding'}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.overlay}>
                        <View style={styles.container}>
                            <LinearGradient
                                style={styles.gradient}
                                colors={['#0583F2', '#0597F2']}
                            >
                                <View style={styles.bar}/>

                                {children}
                            </LinearGradient>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 250
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1
    },
    bar: {
        width: 39,
        height: 2,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 25
    },
    gradient: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1
    }
})