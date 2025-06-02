import { type TextStyle } from "react-native";

export const Colors = {
    primary: {
        dark: '#3D2C25',
        base: '#753E05',
    },
    icon: {
        base: '#723F06',
        light: '#FFEEDF',
    },
    text: {
        light: '#FFEEDF',
        base: '#3D2C25',
    },
    background: {
        light: '#FFEEDF',
        base: '#EFCEAD',
        dark: '#753E05',
        darkest: '#3D2C25',
    }
};

export const FontFamily = {
    outfit: 'Outfit'
}

export const FontWeidth: Record<string, TextStyle['fontWeight']> = {
    'bold': 700,
    'semibold': 600,
    'regular': 400
}

export const FontSize = {
    s: 12,
    m: 14,
    xl: 20,
    '2xl': 24,
}

export const Spacing = {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 36,
    '4xl': 48,
    '5xl': 56,
}

export const Radius = {
    l: 20,
    xl: 24,
    '2xl': 28,
}