import { Avatar, Button, Card, CardContent, IconButton, Typography } from '@mui/material'
import { fontWeight } from '@mui/system'
import React from 'react'
import './newest.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';

const post =[
    {
        prfileImage : 'profile1.png',
        title : '11  Marketing chanel tha consistently work for Founders',
        username : 'ishan',
        caption : 'Growth & user Aquisition',
        postDate : 'April 21, 2022 at 5:15 PM',
        image : 'post1.png',
        like : '12k',
        comment : '1285',
        forward : '820',
    },
    {
        prfileImage : 'profileImage2.png',
        title : '11  Marketing chanel tha consistently work for Founders',
        username : 'ishan',
        caption : 'Growth & user Aquisition',
        postDate : 'April 21, 2022 at 5:15 PM',
        image : 'post2.png',
        like : '12k',
        comment : '1285',
        forward : '820',
    },
    {
        prfileImage : 'profileImage3.png',
        title : '11  Marketing chanel tha consistently work for Founders',
        username : 'ishan',
        caption : 'Growth & user Aquisition',
        postDate : 'April 21, 2022 at 5:15 PM',
        image : 'post3.png',
        like : '12k',
        comment : '1285',
        forward : '820',
    },
]

export default function Newest() {
  return (
    <div className='post-card' >
        {
            post.map((i)=>{
                return(
                    <div>
                    <Card>
                        <div className='card-header'>
                            <Avatar src={`images/${i.prfileImage}`} sx={{width:'90px',height:'90px',padding:0}}></Avatar>
                            <div className='card-title'>
                                <Typography  sx={{fontSize:'19px' ,fontWeight:600}}>{i.title}</Typography>
                                <span>{i.username}</span>
                                <span>{i.caption}</span><br/>
                                <IconButton sx={{marginLeft:'-10px'}}><FavoriteIcon sx={{color:'red',}}/></IconButton>
                                <span><CalendarMonthIcon sx={{fontSize:'17px'}}/> {i.postDate}</span>
                                <span><IconButton sx={{fontSize:'13px',color:'black'}} ><ModeCommentOutlinedIcon sx={{color:'green',fontSize:'17px'}}/>Comment</IconButton></span>
                                <div className='card-content'>
                                    <img src={`images/${i.image}`} height='416px' width='330px'></img>
                                    <div className='like-comment-btn'>
                                        <IconButton >
                                            <FavoriteIcon sx={{fontSize:'30px'}}/>
                                        </IconButton><br/>
                                        <p>{i.like}</p>
                                        <IconButton>
                                            <CommentRoundedIcon/>
                                        </IconButton><br/>
                                        <p>{i.comment}</p>
                                        <IconButton>
                                            <RedoRoundedIcon/>
                                        </IconButton><br/>
                                        <p>{i.forward}</p>

                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button sx={{border:'1px solid green',height:'30px',color:'black'}}>Follow</Button>
                            </div>
                        </div>  
                    </Card><br/>
                    </div>
                )

            })
        }
        {/* <Card>
            <div className='card-header'>
                <Avatar src="images/profile1.png" sx={{width:'90px',height:'90px',padding:0}}></Avatar>
                <div className='card-title'>
                    <Typography  sx={{fontSize:'19px' ,fontWeight:600}}>11  Marketing chanel tha consistently work for Founders</Typography>
                    <span>ishan</span>
                    <span>Growth & user Aquisition</span><br/>
                    <IconButton sx={{marginLeft:'-10px'}}><FavoriteIcon sx={{color:'red',}}/></IconButton>
                    <span><CalendarMonthIcon sx={{fontSize:'17px'}}/> April 21, 2022 at 5:15 PM</span>
                    <span><IconButton sx={{fontSize:'13px',color:'black'}} ><ModeCommentOutlinedIcon sx={{color:'green',fontSize:'17px'}}/>Comment</IconButton></span>
                    <div className='card-content'>
                        <img src='images/post1.png' height='416px' width='330px'></img>
                        <div className='like-comment-btn'>
                            <IconButton >
                                <FavoriteIcon sx={{fontSize:'30px'}}/>
                            </IconButton><br/>
                            <p>12k</p>
                            <IconButton>
                                <CommentRoundedIcon/>
                            </IconButton><br/>
                            <p>1150</p>
                            <IconButton>
                                <RedoRoundedIcon/>
                            </IconButton><br/>
                            <p>820</p>

                        </div>
                    </div>
                </div>
                <div>
                    <Button sx={{border:'1px solid green',height:'30px',color:'black'}}>Follow</Button>
                </div>
            </div>  
        </Card> */}
    </div>
  )
}
