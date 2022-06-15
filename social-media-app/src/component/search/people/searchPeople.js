import { Avatar, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function SearchPeople() {
  const [userdata, setuserdata] = useState([])
  const [alldata, setalldata] = useState([])


  useEffect(()=>{
    axios.get('http://localhost:5000/getalluser',
    {headers:{
      "Authorization":  localStorage.getItem('token')
    }})
    .then((response)=>{
      setuserdata(response.data.data)
      setalldata(response.data.data)
     
    })
    .catch((err)=>{
      console.log('err in fatching data',err);
    })
  },[])

  const searchUser =(value)=>{
    var result = alldata.filter((item)=>{
      if(item.username.includes(value)){
        return item
      }
    })
    // if(value == '')
    setuserdata(result)
  }

  return (
    <div>
      <TextField label='search' size='small' fullWidth onChange={(e)=>searchUser(e.target.value)}></TextField><br/>
      {
        userdata.map((i)=>{
          return(
            <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', margin:1}}>
              <div><Avatar src={`http://localhost:5000/static/${i.profileImage}`}  alt='profile' sx={{height:'60px',width:'60px',border : ' 3px solid #2E7D32',margin:'5px'}}></Avatar></div>
              <div>
                  <span style={{fontSize:'21px',fontWeight:500}}>{i.username}</span>
                  {/* <span style={{fontSize:'19px'}}>View you post</span> */}
                  <p style={{fontSize:'13px',margin:0}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet purus congue massa nulla augue molestie magna nunc. Sagittis volutpat pretium feugiat vel egestas odio</p><br/>
                  {/* <p style={{fontSize:'13px',fontWeight:500}}>10 min ago</p> */}
              </div>
            </Box>
          )
        })
      }
      {/* <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', }}>
          <div><Avatar src='images/profileImage5.jpg'  alt='profile' sx={{height:'70px',width:'70px',border : ' 1.5px solid #2E7D32',margin:'5px'}}></Avatar></div>
          <div>
              <span style={{fontSize:'21px',fontWeight:500}}>kainat and siyara </span>
              <span style={{fontSize:'19px'}}>View you post</span>
              <p style={{fontSize:'13px',margin:0}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet purus congue massa nulla augue molestie magna nunc. Sagittis volutpat pretium feugiat vel egestas odio</p>
              <p style={{fontSize:'13px',fontWeight:500}}>10 min ago</p>
          </div>
      </Box> */}
    </div>
  )
}
