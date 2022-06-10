import React, { useEffect, useState } from 'react'
import{Autocomplete, Avatar, Card, Grid, TextField, Typography} from '@mui/material'
import axios from 'axios'
import './search.css';

export default function Searsh() {
  const [data, setdata] = useState([])
  useEffect(()=>{
     axios.get('http://localhost:5000/getalluser')
     .then((response)=>{
        setdata(response.data.data)
        console.log(data);

     })
     .catch((err)=>{console.log('err',err);})
  },[])
  return (
    <div>
        <h1>Search</h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data.map((item)=>item.username)}
          fullWidth
          renderInput={(params) => <TextField {...params} label="users" />}
        /><br/>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Card>
              <div className='display-user-card'>
                <Avatar src='images/profileImage5.jpg'  alt='profile' sx={{height:'55px',width:'55px',border : '3px solid #2E7D32'}}/>
                <Typography sx={{fontSize:'18px',fontWeight:600}}> @ishan123</Typography>
              </div>
            
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
            <Avatar src='images/profile1.png' alt='profile'/>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
            <Avatar src='images/profile1.png' alt='profile'/>
            </Card>
          </Grid>
        </Grid>
    </div>
  )
}
