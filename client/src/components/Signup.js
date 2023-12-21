import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/signup', {
      name: input.name,
      email: input.email,
      password: input.password
    }).catch((err) => console.log("SignupError", err))
    const data = await res.data.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(input);
    sendRequest().then(() => navigate("/login"))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          margin={"auto"}
          width={300}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant='h2'>Signup</Typography>
          <TextField
            name='name'
            onChange={handleChange}
            value={input.name}
            variant='outlined'
            placeholder='Name'
            margin='normal'
          />
          <TextField
            name='email'
            onChange={handleChange}
            type='email'
            value={input.email}
            variant='outlined'
            placeholder='Email'
            margin='normal'
          />
          <TextField
            name='password'
            onChange={handleChange}
            type='password'
            value={input.password}
            variant='outlined'
            placeholder='Password'
            margin='normal'
          />
          <Button variant='contained' type='submit'>
            Sign Up
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Signup