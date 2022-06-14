import { Avatar, Button, Card, IconButton, Typography } from '@mui/material'
import{Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './newest.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import axios from 'axios'
import Comment from '../comment/Comment';



export default function Newest() {
    const [post, setpost] = useState([])
    const [likebtnColor, setlikebtnColor] = useState(false)
    const [followFlag, setfollowFlag] = useState(true)
    const [userdata, setuserdata] = useState([])
    
    const [commentflafID, setcommentflafID] = useState('')


    useEffect(()=>{
        axios.post('http://localhost:5000/getalluser/userprofile',{username:localStorage.getItem('username')},{headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{setuserdata(response.data.data[0]);})
        .catch((err)=>{console.log('err for geting user data',err);})

        axios.get('http://localhost:5000/getalluser/post', {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setpost(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[likebtnColor,followFlag])

    const likepost =(id)=>{
        setlikebtnColor(!likebtnColor)
        axios.post('http://localhost:5000/likepost',{id:id,username:localStorage.getItem('username')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
    }

    const followUser =(followuser)=>{
        setfollowFlag(!followFlag)
        axios.post('http://localhost:5000/follow',{username:localStorage.getItem('username'),followuser:followuser},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{console.log(response)})
        .catch((err)=>console.log('err',err))
    }
    
    const CommentonPost =(id)=>{
        setcommentflafID(id)
    }

  return (
    <div className='post-card' >
        {
            post.map((i)=>{
                return(
                    <div>
                    <Card>
                        <div className='card-Header'>
                            <Link to ='/nuser'><Avatar src={`images/profile1.png`} sx={{width:'90px',height:'90px',padding:0}}></Avatar></Link>
                            <div className='card-title'>
                                <Typography  sx={{fontSize:'19px' ,fontWeight:600}}>{i.caption}</Typography>
                                <span>{i.username}</span>
                                <span>Growth & user Aquisition</span><br/>
                                <IconButton sx={{marginLeft:'-10px'}}>
                                    <FavoriteIcon sx={{color:'red',}}/>
                                </IconButton>
                                <span><CalendarMonthIcon sx={{fontSize:'17px'}}/> {i.postTime}</span>
                                <span>
                                    <IconButton sx={{fontSize:'13px',color:'black'}} onClick={()=>CommentonPost(i._id)}>
                                        <ModeCommentOutlinedIcon sx={{color:'green',fontSize:'17px'}}/>Comment
                                    </IconButton>
                                </span>
                                <div className='card-content'>
                                    <div>
                                    <img src={`http://localhost:5000/static/${i.postimage}`} height='416px' width='330px' alt='post' style={{borderRadius:'10px'}}></img>
                                    { 
                                        commentflafID==i._id &&
                                        (<Comment postId ={i._id}  />)
                                    }
                                    </div>
                                    <div className='like-comment-btn'>
                                        <IconButton onClick={()=>likepost(i._id)}>
                                            {!i.postLike.includes(localStorage.getItem('username')) 
                                            ? (<FavoriteIcon  sx={{fontSize:'30px'}}/>)
                                            :(<FavoriteIcon  sx={{fontSize:'30px',color:'red'}}/>)} 
                                        </IconButton><br/>
                                        <p>{i.postLike.length}</p>
                                        <IconButton onClick={()=>CommentonPost(i._id)}>
                                            <CommentRoundedIcon/>
                                        </IconButton><br/>
                                        <p>{i.cmtArray.length}</p>
                                        <IconButton>
                                            <RedoRoundedIcon/>
                                        </IconButton><br/>
                                        <p>152</p>

                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    userdata.username != i.username && 
                                    (
                                        <>
                                        {
                                            !userdata?.following.includes(i.username) 
                                            ?(<Button sx={{border:'1px solid green',height:'30px',color:'black'}} onClick={()=>followUser(i.username)}>Follow</Button>)
                                            :(<Button sx={{border:'1px solid green',height:'30px',color:'black'}} onClick={()=>followUser(i.username)}>UnFollow</Button>)
                                        }
                                        </>
                                    )
                                }
  
                            </div>
                        </div>  
                    </Card><br/>
                    </div>
                )

            })
        }
    </div>
  )
}
