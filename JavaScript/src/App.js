import React, { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { SignUp, CalendarView, HabitsPage, Home, SignIn, Badges } from "./pages/Pages";
import Taskbar from "./components/Taskbar";
import AuthBackground from "./components/layouts/AuthBackground";
import { lightTheme, darkTheme } from "./palette/colors";

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

  const theme = createTheme(({
    palette: {
      mode: darkMode ? "dark": "light",
      ...(!darkMode
        ? lightTheme : darkTheme)
    }
  }));
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    const fetchHabits = async () => {
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
    fetchHabits();
  },
  [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={(<Navigate replace to="/"/>)}/>
          <Route path="/" element={user.token=== "" ? <Navigate replace to={"/auth/signin"}/>:<Outlet/>}>
            <Route index element=
              {
              (<Home user={user} habits={habits} setHabits={setHabits}>
                <Taskbar
                  darkMode={darkMode}
                  onToggleTheme={handleToggleTheme}
                  user={user}//only needs because user.username
                  setUser={setUser}//only needs because i havent moved handleSignout to app.js yet
                  setHabits={setHabits}//same for this
                  contentType="date"
                  endButtons={[
                    {link:"/calendar", content:"Calendar", id:0},
                    {link:"/badges", content: "Badges", id:1}
                  ]}
                />
                </Home>)}
            />
            <Route path="badges" element={
              <Badges 
                habits={habits} 
                darkMode={darkMode}>
                  <Taskbar
                    darkMode={darkMode}
                    onToggleTheme={handleToggleTheme}
                    user={user}
                    setUser={setUser}
                    setHabits={setHabits}
                    contentType="points"
                    endButtons={[{link:"/calendar", content:"Calendar", id: 0}]}
                  />
              </Badges>
              }/>
            <Route path="calendar" element={
              <CalendarView 
                habits={habits}>
                  <Taskbar
                    darkMode={darkMode}
                    onToggleTheme={handleToggleTheme}
                    user={user}
                    setUser={setUser}
                    setHabits={setHabits}
                    contentType="date"
                    endButtons={[{link:"/badges", content:"Badges", id:0}]}
                  />
                </CalendarView>
              }/>
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
