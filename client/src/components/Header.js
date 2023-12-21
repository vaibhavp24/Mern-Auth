import React, { useState } from 'react'
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
  const [value, setValue] = useState()
  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h3'>MERN Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor='secondary'
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor='inherit'
            >
              <Tab to="/login" LinkComponent={Link} label="LOGIN" />
              <Tab to="/signup" LinkComponent={Link} label="SIGNUP" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header