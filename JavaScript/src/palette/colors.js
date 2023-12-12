const colors = {
    blues: {
        main: '#4175cf',
        light: '#4b95f1',
        dark: '#33469c'
    },
    purples: {
        main: '#9c27b0',
        light: "#af52bf",
        dark: "#6d1b7b"
    },
    greys: {
        main: "#34373d",
        light: "#52555c",
        dark: "#14171d"
    }
}

export const lightTheme = {
    primary:colors.blues, 
    secondary: colors.purples, 
    overlay: colors.blues.dark
};
export const darkTheme = {
    primary: colors.purples, 
    secondary: colors.blues,
    overlay: colors.purples.main,
    background: {
        default: colors.greys.dark,
        paper: colors.greys.main
    }
};