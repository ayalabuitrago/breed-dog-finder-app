import { Colors, Radius, Spacing } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const homeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        paddingBottom: Spacing["3xl"],
        paddingTop: Spacing["2xl"],
        backgroundColor: Colors.background.darkest,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.l,
        paddingHorizontal: Spacing["2xl"],
        marginTop: Spacing["5xl"],
        paddingBottom: Spacing["5xl"],
        position: 'relative',
    },
    cameraContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.background.base,
        borderRadius: Radius.xl,
        overflow: 'hidden',
        position: 'absolute',
    },
    camera: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    messageContainer: { 
        width: '100%', 
        paddingHorizontal: Spacing["4xl"],
        position: 'absolute',
        bottom: Spacing["2xl"],
    }
})