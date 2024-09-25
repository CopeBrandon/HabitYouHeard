import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

export default function SignInSide(props) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [userLoggingIn, setUserLoggingIn] = useState({
    email: "",
    username: "",
    password: "",
  });

  async function fetchToken() {
    return await fetch("http://localhost:8080/api/auth/assign/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLoggingIn),
    }).then((res) => res.json());
  }


  const handleLogin = (event) => {
    event.preventDefault();
    fetchToken().then((response) => {
      if (response.token) {
        setPasswordHelperText("");
        setUsernameHelperText("");
        response.darkMode = response.darkMode === "true";
        props.setUser(response);
        props.setDarkMode(response.darkMode === "true");
        //TODO: This is a bug, I think. I don't see why this code is working..?
        // It might be because the useEffect is handling all of that anyways when it 
        // calls back the user from the database onToggleTheme

        navigate("/");
      } else if (response.errorMessage) {
        setUsernameHelperText(response.errorMessage === "User Not Found" ? "User Not Found" : "");
        setPasswordHelperText(response.errorMessage === "Invalid Password" ? "Invalid Password!" : "");
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <AuthLayout
        title="Welcome Back!"
        buttonHandler={handleLogin}
        linkPath="/auth/signup"
        linkTitle="Sign Up"
      >
        <Stack spacing={3} maxWidth={800}>
          <TextField
            label="Username"
            variant="standard"
            value={userLoggingIn.username}
            onChange={(e) => {
              let updatedValue = { username: e.target.value };
              setUserLoggingIn((userLoggingIn) => ({
                ...userLoggingIn,
                ...updatedValue,
              }));
            }}
            error={usernameHelperText === "User Not Found"}
            helperText={usernameHelperText}
            autoComplete="username"
          />
          <TextField
            id="password-with-visibility-icon"
            label="Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={userLoggingIn.password}
            onChange={(e) => {
              let updatedValue = { password: e.target.value };
              setUserLoggingIn((userLoggingIn) => ({
                ...userLoggingIn,
                ...updatedValue,
              }));
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >{/*TODO: handleMouseDown event? no idea why i need to preventDefault for this...*/}
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={passwordHelperText === "Invalid Password!"}
            helperText={passwordHelperText}
            autoComplete="current-password"
          >
          </TextField>
        </Stack>
      </AuthLayout>
    </form>
  );
}
