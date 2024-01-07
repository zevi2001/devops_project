import {  useNavigate} from "react-router-dom";
import { useEffect} from "react";
import React from "react";
import { useAuth } from "../../../utils/useAuth";



export const MainRoute = () => {
  const navigate = useNavigate();
  const  isAuthenticated  = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/oms/orders/login");
    }
    else{
      navigate("/oms/orders/dashboard");
    }
  },[])
  return (
    <React.Fragment>
    </React.Fragment>
  );
};