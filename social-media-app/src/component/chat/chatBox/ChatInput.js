import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { IconButton, TextField } from '@mui/material';
import './chatinput.css'
import axios from 'axios';


export default function ChatInput({chatuser}) {

    const [emojiFlag, setemojiFlag] = useState(false)
    const [msg, setmsg] = useState('')

    const handleEmoji =()=>{
        setemojiFlag(!emojiFlag)
    }

    const addemoji=(event,emoji)=>{
        setmsg(msg+emoji.emoji)
    }

    const onSendmessage=()=>{
        console.log(chatuser);
        axios.post('http://localhost:5000/chat/addmessage',{
            from:localStorage.getItem('username'),
            to: chatuser.username,
            message : msg
            },
            {headers:{
                "Authorization":  localStorage.getItem('token')
            }}
        ).then(()=>{console.log('message send')})
        .catch((err)=>{console.log('message not send',err);})
    }
  return (
    <div className='chat-input-container'>
        <div>
            <IconButton onClick={handleEmoji}>
                <EmojiEmotionsRoundedIcon className='chat-emoji'/>
            </IconButton>
                {emojiFlag && (<Picker onEmojiClick={addemoji}/>)}
        </div>
        <div className='input-box'>
            <input type='text' className='chat-input-tag' placeholder='Type a message' value={msg} onChange={(e)=>setmsg(e.target.value)}/>
            <IconButton onClick={onSendmessage}>
                <SendIcon/>
            </IconButton>
        </div>
    </div>
  )
}
