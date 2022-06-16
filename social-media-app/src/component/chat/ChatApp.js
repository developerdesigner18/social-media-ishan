import React, { useEffect, useState } from 'react'
import './chatapp.css'
import Message from './chatBox/Message'
import Displayuser from './displayUser/Displayuser'
import Picker from 'emoji-picker-react'
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { Button, IconButton, TextField } from '@mui/material';
import axios from 'axios';


export default function ChatApp() {
    const [chatuser, setchatuser] = useState('')
    const [emojiFlag, setemojiFlag] = useState(false)
    const [msg, setmsg] = useState('')
    const [chatId, setchatId] = useState('')
    const [allmsgFlag, setallmsgFlag] = useState(false)
    const [allmsg, setallmsg] = useState([])

    useEffect(()=>{
        axios.post('http://localhost:5000/chat/fetchmessage',{chatId:chatId},
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setallmsg(response.data)
            console.log(response.data);
        })
    },[chatId,allmsgFlag])

    const handleEmoji =()=>{
        setemojiFlag(!emojiFlag)
    }

    const addemoji=(event,emoji)=>{
        setmsg(msg+emoji.emoji)
    }

    const handlechatUser=(value)=>{
        setchatuser(value) 
    }
    
    const onStartconversation =()=>{
        
        console.log('hello to chat user',chatuser);
        chatuser && axios.post('http://localhost:5000/chat/creatchat',{
            userid:localStorage.getItem('id'),
            chatuserid: chatuser._id,
            },
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }}
        ).then((response)=>{
            setchatId(response.data._id)
            console.log('chat created',response)
        })
        .catch((err)=>{console.log('chat not created',err);})
        console.log(chatId,'chat id');
    }
    
    const onSendmessage=()=>{
        setallmsgFlag(!allmsgFlag)
        axios.post('http://localhost:5000/chat/sendmessage',{
            userid:localStorage.getItem('id'),
            chatId: chatId,
            content: msg
        },
        {headers:{
            "Authorization":  localStorage.getItem('token')
        }})
        .then((response)=>{
            setmsg('')
            console.log(response)}
        )  
        .catch((err)=>{console.log('err to send message',err);}) 
    }
    

  return (
    <div className='chat-app'>
        <div className='display-user'>
            <Displayuser handlechatUser={handlechatUser}/>
        </div>
        <div className='chat-box'>
            {!chatuser 
            ?(<h1>Welcome</h1>)
            :(<>
                <Message messages={allmsg}/>
                <div className='chat-input-container'>
                    <div>
                        <IconButton onClick={handleEmoji}>
                            <EmojiEmotionsRoundedIcon className='chat-emoji'/>
                        </IconButton>
                            {emojiFlag && (<Picker onEmojiClick={addemoji}/>)}
                    </div>
                    <div className='input-box'>
                        <input type='text' className='chat-input-tag' placeholder='Type a message' value={msg}
                            onClick={onStartconversation}
                        onChange={(e)=>setmsg(e.target.value)}/>
                        <IconButton onClick={onSendmessage}>
                            <SendIcon/>
                        </IconButton>
                    </div>
                </div>
            </>)
            }
        </div>
    </div>
  )
}
