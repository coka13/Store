import React, { useState } from "react";
import "./Login.css";
import { Button, TextField } from "@mui/material";
import { Nav } from "../../components/Nav/Nav";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send login request to the server (replace with your actual API endpoint)
      //const response = await fetch("http://localhost:3000/login", 
      const response = await fetch("https://store-wujf.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();

      // Check if login was successful
      if (response.ok) {
        console.log("Successfuly logged in");
        // Dispatch action to update Redux store with user information
        dispatch(setLogin(data)); // Assuming the server returns user data upon successful login
        // Redirect user to dashboard or another page
        // Example: history.push('/dashboard');
        navigate('/')
      } else {
        // Handle login error
        console.log(data.message); // Assuming the server returns an error message
      }
    } catch (error) {
      console.log("Error during login:", error);
      console.log("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Nav></Nav>
      <form className="modalForm" onSubmit={handleFormSubmit}>
        <TextField
          id="username"
          name="username"
          label="username"
          variant="outlined"
          value={formValues["username"] || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          name="password"
          label="password"
          variant="outlined"
          value={formValues["password"] || ""}
          onChange={handleInputChange}
        />
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
