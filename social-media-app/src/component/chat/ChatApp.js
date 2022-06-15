import React, { useState } from 'react'
import './chatapp.css'
import Chatbox from './chatBox/Chatbox'
import Displayuser from './displayUser/Displayuser'

export default function ChatApp() {
    const [chatuser, setchatuser] = useState('')
    
    const handlechatUser=(value)=>{
        setchatuser(value)
        console.log('hello to chat user',chatuser);
    }
  return (
    <div className='chat-app'>
        <div className='display-user'>
            <Displayuser handlechatUser={handlechatUser}/>
        </div>
        <div className='chat-box'>
            {!chatuser 
            ?(<h1>welcome</h1>)
            :(<Chatbox chatuser={chatuser}/>)
            }
        </div>
    </div>
  )
}
