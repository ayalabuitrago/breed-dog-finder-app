import { Colors, Spacing } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const historyScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Spacing["2xl"]
    },
    labelContainer: {
        backgroundColor: Colors.background.base,
        padding: Spacing.m
    }
})