import React, { forwardRef, useImperativeHandle } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

let animatedValue = new Animated.Value(70)

const Toast = forwardRef(({text}, ref) => {
    useImperativeHandle(ref, () => ({
       openToast() {
            Animated.timing(
                animatedValue,
                {
                    toValue: 0,
                    duration: 50
                }
            ).start(closeToast())
       }
    }));

    const closeToast = () => {
        setTimeout(() => {
            Animated.timing(
                animatedValue,
                {
                    toValue: 70,
                    duration: 1000
                }
            ).start()
        }, 2000)
    }

    if (text) {
        return (
            <Animated.View style={styles.toastContainer}>   
                <Text style={styles.toastContent}>
                   {text}
                </Text>
            </Animated.View>
        )
    } else {
        return null;
    }
});

const styles = StyleSheet.create({
    toastContainer: {
        transform: [{translateY: animatedValue}],
        height: 70,
        backgroundColor: '#ff0000',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    toastContent: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
    }
})
export default Toast;