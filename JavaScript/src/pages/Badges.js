import React from 'react';
import { Box } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import HabitBadgeProgress from '../components/HabitBadgeProgress';

const divisions = [
  {name:"Iron", color:"#a19d94", offColor:"#fafafa", id:0},
  {name:"Bronze", color:"#cd7f32", offColor:"#fafafa", id:1},
  {name:"Silver", color:"#c0c0c0", offColor:"black", id:2},
  {name:"Gold", color:"#ffd700", offColor:"black", id:3},
  {name:"Platinum", color:"#e5e4e2", offColor:"black", id:4},
  {name:"Emerald", color:"#50c878", offColor:"#fafafa", id:5},
  {name:"Diamond", color:"#b9f2ff", offColor:"black", id:6}
];
const subDivisions = ["I. ", "II. ", "III."];
const numBadges = 147; // change this to reflect the number of images you have labeled levelbadge##.png
const scoreWeight = 50; //change this to adjust how many points per subdivision

const numBadgesPerDivision = numBadges/divisions.length;
const endSubDivisions = subDivisions.length-1;
const widthSubDivision = (numBadgesPerDivision - 1) / (subDivisions.length-1);

const getBadgeNameAndURL = (score) => {                                                                                     //examples: 20 * scoreWeight | 143 * scoreWeight
  const weightedScore = score / scoreWeight > numBadges ? numBadges : Math.floor(score / scoreWeight);                      //  = 20 | 143
  const subDivisionRank = weightedScore % numBadgesPerDivision;                                                             // = 20 | 17
  const division = divisions[Math.floor(weightedScore / numBadgesPerDivision)];                                             // = divisions[0] = {name:iron} | divisions[6] = {name:emerald}
  const subDivision = subDivisions[Math.floor((endSubDivisions) * (1+subDivisionRank) / numBadgesPerDivision)];             // = subDivisions[2] | subDivisions[1]
  let rank =`${division.name} ${subDivision}`;                                                                              // = "Iron III." | "Emerald II. "
  rank += rank.includes(subDivisions[endSubDivisions]) ? `` : `${subDivisionRank % widthSubDivision}/${widthSubDivision}`;  // = "Iron III." | "Emerald II. 7/10"
  return {
    imgUrl: "/badgeicons/levelbadge" + weightedScore + ".png",
    rank: rank,
    color: division.color,
    offColor: division.offColor
  };
}

const getStreakMessage = (streak) => {
  return streak > 0 ? `${streak} day streak!`: "No streak yet."
}

const Badges = ({habits, darkMode, children}) => {
  return (
  <Box sx={{
    backgroundImage: `url(backgroun.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}>
    {children}{/*Taskbar*/}
    <Grid container justifyContent="center" alignItems="center" margin="0px" 
          rowSpacing={4}
          columnSpacing={8}
    >
      {habits.map((habit) => (
          <HabitBadgeProgress
            title={habit.name}
            description={habit.description}
            badgeMeta={getBadgeNameAndURL(habit.pointValue)}
            streakLength={getStreakMessage(habit.streak)}
            score={habit.pointValue}
            darkMode={darkMode}
            key={habit.id}
          />
        ))}
    </Grid>
  </Box>)};
  
  export default Badges;