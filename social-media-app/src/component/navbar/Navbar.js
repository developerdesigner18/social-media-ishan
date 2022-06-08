import { Avatar, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import './navbar.css'

export default function Navbar() {
  return (
    <div>
        <div className='navbar-login-signup-btn'>
            <Button variant="contained" color="success" sx={{marginRight:3,marginTop:1.5,height:'30px'}}>Login</Button>
            <Button variant="contained" color="success"sx={{marginTop:1.5,height:'30px'}}>Signup </Button>
        </div>
        <Divider ></Divider><br/>
        <div className='home-navbar'>
            <Avatar src='images/image 2.png' sx={{width:'70px',height:'70px',padding:1}}> </Avatar>
            <div className='heading'>
                <Typography sx={{fontSize:'25px',justifyContent:'left'}}>Growth</Typography>
                <Typography sx={{fontSize:'15px'}}>swip tips fro finding user and customer</Typography>
            </div>
        </div>
</div>
  )
}
