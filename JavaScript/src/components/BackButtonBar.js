import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
import { Link, Navigate , useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import LinkButton from "./LinkButton";
import { Grid, AppBar, Paper } from "@mui/material";
import ThemeToggle from "../components/ThemeToggle";

const StyledDiv = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
}));

export default function BackButtonBar({points, darkMode, onToggleTheme, user, setUser, setHabits, contentType, bubbleLink, endButtons}){
    function handleSignout(){
        setUser({token: ""})
        onToggleTheme(true);
        setHabits([])
        Navigate("/auth/signin")
    }
    let bubbleContent;
    if(contentType ==="date"){
        const date = new Date();
        bubbleContent = () => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    } else if(contentType === "points"){
        bubbleContent = () => {return (<><u>Points</u><br/>{points}</>)}
    }
    const componentElevation = () => !darkMode ? 5 : 0;

    return (
    <AppBar sx={{marginBottom: "120px"}} position="static" elevation={0}>
        <Grid container>
            <Grid xs={4} sx={{
                height:70,
            }}  display="flex"
            >
                {useLocation().pathname === "/" ?
                    <Typography
                        variant="h4"
                        noWrap
                        sx={{ flexGrow: 1, alignSelf: "center"}}
                    >
                        Hello, {user.username}
                    </Typography>
                    :
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: "primary.main",
                            display: "flex",
                            width: 130,
                            height: 130,
                            borderEndEndRadius: 130,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/" sx={{ textDecoration: "none" }}>
                        <Box
                            sx={{
                                backgroundColor: "#fafafa",
                                display: "flex",
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ArrowBack />
                        </Box>
                        </Link>
                    </Paper>
                }
            </Grid>
            <Grid xs={4}>
                <Link to={bubbleLink} textDecoration="none"> {/*to={bubbleLink*/}
                    <StyledDiv>
                        <Paper
                        elevation={componentElevation()}
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 100,
                            backgroundColor: "secondary.dark",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: 0
                        }}
                        >
                        <Typography
                            sx={{
                            color: "#fafafa",
                            fontSize: 28,
                            textAlign:"center"
                            }}
                        >
                            {bubbleContent()}
                        </Typography>
                        </Paper>
                    </StyledDiv>
                </Link>
            </Grid>
            <Grid xs={4}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <ThemeToggle darkMode={darkMode} onToggleTheme={onToggleTheme} />
                    {endButtons ? endButtons.map((button) => (
                        <LinkButton to={button.link} key={button.id}>{button.content} </LinkButton>
                    )) : ""}
                    <LinkButton to="/auth/signin" onClick={()=>{handleSignout()}}>Logout</LinkButton>
                </Stack>
            </Grid>
        </Grid>
    </AppBar>);
}