import { Avatar, Button, Card, IconButton, Typography } from '@mui/material'
import{Link, Navigate, useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './newest.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import axios from 'axios'
import Comment from '../comment/Comment';
import io from 'socket.io-client'
// import { useDispatch } from 'react-redux';
// import { fatchUser } from '../../../../featurs/UserSlice'; 

const ENDPOINT = "http://localhost:5000"
var socket;


export default function Newest() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const [post, setpost] = useState([])
    const [likebtnColor, setlikebtnColor] = useState(false)
    const [followFlag, setfollowFlag] = useState(true)
    const [userdata, setuserdata] = useState([])
    const [commentflafID, setcommentflafID] = useState('')

    // useEffect(()=>{
    //     socket = io(ENDPOINT)
    // },[])

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

    //---------------LIKE POST-------------
    const likepost =(postid,receiver)=>{
        setlikebtnColor(!likebtnColor)
        axios.post('http://localhost:5000/likepost',{id:postid,username:localStorage.getItem('username')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        
    }
    //---------------FOLLOW USER--------------
    const followUser =(followuser)=>{
        setfollowFlag(!followFlag)
        axios.post('http://localhost:5000/follow',{username:localStorage.getItem('username'),followuser:followuser},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{console.log(response)})
        .catch((err)=>console.log('err',err))
    }
    //------------HANDLE COMMENT---------------
    const CommentonPost =(id)=>{
        setcommentflafID(id)
    }
    //-------------SEND NOTIFICATION---------------
    const onSendNotification=(postid,receiver)=>{
        axios.post('http://localhost:5000/notification/addtonotification',{
            sender:localStorage.getItem('id'),
            receiver:receiver,
            postid:postid,
            like:true,
            Comment:false,
            commentText:'',
        },
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            console.log('notification send',response)
            // socket.emit("new notification",response.data)
        })
        .catch((err)=>{console.log(err)})
    }

  return (
    <div className='post-card' >
        {post && userdata
            ?
            (post?.map((i,index)=>{
                return(
                    <div key={index}>
                    <Card>
                        <div className='card-Header'>
                            <Button onClick={()=>{
                                localStorage.setItem('searchuser',i.username)
                                navigate('/profile')
                                }} 
                                sx={{height: 'fit-content'}}    
                            >
                                <Avatar src={`http://localhost:5000/static/${i.profileImage}`} sx={{width:'75px',height:'75px',padding:0,border:'3px solid #2E7D32'}}/>
                            </Button>
                            <div className='card-title'>
                                <Typography   sx={{fontSize:'19px' ,fontWeight:600}}>{i.caption}</Typography>
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
                                        {i.postimage.includes('.mp4')
                                        ?( <video width="330" height="416" controls autoPlay>
                                                <source src={`http://localhost:5000/static/${i.postimage}`} type="video/mp4"/>
                                            </video>)
                                        :(<img src={`http://localhost:5000/static/${i.postimage}`} height='416px' width='330px' alt='post' style={{borderRadius:'10px'}}></img>)
                                        }
                                        { 
                                            commentflafID==i._id &&
                                            (<Comment postId ={i._id} receiver={i.username} />)
                                        }
                                    </div>
                                    <div className='like-comment-btn'>
                                        
                                            {!i.postLike?.includes(localStorage.getItem('username')) 
                                            ? (<><IconButton onClick={()=>{
                                                onSendNotification(i._id,i.username)
                                                likepost(i._id,i.username)}}>
                                                    <FavoriteIcon  sx={{fontSize:'30px'}}/>
                                                </IconButton><br/>
                                                </>)
                                            :(<><IconButton onClick={()=>likepost(i._id,i.username)}>
                                                    <FavoriteIcon  sx={{fontSize:'30px',color:'red'}}/>
                                                </IconButton><br/>
                                                </>)} 
                                        
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
                                    userdata?.username != i.username && 
                                    (
                                        <>
                                        {
                                            !userdata?.following?.includes(i.username) 
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

            }))
            :(<h3>loading</h3>)
        }
    </div>
  )
}
