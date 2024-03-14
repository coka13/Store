import "./Nav.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useSelector } from "react-redux";

export const Nav = ({ children }) => {
  const navigate = useNavigate();
  const { username, password } = useSelector((state) => state.users);

  return (
    <nav>
      {username && password ? null : (
        <div className="login-register">
          <Button variant="text" endIcon={<LoginIcon />} onClick={() => navigate("/login")}>Login</Button>
          <Button variant="text" endIcon={<AppRegistrationIcon />} onClick={() => navigate("/register")}>Register</Button>
        </div>
      )}
      
      <CustomDrawer className="drawer" label={''} icon={ShoppingCartIcon}/>

      <div className="logo">
        <img src="server\client\public\logo.png" alt="Logo" onClick={() => window.location.href = "/"} />
      </div>
      {children}
      
      <Button variant="text" endIcon={<ShoppingCartIcon />} onClick={() => navigate("/cart")}>Cart</Button>
      <Button variant="text" endIcon={<HomeIcon />} onClick={() => navigate("/")}>Home</Button>
      <Button variant="text" endIcon={<SupervisorAccountIcon />} onClick={() => navigate("/admin")}>Admin</Button>
    </nav>
  );
};
