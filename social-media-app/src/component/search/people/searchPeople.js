import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function SearchPeople() {
  return (
    <div>
        <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', }}>
            <div><Avatar src='images/profileImage5.jpg'  alt='profile' sx={{height:'70px',width:'70px',border : ' 1.5px solid #2E7D32',margin:'5px'}}></Avatar></div>
            <div>
                <span style={{fontSize:'21px',fontWeight:500}}>kainat and siyara </span>
                <span style={{fontSize:'19px'}}>View you post</span>
                <p style={{fontSize:'13px',margin:0}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet purus congue massa nulla augue molestie magna nunc. Sagittis volutpat pretium feugiat vel egestas odio</p>
                <p style={{fontSize:'13px',fontWeight:500}}>10 min ago</p>
            </div>
        </Box>
    </div>
  )
}
