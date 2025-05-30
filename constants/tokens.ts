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
        base: '#3D2C25'
    },
    background: {
        dark: '#753E05',
        base: '#FFEEDF',
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
    '2xl': 24,
    xl: 20,
    m: 14,
    s: 12
}

export const Spacing = {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    '2xl': 24,
}