import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./index";
import "./index.css";

import Login from "./Login/login"
import ClientRegistration from "./Login/ClientRegistration";
import CoachRegistration from "./Login/CoachRegistration";
import ForgetPassword from "./Login/ForgetPassword"

export default function App() {
  return (
    <Router>
      <Routes>

       <Route path="/Login" element={<Login />} />
        <Route path="/ClientRegistration" element={<ClientRegistration />}  />
        <Route path="/CoachRegistration" element={<CoachRegistration />}  />
                <Route path="/ForgetPassword" element={<ForgetPassword />}  />



        <Route path="/" element={<Navigate to="/Johnrenz" replace />} />
        <Route path="/Johnrenz" element={<Index />} />
      </Routes>
    </Router>
  );
}
