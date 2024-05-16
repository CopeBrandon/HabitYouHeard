import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBack, Add } from "@mui/icons-material";
import { TextField, Typography, Box, Checkbox, Fab, FormControl, InputLabel, ListItemText, MenuItem, 
  OutlinedInput, Select, Stack} from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import EditHabit from "../components/EditHabit";


const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// const ITEM_HEIGHT = 54; // Deprecated due to removal of maxHeight of menuprops.
// const ITEM_PADDING_TOP = 8; // ditto. These are kept for record keeping as feature develops.
// const MENU_ITEMS = 7 
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

export default function HabitsPage({ habits, setHabits, user }) {
  const [daysOfTheWeek, setDaysOfTheWeek] = useState([]);

  const [createHabit, setCreateHabit] = useState({
    name: "",
    selectedDays: "",
    description: "",
  });

  const handleStopHabit = (habitId) => {
    fetch(`http://localhost:8080/api/habit/${habitId}/stop`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => res.text())
      .then(() => {
        const newHabitArray = habits.filter((habit) => habit.id !== habitId);
        setHabits([...newHabitArray].sort((a, b) => a.id - b.id));
      });
  };

  const handleCreateHabitFetch = () => {
    fetch("http://localhost:8080/api/habit/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify(createHabit),
    })
      .then((res) => res.json())
      .then((data) => {
        setHabits([...habits, data].sort((a, b) => a.id - b.id));
      });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDaysOfTheWeek(typeof value === "string" ? value.split(",") : value);
    setCreateHabit({
      ...createHabit,
      selectedDays: value,
    });
  };

  const handleClearOnSubmit = (event) => {
    event.preventDefault();

    setCreateHabit({
      name: "",
      description: "",
    });

    setDaysOfTheWeek([]);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          width: 130,
          height: 130,
          borderEndEndRadius: 130,
          position: "relative",
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
      </Box>

      <Grid container position="relative">
        <Grid xs={12} display="flex" justifyContent="center">
          <Box
            sx={{
              backgroundColor: "primary.main",
              width: 400,
              height: 100,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 50,
                color: "#fafafa",
              }}
            >
              Daily Habits
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2} marginTop="20px" disableEqualOverflow="true"> */}
      <Grid container justifyContent="center" margin="0px" marginTop="16px"
        rowSpacing={4}
        columnSpacing={8}
      >
        {habits.map((habit) => (
          <Grid key={habit.id} xs={10} md={6} lg={3.5} display="flex" justifyContent="center">
            <EditHabit
              user={user}
              habits={habits}
              setHabits={setHabits}
              habit={habit}
              buttonHandler={handleStopHabit}
            ></EditHabit>
          </Grid>
        ))}
      </Grid>

      <form onSubmit={handleClearOnSubmit}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            top: 20,
          }}
          direction="row"
        >
          <TextField
            sx={{ m: 1, width: 200, marginBottom: "25px" }}
            id="outlined-basic"
            label="Enter new habit name"
            variant="outlined"
            value={createHabit.name}
            onChange={(e) => {
              setCreateHabit({
                ...createHabit,
                name: e.target.value,
              });
            }}
          />

          <TextField
            sx={{ m: 1, width: 250, marginBottom: "25px" }}
            id="outlined-multiline-flexible"
            label="Enter habit description"
            multiline
            maxRows={4}
            value={createHabit.description}
            onChange={(e) => {
              setCreateHabit({
                ...createHabit,
                description: e.target.value,
              });
            }}
          />

          <FormControl sx={{ m: 1, width: 150, marginBottom: "25px" }}>
            <InputLabel id="multiple-checkbox-label">Day(s)</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={daysOfTheWeek}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  <Checkbox checked={daysOfTheWeek.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Fab type="submit" color="primary" onClick={handleCreateHabitFetch}>
            <Add/>
          </Fab>
        </Stack>
      </form>
    </>
  );
}
