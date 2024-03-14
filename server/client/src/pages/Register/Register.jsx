import React, { useState } from 'react'
import "./Register.css"
import { Button, TextField } from '@mui/material';
import { Nav } from '../../components/Nav/Nav';
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [formValues, setFormValues] = useState( {});
  const navigate=useNavigate()

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormValues({ ...formValues, [name]: value });
};


const handleFormSubmit = (event) => {
  event.preventDefault();
  handleNewUser(formValues);
};

const handleNewUser = async (formData) => {
  console.log(formData)
  try {
    const response = await fetch('http://localhost:3000/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to add new user');
    }

    const data = await response.json();
    // Handle the response data as needed
    console.log('New user added:', data);
    navigate('/')
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error adding new user:', error.message);
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
            <Button type="submit">Register</Button>
            </div>
    </form>

</>
  )
}

export default Register