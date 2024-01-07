import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FormDataSignUp } from "../interface/interface";
import { Typography } from "@mui/material";

const apiUrl = import.meta.env.VITE_BASE_URL;

console.log(`API Base URL: ${apiUrl}`);

const RegisterFormStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.0)",
  backgroundColor: "rgba(255, 255, 255, 0.0)",
};
const ButtonStyle: React.CSSProperties = {
  backgroundColor: "#3399FF",
  color: "white",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormDataSignUp>();
  const [open, setOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleRegistration = async (data: FormDataSignUp) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/users/register`,
        // "https://erp-beak1-6.onrender.com/api/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
console.log(response);

      if (response.data.user) {
        console.log("Registration successful");
        setLoginSuccess(true);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/");
        }, 1500);
      } else {
        console.error("Registration failed");
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setLoginSuccess(false);
    }
  };

  const handleClose = () => {
    setOpen(false);

    if (loginSuccess) {
      navigate("/erp");
    } else {
      console.error("Registration failed");
    }
  };
  return (
    <Box
      style={{
        backgroundImage:
          'url("https://assets-discuss-neos-io.s3.dualstack.eu-central-1.amazonaws.com/original/2X/6/665c28e208724e2280dd9520eee68b45665743ed.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >

        <Grid item xs={12} md={6}>
          <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <Typography variant="h4">SignUp</Typography>

            <CardContent>
              <Box
                component="form"
                style={RegisterFormStyle}
                onSubmit={handleSubmit(handleRegistration)}
              >
                <FormControl>
                  <InputLabel htmlFor="email">Enter Your Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("username", { required: "Email is required" })}
                  />
                  {errors.username && (
                    <FormHelperText error>
                      {errors.username.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                  {errors.password && (
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="confirmPassword">
                    Password Confirmation
                  </InputLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Password confirmation is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <FormHelperText error>
                      {errors.confirmPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    ...ButtonStyle,
                    backgroundColor: "rgba(128, 128, 128, 0.7)", // Adjust alpha for transparency
                  }}
                >
                  Sign Up
                </Button>

                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={loginSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                  >
                    {loginSuccess
                      ? "Registration successful! Redirecting to Products..."
                      : "Registration failed"}
                  </Alert>
                </Snackbar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
