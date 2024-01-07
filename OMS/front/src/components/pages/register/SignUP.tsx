import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import registerValidation from "../../../utils/registerValidation";
import { registerUser } from "../../../services/usersServices";
import { typographyStyle } from "../../../style";
import { SignUpProps } from "../../../interfaces/propsInterfaces";

const theme = createTheme({
  typography: typographyStyle
});

const SignUp = ({ open, handleClose }: SignUpProps) => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [userNameInput, setUserNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPassInput, setConfirmPassInput] = useState<string>("");
  const [formValid, setFormValid] = useState<null | string>();
  const [success, setSuccess] = useState<null | string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    setSuccess(null);
    const { error } = registerValidation({
      userName: userNameInput,
      email: emailInput,
      password: passwordInput,
      isAdmin: true,
    });
    if (error?.details[0].message) {
      setFormValid(error?.details[0].message);
      return;
    }
    if (passwordInput !== confirmPassInput) {
      setFormValid("password does not match. Please Re-Enter");
      return;
    }
    setFormValid(null);
    setLoading(true);
    const response = await registerUser({
      userName: userNameInput,
      email: emailInput,
      password: passwordInput,
      isAdmin: true,
    });
    if (response?.status === 200) {
      setLoading(false);
      setSuccess("user added successfully");
      const id = setTimeout(async () => {
        handleClose();
      }, 1500);
      setTimeoutId(Number(id));
    } else if (response?.status === 401) {
      Navigate("/oms/orders/login/?notLoginPopup=true");
      localStorage.removeItem("access_token");
    } else {
      setLoading(false);
      setFormValid(response?.data || "oops... something get wrong try again");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {" "}
          Add admin{" "}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            {" "}
            <CloseIcon />{" "}
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="standard"
              label="User name"
              value={userNameInput}
              InputProps={{}}
              size="small"
              onChange={(event) => {
                setUserNameInput(event.target.value);
              }}
            />
            <TextField
              variant="standard"
              label="Email Address"
              fullWidth
              id="standard-basic"
              sx={{ width: "100%" }}
              value={emailInput}
              InputProps={{}}
              size="small"
              onChange={(event) => {
                setEmailInput(event.target.value);
              }}
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setPasswordInput(event.target.value);
                }}
                value={passwordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setConfirmPassInput(event.target.value);
                }}
                value={confirmPassInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formValid && (
                <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                  <Alert severity="error">{formValid}</Alert>
                </Stack>
              )}
              {loading && (
                <Stack
                  sx={{
                    width: "100%",
                    paddingTop: "10px",
                    alignItems: "center",
                  }}
                  spacing={2}
                >
                  <CircularProgress />
                </Stack>
              )}

              {success && (
                <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                  <Alert severity="success">{success}</Alert>
                </Stack>
              )}
            </FormControl>
            <Button
              sx={{
                bgcolor: "teal",
                color: "white",
                fontFamily: "Barlow",
                "&:hover": {
                  backgroundColor: "#80cbc4",
                },
              }}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              {" "}
              Submit{" "}
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default SignUp;
