import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import BackButtonBar from '../components/BackButtonBar.js';
import Taskbar from '../components/Taskbar.js';
import { Stack } from '@mui/material';

const CalendarView = ({user, habits, darkMode, onToggleTheme, setUser, setHabits}) => {
    return (
      <>
        <BackButtonBar 
          points={user.points}
          darkMode={darkMode} 
          onToggleTheme={onToggleTheme}
          setUser={setUser}
          setHabits={setHabits}
          contentType="date"
          bubbleLink="/"
          endButtons={[
            {link:"/yourprogress", content:"Badges", id:0}
          ]}
          />   
        <HabitCalendar habits={habits}/>
      </>
    );
  };

  export default CalendarView;
