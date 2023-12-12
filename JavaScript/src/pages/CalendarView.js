import React from 'react';
import HabitCalendar from '../components/HabitCalendar.js'

const CalendarView = ({habits, children}) => {
    return (
      <>
        {children}
        <HabitCalendar habits={habits}/>
      </>
    );
  };

  export default CalendarView;
