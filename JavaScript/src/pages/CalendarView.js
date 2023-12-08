import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'
import Taskbar from '../components/Taskbar.js';

const CalendarView = ({habits, children}) => {
    return (
      <>
        {children}
        <HabitCalendar habits={habits}/>
      </>
    );
  };

  export default CalendarView;
