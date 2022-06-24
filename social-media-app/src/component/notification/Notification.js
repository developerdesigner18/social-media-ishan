import { Avatar, Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import io from 'socket.io-client'
import {useDispatch} from 'react-redux';
import { getnotification } from '../../featurs/UserSlice' 

const ENDPOINT = "http://localhost:5000"
var socket

export default function Notification() {
    const dispatch= useDispatch()

    const navigate= useNavigate()
    const [notification, setnotification] = useState([])
    const [flag, setflag] = useState(false)


    //  useEffect(()=>{
    //     socket = io(ENDPOINT)
    // },[])
    // useEffect(()=>{
    //     console.log('hello');
    //     socket.on("send notification",(data)=>{
    //         console.log('socket work');
    //         alert('new notification')
    //         setnotification([...notification,data])
    //     })
        
        
    // })
    // socket.on("send notification",(data)=>{
    //     console.log('socket work');
    //     alert('new notification')
    //     setnotification([...notification,data])
    // })

    useEffect(()=>{
        axios.post('http://localhost:5000/notification/fatchnotification',{username:localStorage.getItem('username')},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }}).then((response)=>{
            
            setnotification(response.data)

            dispatch(getnotification({numberofnotification:response.data.length}))
        })
        .catch((err)=>{console.log(err);})
    },[flag])

   const clearNotification=()=>{
    axios.post('http://localhost:5000/notification/clearnotification',{receiver:localStorage.getItem('username')})
    .then(()=>{setflag(!flag)})
    .catch((err)=>{console.log(err)})
   }
    
  return (
    <div >
        <div style={{display:'flex',justifyContent:'space-between'}}>
            
        <h3>Notification</h3>
        {notification.length>0 && (<h6 onClick={clearNotification} style={{color:'#2e7d32'}}>Clear Notification</h6>)}
        
        </div>
        {
         notification.map((i,index)=>{
            return(
                <Box sx={{ borderBottom: 1, borderColor: '#cecece',display:'flex', margin:1,width:'70%'}} key={index}>
                    <div onClick={()=>{
                        localStorage.setItem('searchuser',i.sender.username)
                        navigate('/profile')
                        }} >
                        <Avatar src={`http://localhost:5000/static/${i.sender.profileImage}`}  alt='profile' sx={{height:'60px',width:'60px',border : ' 3px solid #2E7D32',margin:'5px'}}></Avatar>
                    </div> 
                    <div onClick={()=>{
                        localStorage.setItem('searchuser',i.sender.username)
                        navigate('/profile')
                        }} 
                        style={{textAlign:'left',width:'70%'}}    
                        >
                        <span style={{fontSize:'21px',fontWeight:500}}>{i.sender.username}</span>
                        {
                            i.like && (<>
                            <span style={{fontSize:'17px',marginLeft:'20px',fontWeight:500,color:'#626362'}}>Like you post</span>
                            <p style={{fontSize:'13px',margin:0}}>{i.sender.bio}</p>
                            </>)
                        }
                        {
                            i.comment &&(<>
                            <span style={{fontSize:'17px',marginLeft:'20px',fontWeight:500,color:'#626362'}}>Comment you post</span>
                            <p style={{fontSize:'13px',margin:0}}>{i.commentText}</p>
                            </>)
                        }
                        
                        <p style={{fontSize:'13px',fontWeight:600}}>{moment(i.createdAt).startOf('ss').fromNow()}</p>
                    </div> 
                    <div>
                        <img src={`http://localhost:5000/static/${i.postid.postimage}`} height='80px'width='80px'/>
                    </div>    
                </Box>
            )
            
         })   
        }
        
    </div>
  )
}
