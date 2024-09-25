import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import LinkButton from "./LinkButton";
import { Grid, AppBar, Paper , Button } from "@mui/material";
import ThemeToggle from "../components/ThemeToggle";

const StyledDiv = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
}));

export default function Taskbar({darkMode, onToggleTheme, user, setUser, setHabits, contentType, endButtons}){
    const navigate = useNavigate();
    const locationPath = useLocation().pathname;
    const handleSignout = () => {
        setUser({token: ""});
        setHabits([])
    }
    let bubbleContent, bubbleLink;
    if(contentType ==="date"){
        bubbleLink = locationPath === "/calendar" ? "/" : "calendar"; 
        const date = new Date();
        bubbleContent = () => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    } else if(contentType === "points"){
        bubbleLink="/";
        bubbleContent = () => {return (<><u>Points</u><br/>{user.points}</>)}
    }
    const componentElevation = () => !darkMode ? 5 : 0;

    return (
    <AppBar sx={{marginBottom: "80px"}} position="static" elevation={0}>
        <Grid container>
            <Grid item xs={4} sx={{
                height:70,
            }}  display="flex"
            >
                {locationPath === "/" ?
                    <Typography
                        variant="h4"
                        noWrap
                        sx={{ marginLeft: "14px", flexGrow: 1, alignSelf: "center"}}
                    >
                        Hello, {user.username}
                    </Typography>
                    :
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: "secondary.dark",
                            display: "flex",
                            width: 130,
                            height: 130,
                            borderEndEndRadius: 130,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link to={"/"} textDecoration="none">
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
            <Grid item xs={4}>
                <Link to={bubbleLink} textDecoration="none">
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
            <Grid item xs={4} display="flex" justifyContent="flex-end" alignItems="center">
                <Stack direction="row" spacing={2} justifyContent="flex-end" marginRight="16px">
                    <ThemeToggle darkMode={darkMode} onToggleTheme={onToggleTheme} />
                    {endButtons ? endButtons.map((button) => (
                        <LinkButton to={button.link} key={button.id}>{button.content} </LinkButton>
                    )) : ""}
                    <LinkButton to="/auth/signin" onClick={handleSignout}>Logout</LinkButton>
                </Stack>
            </Grid>
        </Grid>
    </AppBar>);
}