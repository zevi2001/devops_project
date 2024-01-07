import { Box } from "@mui/material";
import SuperHeader from "../register/Modal";
import Table from "./table/Table";
import { useAuth } from "../../../utils/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const DashBoard = () => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
  if (!isAuthenticated) {
    navigate("/oms/orders/login");
  }
  },[])
  

  return (
    <Box
      sx={{
        bgcolor: "#e0f2f1",
        minHeight: "100vh",
        width: "100vw",
        margin: "0",
        position: "absolute",
      }}
    >
      <SuperHeader />
      <Table />
    </Box>
  );
};

export default DashBoard;
