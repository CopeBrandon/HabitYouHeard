import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Habit from "../components/Habit";
import LinkButton from "../components/LinkButton";
import ThemeToggle from "../components/ThemeToggle";
import BackButtonBar from "../components/BackButtonBar";

const StyledDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));


export default function Home({ habits, setHabits, onToggleTheme, user, setUser, darkMode}) {
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const todaysHabits = habits.filter((habit) => habit.selectedDays.includes(days[current.getDay()]));

  function handleSignout(){
    setUser({token: ""})
    onToggleTheme(true);
    setHabits([])
    navigate("/auth/signin")
  }
  const navigate = useNavigate();

  return (
    <>
      <BackButtonBar
        darkMode={darkMode}
        onToggleTheme={onToggleTheme}
        user={user}
        setUser={setUser}
        setHabits={setHabits}
        contentType="date"
        bubbleLink="/calendar"
        endButtons={[
          {link:"/calendar", content:"Calendar", id:0},
          {link:"/yourprogress", content:"Badges", id:1}
        ]}
      />
      <Grid container sx={{ marginBottom: "50px" }}>
        <Grid xs={6} display="flex" justifyContent="center">
          <LinkButton to="habitsPage" sx={{ width: 155, height: 45 }}>
            Daily Habits
          </LinkButton>
        </Grid>
      </Grid>

      <Grid container spacing={2} disableEqualOverflow="true">
        {todaysHabits.map((habit) => (
          <Grid key={habit.id} xs={6} display="flex" justifyContent="center">
            <Habit
              habit={habit}
              setHabits={setHabits}
              habits={habits}
              user={user}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
