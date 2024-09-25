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
    },
    lightText: {
        main: "rgba(0,0,0,0.87)",
        offset: "#fff",
    },
    darkText: {
        main: "#fff",
        offset: "rgba(0,0,0,0.87)"
    }
}

export const lightTheme = {
    primary:colors.blues, 
    secondary: colors.purples, 
    overlay: colors.blues.dark,
    textFallback: colors.lightText
};
export const darkTheme = {
    primary: colors.purples, 
    secondary: colors.blues,
    overlay: colors.purples.main,
    textFallback: colors.lightText,
    background: {
        default: colors.greys.dark,
        paper: colors.greys.main
    }
};