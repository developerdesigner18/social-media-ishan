import React, { useState } from 'react'
import './login.css'
import {Button, Divider, InputAdornment, TextField, Typography} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const onLogin =()=>{
        axios.post('http://localhost:5000/auth/login',
        {
            username:username,
            password:password
        }
        ).then((response)=>{
            console.log('login successful',response)
            localStorage.setItem('token',response.data.token)
            
            navigate('/')
        })
        .catch((err)=>{console.log('err',err.message);})
    }
  return (
    <div className='login-background'>
        <img src='images/Ellipse 68.png' alt='ellipse' className='ellipse1'/>
        <img src='images/Ellipse 68.png' alt='ellipse' className='ellipse2'/>
        <div className='login-container'>
            <Typography  sx={{fontFamily:'Open Sans',fontSize:'35px',fontWeight:'600px',color:'#515151',marginTop:1}}>Log In</Typography><br/>
            <div className='login-input-feld'>
                
                <TextField  label='username' size='small' fullWidth margin="dense" onChange={(e)=>setusername(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <EmailIcon fontSize='medium'/>
                    </InputAdornment>
                    ),
                    }}
                />
               
                <TextField  label='Password' size='small' fullWidth margin="dense" onChange={(e)=>setpassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <LockIcon fontSize='medium'/>
                    </InputAdornment>
                    ),
                    }}
                />
                <Typography sx={{textAlign :'right',color:' #7D7979'}}>forget password</Typography>
                
                <br/>
                <div className='login-btn'>
                <Button  sx={{color: 'white',fontSize: '18px'}}  fullWidth onClick={onLogin}>Sign In</Button>
                </div>
                <Divider sx={{color:'#7D7979',fontSize:'18px',marginTop: '10px'}}>Or</Divider><br/>
            

                <div className='link-btn'>
                    <div style={{background: '#243B68',width:'94px',borderRadius: '5px 0px 0px 5px',}} >
                    <FacebookOutlinedIcon sx={{color:'white',fontSize:'30px',marginTop:1}}/>
                    </div>
                    <div style={{margin:'auto',fontSize:'18px', background : '#3A5998',height:'100%',width:'100%',borderRadius: '0px 5px 5px 0px'}}>
                    <Typography sx={{marginTop:1.5,color:'white'}}>LOG IN WITH FACEBOOK</Typography>
                    </div>  
                </div><br/>
                <div className='link-btn'>
                    <div style={{background: '#C52D23',width:'94px',borderRadius: '5px 0px 0px 5px',}} >
                    <GoogleIcon sx={{color:'white',fontSize:'30px',marginTop:1}}/>
                    </div>
                    <div style={{margin:'auto',fontSize:'18px', background : '#F44235',height:'100%',width:'100%',borderRadius: '0px 5px 5px 0px'}}>
                    <Typography sx={{marginTop:1.5,color:'white'}}>LOG IN WITH GOOGLE</Typography>
                    </div>  
                </div>     
            </div>
        </div>
    </div>
  )
}
