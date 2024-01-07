import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const Navigate = useNavigate()
    return (
      <div style={{ padding: 20 }}>
        <h2>404: Page Not Found</h2>
        <Button variant="contained" onClick={() => {Navigate('/oms')}}> home </Button>
        <p>Haven't the Jewish people suffered enough?</p>
        <img
          src="https://static1.s123-cdn-static-a.com/ready_uploads/media/109793/2000_5ce858ee628f0.jpg"
          alt="Page Not Found"
          style={{ maxWidth: '100%', height: '50%' }}
          />
          </div>
    );
  };
  
  export default PageNotFound;
  