import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material/";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";
import AuthLayout from "../../components/layouts/AuthLayout";

const salt = bcrypt.genSaltSync(10);

const SignUp = () => {
  const [response, setResponse] = useState("");
  let formSubmitted = false;
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const navigate = useNavigate();

  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [usernameHasError, setUsernameHasError] = useState(false);

  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
  });

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function getUsernameValidationMessage(username) {
      if (username === "") {
        setUsernameHasError(true);
        return "Username is blank!";
      } else if (username.length > 30) {
        setUsernameHasError(true);
        return "Username must be less than 30 characters!";
      } else {
        setUsernameHasError(false);
        return "";
      }
  }

  function handleUsernameChange(e){
    const updatedValue = e.target.value;
    setUsernameHelperText(getUsernameValidationMessage(updatedValue));
    setUser((user) => ({
      ...user,
      username: updatedValue
    }));
  }

  function getPasswordValidationMessage(password) {
    if (password === "") {
      setPasswordHasError(true);
      return "Password is blank!";
    } else if (password.length > 128) {
      setPasswordHasError(true);
      return "Password must be less than 128 characters!";
    } else if (password !== user.verifyPassword) {
      setPasswordHasError(true);
      return "Passwords are not the same";
    } else {
      setPasswordHasError(false);
      return "";
    }
  }
  // TODO: Create separate password and verify password handlers, basically only needs to verify whether it's the same as the first password
  function handlePasswordChange(e){
    const updatedValue = e.target.value;
    setPasswordHelperText(getPasswordValidationMessage(updatedValue));
    setUser((user) => ({
      ...user,
      password: updatedValue
    }));
  }

  function getEmailValidationMessage(email) {
    if (email === "") {
      setEmailHasError(true);
      return "Email is blank!";
    } else if (!isValidEmail(email)) {
      setEmailHasError(true);
      return "Invalid email!";
    }
    else {
      setEmailHasError(false);
      return "";
    }
  }

  function handleEmailChange(e){
    const updatedValue = e.target.value;
    setEmailHelperText(getEmailValidationMessage(updatedValue));
    setUser((user) => ({
      ...user,
      email: updatedValue
    }));
  }

  const handleSignUp = () => {
    formSubmitted = true;
    const emailValidationText = getEmailValidationMessage(user.email);
    const usernameValidationText = getUsernameValidationMessage(user.username);
    const passWordValidationText = getPasswordValidationMessage(user.password);
    setEmailHelperText(emailValidationText);
    setPasswordHelperText(passWordValidationText);
    setUsernameHelperText(usernameValidationText);

    if (
      emailValidationText === "" &&
      passWordValidationText === "" &&
      usernameValidationText === ""
    ) {
      handleFetch();
    }
  };

  const handleFetch = () => {
    const newUser = {
      email: user.email,
      username: user.username,
      password: user.password,
    };

    fetch("http://localhost:8080/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.text())
      .then((data) => {
        setResponse(data);
      });
  };
  useEffect(() => {
    if (response !== "" && response === "Created") {
      navigate("/auth/signin");
    }
  });

  return (
    <AuthLayout
      title="Create Account"
      buttonHandler={handleSignUp}
      linkPath="/auth/signin"
      linkTitle="Already have an account? Sign In"
    >
      <Stack spacing={3} maxWidth={800}>
        <TextField
          label="Email"
          variant="standard"
          value={user.email}
          onChange={(e) =>handleEmailChange(e)}
          error={emailHasError}
          helperText={emailHelperText}
        />
        <TextField
          label="Username"
          variant="standard"
          value={user.username}
          onChange={(e)=>handleUsernameChange(e)}
          error={usernameHasError}
          helperText={usernameHelperText}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={user.password}
          onChange={(e) => {
            let updatedValue = { password: e.target.value };
            setUser((user) => ({
              ...user,
              ...updatedValue,
            }));
          }}
          error={passwordHasError}
          helperText={passwordHelperText}
        />
        <TextField
          label="Verify Password"
          variant="standard"
          type="password"
          value={user.verifyPassword}
          onChange={(e) => {
            let updatedValue = { verifyPassword: e.target.value };
            setUser((user) => ({
              ...user,
              ...updatedValue,
            }));
          }}
          error={passwordHasError}
          helperText={passwordHelperText}
        />
      </Stack>
    </AuthLayout>
  );
};
export default SignUp;
