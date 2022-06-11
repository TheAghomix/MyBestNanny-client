import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth, registerAuth } from "../redux/authReducer";
import validator from "email-validator";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  input: {
    borderRadius: 3,
    boxShadow: "0px 10px 10px 5px #65b363",
    height: 55,
    padding: "0 0",
    "&.MuiInputLabel-outlined": { color: "black" }, // or black
    "& #outlined-basic-label": {
      color: "black",
      zIndex: 2,
      marginTop: 5,
      width: "inherit",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  btn: {
    backgroundColor: "white",
    color: "black",
  },
});

function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authR.status);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    type: "parent",
  });
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    errorUsername: "",
    errorEmail: "",
    errorPassword: "",
    errorLogin: "",
  });
  //const test = useSelector(state => state.authR.status)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIsRegistered) {
      if (!validator.validate(formData.email)) {
        setErrorMessage({ errorEmail: "Verify your Email" });
      } else if (formData.password.length < 4) {
        setErrorMessage({ errorPassword: "Verify your Password" });
      } else if (formData.username.length === 0) {
        setErrorMessage({ errorUsername: "Verify your userName" });
      } else {
        dispatch(registerAuth(formData));
      }
    } else {
      dispatch(loginAuth(formData));
      setErrorMessage({ errorLogin: "Verify your data" });
    }
  };

  const [checked, setChecked] = useState(true);
  const handleParentChange = (e) => {
    setChecked(!checked);
    setFormData({ ...formData, type: e.target.name });
  };
  const handleNannyChange = (e) => {
    setChecked(!checked);
    setFormData({ ...formData, type: e.target.name });
  };
  return (
    <div className="form_and_button_container">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="username"
          variant="outlined"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        {errorMessage.errorUsername && (
          <label>{errorMessage.errorUsername}</label>
        )}

        <TextField
          className={classes.input}
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errorMessage.errorEmail && <label>{errorMessage.errorEmail}</label>}
        <br />

        {userIsRegistered && (
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="full name"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        )}
        {userIsRegistered && (
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="email"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        )}
        {errorMessage.errorPassword && (
          <label>{errorMessage.errorPassword}</label>
        )}

        <br />

        <FormGroup>
          <div className="checkbox_styling">
            <FormControlLabel
              control={
                <Checkbox
                  name="parent"
                  onChange={handleParentChange}
                  checked={checked}
                  sx={{
                    color: "white",
                    "&.Mui-checked": { color: "white" },
                  }}
                />
              }
              label="Parent"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="nanny"
                  onChange={handleNannyChange}
                  checked={!checked}
                  sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                />
              }
              label="Nanny"
            />
          </div>
        </FormGroup>

        <br />

        <Button
          style={{ backgroundColor: "white", color: "black" }}
          type="submit"
          onClick={handleSubmit}
        >
          {userIsRegistered ? "Register" : "Login"}
        </Button>
      </Box>
      {errorMessage.errorLogin && authState !== "loading" && (
        <label>{errorMessage.errorLogin}</label>
      )}
      <br />
      <p
        onClick={() => setUserIsRegistered(!userIsRegistered)}
        style={{
          cursor: "pointer",
          width: "35vw",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        {userIsRegistered
          ? "Already have an account?"
          : "New to our website? Create a new account"}
      </p>
      <br />
    </div>
  );
}

export default Form;

//testing
