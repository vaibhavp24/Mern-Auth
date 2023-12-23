import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../store'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
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
    const res = await axios.post('http://localhost:5000/api/login', {
      email: input.email,
      password: input.password
    })
      .catch((err) => console.log("LoginError", err))
    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(input);
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/user"))
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
          <Typography variant='h2'>Login</Typography>
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
            Login
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Login