import { Avatar, Button, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import{Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import axios from 'axios'
import Comment from '../home/component/comment/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import {useSelector} from 'react-redux'



export default function DisplayPost() {
    const username = localStorage.getItem('searchuser')

    const [post, setpost] = useState([])
    const [likebtnColor, setlikebtnColor] = useState(false)
    const [commentflafID, setcommentflafID] = useState('')
    const [followFlag, setfollowFlag] = useState(true)
    const [userdata, setuserdata] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    //--------------HANDLE DELET BUTTON----------
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
        axios.post('http://localhost:5000/getalluser/userprofile',{username:localStorage.getItem('username')},{headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{setuserdata(response.data.data[0]);})
        .catch((err)=>{console.log('err for geting user data',err);})

        axios.post('http://localhost:5000/getalluser/userpost',{username:username}, {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setpost(response.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[likebtnColor,followFlag])

    //------------LIKE POST-----------------
    const likepost =(id)=>{
        setlikebtnColor(!likebtnColor)
        axios.post('http://localhost:5000/likepost',{id:id,username:localStorage.getItem('username')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
    }
    //------------FOLLOW USER---------------
    const followUser =(followuser)=>{
        setfollowFlag(!followFlag)
        axios.post('http://localhost:5000/follow',{username:localStorage.getItem('username'),followuser:followuser},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{console.log(response)})
        .catch((err)=>console.log('err',err))
    }

    //-------------DELETE POST--------------
    const onDelete =(id)=>{
        console.log(id);
        axios.post('http://localhost:5000/updateprofile/deletepost',{id:id},{
            headers:{
                "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{console.log(response)})
        .catch((err)=>console.log(err))
    }
    //---------HANDLE COMMENT--------------
    const CommentonPost =(id)=>{
        setcommentflafID(id)
    }

  return (
    <div className='post-card' >
        {post
            ?
            (post?.map((i,index)=>{
                return(
                    <div key={index}>
                    <Card>
                        <div className='card-Header'>
                            <Link to ='/nuser'><Avatar src={`http://localhost:5000/static/${i.profileImage}`} sx={{width:'75px',height:'75px',padding:0,border:'3px solid #2E7D32'}}></Avatar></Link>
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
                                        {i.postimage.includes('.mp4')
                                            ?( <video width="330" height="416" controls >
                                                    <source src={`http://localhost:5000/static/${i.postimage}`} type="video/mp4"/>
                                                </video>)
                                            :(<img src={`http://localhost:5000/static/${i.postimage}`} height='416px' width='330px' alt='post' style={{borderRadius:'10px'}}></img>)
                                        }
                                        { 
                                            commentflafID==i._id &&
                                            (<Comment postId ={i._id}  />)
                                        }
                                    </div>
                                    <div className='like-comment-btn'>
                                        <IconButton onClick={()=>likepost(i._id)}>
                                            {!i.postLike?.includes(localStorage.getItem('username')) 
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
                                {localStorage.getItem('username')===localStorage.getItem('searchuser')
                                    ?(<><IconButton onClick={handleClick}>
                                            <MoreHorizIcon/>
                                        </IconButton>
                                        <Menu 
                                            id="long-menu"
                                            MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                            style: {
                                                boxShadow:'0px 0px',
                                                border:'1px solid rgb(233, 233, 233)',
                                                borderRadius:'8px',
                                                width: '110px',
                                                marginLeft:'-60px',
                                                
                                            },
                                            }}
                                        >
                                            <MenuItem onClick={()=>onDelete(i._id)}><DeleteIcon sx={{color:'rgba(160, 160, 160, 0.884)',marginRight:'10px',fontSize:'20px'}}/>  delete</MenuItem>
                                            {/* <MenuItem><EditIcon sx={{color:'rgba(160, 160, 160, 0.884)',marginRight:'10px',fontSize:'20px'}}/> edit</MenuItem> */}
                                        </Menu></>)
                                    :(<div>
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
          
                                    </div>)

                                }
                                

                            </div>
                            
                        </div>  
                    </Card><br/>
                    </div>
                )

            }))
            :(<h3>loadin</h3>)
        }
    </div>
  )
}
