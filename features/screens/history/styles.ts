import { Colors, Spacing } from "@/features/constants/tokens";
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
    },
    flatlist: {
        flex: 1,
        width: '100%',
        paddingHorizontal: Spacing["2xl"],
    },
    flatlistContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        gap: Spacing.m,
        paddingBottom: Spacing["2xl"],
    }
})