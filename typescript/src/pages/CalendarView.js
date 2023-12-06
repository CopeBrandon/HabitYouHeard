import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';

const CalendarView = ({user, habits, darkMode, onToggleTheme, setUser, setHabits}) => {
    return (
      <>
        <Taskbar 
          points={user.points}
          darkMode={darkMode} 
          onToggleTheme={onToggleTheme}
          setUser={setUser}
          setHabits={setHabits}
          contentType="date"
          bubbleLink="/"
          endButtons={[
            {link:"/badges", content:"Badges", id:0}
          ]}
          />   
        <HabitCalendar habits={habits}/>
      </>
    );
  };

  export default CalendarView;
