import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Habit from "../components/Habit";
import LinkButton from "../components/LinkButton";


const HabitMemo = React.memo(Habit);

export default function Home({ habits, setHabits, user, children}) {
  const current = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todaysHabits = habits.filter((habit) => habit.selectedDays.includes(days[current.getDay()]));
  return (
    <>
      {children}{/*Taskbar*/}
      <Grid container sx={{ marginTop:"0px", marginBottom: "16px" }}>
        <Grid xs={6} display="flex" justifyContent="center">
          <LinkButton to="habitsPage" sx={{ width: 155, height: 45 }}>
            Manage Habits
          </LinkButton>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" margin="0px" textAlign="center"
        rowSpacing={4}
        columnSpacing={8}
      >
        {todaysHabits.map((habit) => (
          <Grid key={habit.id} lg={3.5} >
            <HabitMemo
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
