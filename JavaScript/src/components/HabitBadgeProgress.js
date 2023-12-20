import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper, Typography, Popover,} from '@mui/material';
import { Box } from "@mui/system";

const HabitBadgeProgress = ({title, description, badgeMeta, streakLength, darkMode}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const componentElevation = () => !darkMode ? 5 : 2;

    return (
    <Grid xs={10} md={10} lg={3.5}>
        <Paper 
            elevation={componentElevation()} 
            sx={{
                backgroundColor: "primary.main",
                alignItems: "center",
                borderColor:"primary.dark",
        }}>
            <Box sx={{borderBottom: "1px solid", borderColor:"primary.dark"}}>
                <Typography sx={{
                    fontSize: '1.3rem',
                    color: "primary.contrastText", 
                    textAlign: "center",
                    alignItems: "center",
                }}>
                    {title}
                </Typography>
            </Box>
            <Grid sx={{
                height: "100%",
                textAlign: "center",
            }}>
                <Box height="100%" width="100%" component="img" 
                    src={badgeMeta.imgUrl} 
                    onMouseEnter={handlePopoverOpen} 
                    onMouseLeave={handlePopoverClose} 
                    sx={{
                        height: "140px",
                        width: "200px",
                        '&:hover': {
                            backgroundColor: 'overlay',
                            opacity: [0.95],
                        }    
                    }}/>
            </Grid>
        </Paper>
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none'
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            PaperProps={{sx:{
                width: "200px",
                backgroundColor: "primary.main",
                textAlign:"center",
                border:"1px solid",
                borderColor:"primary.dark"
            }}}
        >   
            <Box>
                <Paper elevation={6} sx={{
                    backgroundColor: badgeMeta.color,
                    color: badgeMeta.offColor,
                    width: "95%",
                    height: "95%",
                    margin: "auto",
                    marginTop: "5px",
                    fontSize: "1.2rem"
                }}>{badgeMeta.rank}</Paper>
            </Box> 
            <Box borderBottom="1px solid" borderColor="primary.dark" padding="10px">{description}</Box>
            <Box padding="10px">{streakLength}</Box>
        </Popover>
    </Grid>);
};

export default HabitBadgeProgress;