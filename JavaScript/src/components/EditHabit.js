import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Typography } from "@mui/material";

import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  height: 100,
});

export default function EditHabit({ habit, buttonHandler }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStopHabit = () => {
    buttonHandler(habit.id);
  }

  const open = Boolean(anchorEl);
  
  const removeButtonStr = "removeButton"+habit.id;
  const descButtonStr = "descButton"+habit.id;

  const removeOpen = (anchorEl === document.getElementById(removeButtonStr)) && Boolean(anchorEl);
  const descOpen = (anchorEl === document.getElementById(descButtonStr)) && Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
    
  return (
    <ButtonGroup variant="contained" >
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
        anchorEl={anchorEl}
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
        <Typography 
          sx={{p:2, width:250, wordWrap:"break-word", textAlign:"center"}}
        >
          {habit.description}
        </Typography>
      </Popover>
    </ButtonGroup>
  );
}
