import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "../pages/dashboard/DashBoard";
import Login from "../pages/login/Login";
import PageNotFound from "../pages/pageNotFound/PageNotFound";

function MyRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
          <Route path="/oms/orders/login" element={<Login/>} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/oms/" element={<DashBoard/>}></Route>
          <Route path="/oms/orders/dashboard" element={<DashBoard/>} />  
      </Routes>
    </Router>
  );
}
export default MyRouter;
