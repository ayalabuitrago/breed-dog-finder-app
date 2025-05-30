import { Colors, Spacing } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const homeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    footer: {
        paddingBottom: Spacing["3xl"],
        paddingTop: Spacing["2xl"],
        backgroundColor: Colors.background.darkest,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
})