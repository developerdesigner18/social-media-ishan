import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import './home.css'
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import {Nav,Tab} from 'react-bootstrap'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TagIcon from '@mui/icons-material/Tag';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Post from './component/post/post';

export default function Home() {


    
  return (
    <div>
        <div className='home-navbar'>
            <Avatar src='images/image 2.png' sx={{width:'70px',height:'70px',padding:1}}> </Avatar>
            <div className='heading'>
                <Typography sx={{fontSize:'25px',justifyContent:'left'}}>Growth</Typography>
                <Typography sx={{fontSize:'15px'}}>swip tips fro finding user and customer</Typography>
            </div>
        </div>
        <div className='newPost-btn'>
            <Button variant="contained" color="success" sx={{marginRight:3,marginTop:1.5}}>New post</Button>
            <Button variant="contained" color="success"sx={{marginTop:1.5}}>Join Group <AirlineStopsIcon sx={{marginLeft:2}}/></Button>
        </div><br/>
        <div className='menu-container'>
            <Tab.Container defaultActiveKey={"home"}>
                <Nav>
                    <div className='menu-bar'>
                        <h3>Menu</h3>
                    <Nav.Item >
                        <Nav.Link eventKey={"home"} style={{color:'#464242'}}><HomeIcon/> Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link eventKey={"search"} style={{color:'#464242'}}><SearchIcon/> Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link eventKey={"chat"} style={{color:'#464242'}}><ChatIcon/> Chat</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link eventKey={"notification"} style={{color:'#464242'}}><NotificationsIcon/> notification</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link eventKey={"tranding"} style={{color:'#464242'}}><TagIcon/> tranding</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link eventKey={"communities"} style={{color:'#464242'}}><PeopleAltIcon/> communities</Nav.Link>
                    </Nav.Item>
                    </div>
                </Nav>
                <Tab.Content className='post-container'>
                    <Tab.Pane eventKey={"home"}>
                        <Post/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"search"}>
                    <h1>Search</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"chat"}>
                    <h1>Chat</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"notification"}>
                    <h1>notification</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"tranding"}>
                    <h1>tranding</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"communities"}>
                    <h1>communities</h1>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <div className='about-us-box'>About us</div>
        </div>
        
    </div>
  )
}
