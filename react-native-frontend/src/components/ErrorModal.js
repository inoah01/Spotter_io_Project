import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    SafeAreaView,
} from "react-native";

const ErrorModal = ({visible, message, onHide}) => {
    const [animation] = useState(new Animated.Value(-200));
    const screenHeight = Dimensions.get("window").height;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            if (gestureState.dy > 0) {
                animation.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy < -50) {
                Animated.timing(animation, {
                    toValue: -200,
                    duration: 300,
                    useNativeDriver: true
                }).start(handleCloseModal);
            } else {
                Animated.spring(animation, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    useEffect(() => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: -200,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [visible]);

    const handleCloseModal = () => {
        if (onHide) {
            onHide();
        }
    };

    return (
        <Modal
            animationType="none"
            transparent
            visible={visible}
            onRequestClose={handleCloseModal}
        >
            <SafeAreaView>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{translateY: animation}],
                        },
                    ]}
                    {...panResponder.panHandlers}
                >
                <View style={styles.messageContainer}>
                    <View style={styles.errorIconContainer}>
                        {/* Custom error icon will go here */}
                        <Text style={styles.errorIcon}>{"\u00D7"}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.errorMessage}>{message}</Text>
                </View>
                <View
                    style={styles.closeButton}
                >
                    <Text style={styles.closeButtonText}>Swipe up to close</Text>
                </View>
                </Animated.View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "red",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    errorIconContainer: {
        marginRight: 10,
    },
    errorIcon: {
        fontSize: 24,
        color: "white",
    },
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    errorMessage: {
        fontSize: 16,
        color: "white",
    },
    closeButton: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    closeButtonText: {
        fontSize: 14,
        color: "white"
    },
});

export default ErrorModal;
