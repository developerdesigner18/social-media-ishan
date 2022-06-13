import { Button, Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import Navbar from '../navbar/Navbar';
import Searsh from '../search/search';
import Newpost from './component/newPost/Newpost';
import axios from 'axios'

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const [post, setpost] = useState([])
    

    useEffect(()=>{
        axios.get('http://localhost:5000/getalluser/post', {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            console.log(response.data.data);
            setpost(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    const handleClose = (value) => {
        setOpen(false);
      };
    const onAddnewPost =()=>{
        setOpen(true);
    }
    
  return (
    <div>
        <Navbar/>
        <Dialog open={open} onClose={handleClose} >
            <DialogContent className='add-post-container'> 
                <Newpost handleClose={handleClose}/>
            </DialogContent>
        </Dialog>
        <div className='main-container'>
        <div className='newPost-btn'>
            <Button variant="contained" color="success" sx={{marginRight:3,marginTop:1.5}} onClick={onAddnewPost}>New post</Button>
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
                        <Searsh/>
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
            {/* <div className='about-us-box'><AboutUs/></div> */}
        </div>
        </div>
    </div>
  )
}
