import React, { useState , useRef} from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Popover from "@mui/material/Popover";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Paper, TextField, Tooltip, Typography } from "@mui/material";

import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  height: 100,
});

export default function EditHabit({ user, habits, setHabits, habit, buttonHandler}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [description, setDescription] = useState(habit.description);
  const anchorRef = useRef(null);
  const [editingDesc, setEditingDesc] = useState(false);
  const [hasErrorDesc, setHasErrorDesc] = useState(false);
  const [descErrorText, setDescErrorText] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDescription(habit.description);
    setEditingDesc(false); setHasErrorDesc(false);
    setAnchorEl(null);
  };

  const handleStopHabit = () => {
    buttonHandler(habit.id);
  }
  const handleDesc = () => {
    setEditingDesc(!editingDesc);
  }
  const handleSubmitDesc = () => {
    if(!description) return setDescription(habit.description);
    return fetch(`http://localhost:8080/api/habit/${habit.id}/description`, {
      method: "PATCH",
      headers: {
        Authorization: user.token,
      },
      body: description
    }).then((res) => res.json())
      .then((data) => {
        if(data.error){
          console.error(data.error); //TODO: create alert for user if input is invalid in some way.
          setHasErrorDesc(true); setDescErrorText(data.error);
          return data.error;
        }
        handleDesc();
        setHasErrorDesc(false); setDescErrorText("");
        const i = habits.indexOf(habit);
        habit.description = description;
        let newHabits = habits.slice(0, i).concat([habit], habits.slice(i+1));
        setHabits(newHabits);
      })
  }

  const open = Boolean(anchorEl);
  
  const removeButtonStr = "removeButton"+habit.id;
  const descButtonStr = "descButton"+habit.id;

  const removeOpen = Boolean(anchorEl) && (anchorEl === document.getElementById(removeButtonStr));
  const descOpen = Boolean(anchorEl) && (anchorEl === document.getElementById(descButtonStr));

  const id = open ? "simple-popover" : undefined;
    
  return (
    <ButtonGroup variant="contained" ref={anchorRef}>
      <StyledButton size="small" onClick={handleClick} id={removeButtonStr}>
        <IconButton component="div" size="large" >
          <DeleteIcon fontSize="large"/>
        </IconButton>
      </StyledButton>
      <Popover
          id={id}
          open={removeOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Alert
            severity="warning"
            action={
              <Button
                size="small"
                onClick={handleStopHabit}
              >
                Stop
              </Button>
            }
          >
            <AlertTitle>Warning</AlertTitle>
            You are about to delete a habit.
          </Alert>
        </Popover>
      <StyledButton sx={{ width: 250 }} onClick={handleClick} id={descButtonStr}>
        {habit.name}
      </StyledButton>
      <Popover
        id={id}
        open={descOpen}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        sx={{alignContent:"center"}}
        transformOrigin={{
          horizontal:'center',
          vertical:"top"
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
      }}>
        <Paper sx={{width:330}}>
            {/* TODO: Make a popper instead of a popover later i think. */}
            <Tooltip title="Click to edit description."  enterDelay={500} followCursor id={'tt2' + habit.id}>
              <Button 
                variant="text" 
                sx={{width:330, textTransform: 'none', display: !editingDesc ? 'block' : 'none'}}
                onClick={handleDesc}> 
                <Typography 
                  sx={{p:2, width:1, wordWrap:"break-word", margin:"auto", color:"text.primary"}}
                >
                  {habit.description}
                </Typography>
              </Button>
            </Tooltip>
            {/* TODO: Clean up this code to not require so much extra. This is ridiculous.  I think I might make the tooltip go away if it's been out for a while.*/}
            <Tooltip title = {hasErrorDesc ? descErrorText : "Press enter to submit."}  enterDelay={500} followCursor id={'tt2' + habit.id}>
              <TextField 
                sx={{display:editingDesc ? 'block' : 'none'}}
                value={description}
                onKeyDown={e=>{
                  if(e.key==="Enter"){
                    e.preventDefault();
                    handleSubmitDesc();
                  }}}
                onInput={ e=>setDescription(e.target.value)}
                color="textFallback"
                variant="filled"
                label= {hasErrorDesc ? descErrorText : "Edit Description | Click Off To Cancel"}
                error={hasErrorDesc}
                fullWidth multiline
                inputProps={{ 
                  style: {padding: 16}, 
                  sx: {textAlign: 'center', margin: "auto", 
                    color: theme => hasErrorDesc ? theme.palette.error.dark : theme.palette.text.primary
                  }}}
              />
            </Tooltip>
          </Paper>
      </Popover>
    </ButtonGroup>
  );
}
