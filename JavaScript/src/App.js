import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthBackground from "./components/layouts/AuthBackground";
import SignUp from "./pages//signup/SignUp";
import CalendarView from "./pages/CalendarView";
import HabitsPage from "./pages/HabitsPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import Badges from "./pages/Badges";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {token: ""});
  const [habits, setHabits] = useState([]);
  const [darkMode, setDarkMode] = useState(user.darkMode? user.darkMode : false);
  
  const handleToggleTheme = (signout) => {
    if(signout){
      setDarkMode(false);
      return;
    }
      fetch(`http://localhost:8080/api/user/darkmode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          user.darkMode = data;
          setDarkMode(user.darkMode);
          localStorage.setItem("user", JSON.stringify(user));
        }) 
  };

  const colors = {
    blues: {
      main: '#4175cf',
      light: '#4b95f1',
      dark: '#33469c'
    },
    purples: {
      main: '#9c27b0',
      light: "#af52bf",
      dark: "#6d1b7b"
    },
    greys: {
      main: "#34373d",
      light: "#52555c",
      dark: "#14171d"
    }
  }

  const theme = createTheme(({
    palette: {
      mode: darkMode ? "dark": "light",
      ...(!darkMode
        ? {
          primary: colors.blues,
          secondary: colors.purples,
          overlay: colors.blues.dark,
        }:{
          primary: colors.purples,
          secondary: colors.blues,
          overlay: colors.purples.main,
          background: {
            default: colors.greys.dark,
            paper: colors.greys.main,
          }
        })
    }
    
  }));

  const fetchHabits = () => {
    if(user.token === "") return;
    fetch("http://localhost:8080/api/habits/", {
      headers: {
        Authorization: user.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHabits(data.sort((a, b) => a.id - b.id));
      });
  };

  useEffect(() => {
    fetchHabits();
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                  user.token !== "" ? (
                    <Home
                    onToggleTheme={handleToggleTheme}
                    user={user}
                    setUser={setUser}
                    habits={habits}
                    setHabits={setHabits}
                    darkMode={darkMode}
                  
                  />                  ) : (
                    <Navigate replace to={"/auth/signin"} />
                  )
                }
              
            />

            <Route path="badges" element={<Badges 
              user={user} 
              habits={habits} 
              darkMode={darkMode} 
              onToggleTheme={handleToggleTheme}
              setUser={setUser}
              setHabits={setHabits}/>} />
            <Route path="calendar" element={<CalendarView 
              user={user} 
              habits={habits}
              darkMode={darkMode}
              onToggleTheme={handleToggleTheme}
              setUser={setUser}
              setHabits={setHabits} />} />
            <Route
              path="habitsPage"
              element={
                <HabitsPage user={user} habits={habits} setHabits={setHabits} />
              }
            />
          </Route>
          <Route path="/auth" element={<AuthBackground />}>
            <Route path="signin" element={<SignIn setUser={setUser} user={user} habits={habits} setDarkMode={setDarkMode}/>} />
            <Route path="signup" title={SignUp.title} element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
