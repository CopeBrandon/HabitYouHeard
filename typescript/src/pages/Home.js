import React from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Habit from "../components/Habit";
import LinkButton from "../components/LinkButton";
import Taskbar from "../components/Taskbar";
import TestComponent from "../components/TestComponent";

const StyledDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));


export default function Home({ habits, setHabits, onToggleTheme, user, setUser, darkMode}) {
  const current = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todaysHabits = habits.filter((habit) => habit.selectedDays.includes(days[current.getDay()]));

  return (
    <>
      <TestComponent to="/yourProgress">Bruhhh...</TestComponent>
      <Taskbar
        darkMode={darkMode}
        onToggleTheme={onToggleTheme}
        user={user}
        setUser={setUser}
        setHabits={setHabits}
        contentType="date"
        bubbleLink="/calendar"
        endButtons={[
          {link:"/calendar", content:"Calendar", id:0},
          {link:"/badges", content:"Badges", id:1}
        ]}
      />
      <Grid container sx={{ marginTop:"-70px", marginBottom: "50px" }}>
        <Grid xs={6} display="flex" justifyContent="center">
          <LinkButton to="habitsPage" sx={{ width: 155, height: 45 }}>
            Manage Habits
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
