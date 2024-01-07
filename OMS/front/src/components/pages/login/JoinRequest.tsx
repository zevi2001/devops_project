import { useEffect, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { joinRequest } from "../../../services/usersServices";
import { JoinRequestProps } from "../../../interfaces/propsInterfaces";


const JoinRequest = ({ open, handleClose }: JoinRequestProps) => {
  const [userNameInput, setUserNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
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
  
  const handleSubmit = async () => {
    setSuccess(null);
    setFormValid(null);
    setLoading(true);
    const response = await joinRequest({
      name: userNameInput,
      email: emailInput,
    });
    if (response?.status === 200) {
      setLoading(false);
      setSuccess("request sended successfully");
      const id = setTimeout(async () => {
        handleClose();
      }, 3000);
      setTimeoutId(Number(id));
    } else {
      setLoading(false);
      setFormValid("oops... something get wrong try again");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        send request to join OSM{" "}
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
          {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error">{formValid}</Alert>
            </Stack>
          )}
          {loading && (
            <Stack
              sx={{ width: "100%", paddingTop: "10px", alignItems: "center" }}
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
        </Stack>
      </DialogContent>
      <DialogActions>
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
          {" "}send{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JoinRequest;
