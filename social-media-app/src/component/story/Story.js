import { Avatar, Badge, Dialog, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import AddStory from './userStory/AddStory'
import UserStory from './userStory/UserStory'
import './story.css'

function Story() {
    const [open, setopen] = useState(false)
    const [addpostFlag, setaddpostFlag] = useState(false)
    const handleAddstory=()=>{
        setaddpostFlag(true)
    }
    const seeStory=()=>{
        setopen(true)
    }
    const handleClose=()=>{
        setaddpostFlag(false)
        setopen(false)
    }
  return (
    <div className='stroy-container'>
        <Badge color="primary" overlap="circular" badgeContent="+" 
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
        <div onClick={handleAddstory}><Avatar src = 'images/profileImage5.jpg' sx={{height:'60px',width:'60px',border:'3px solid #2E7D32'}} /></div>
        </Badge>
        <div onClick={seeStory}><Avatar src = 'images/profileImage5.jpg' /></div>
        <Dialog open={addpostFlag} onClose={handleClose}>
            <DialogContent> 
                <AddStory/>
                
            </DialogContent>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent> 
               
                <UserStory/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default Story