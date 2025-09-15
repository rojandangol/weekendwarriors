//Cite: GestureResponderEvent: https://reactnative.dev/docs/gesture-responder-system

import { View, Button, StyleSheet, TouchableOpacity, Text, PanResponderGestureState, GestureResponderEvent } from "react-native";
import { colors } from "@/constants/colors";

type props = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
}

const WLoginButton = ({ onPress, title }: props) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.container}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        width: 200,
        elevation: 8, //Android
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 10,

        shadowColor: colors.shadow,
        shadowOffset: {
            width: -2,
            height: 4
        },
        shadowOpacity: .75,
        shadowRadius: 5,

    },
    text: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default WLoginButton;
