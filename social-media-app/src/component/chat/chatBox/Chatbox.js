import React from 'react'
import ChatInput from './ChatInput'
import Message from './Message'

export default function Chatbox({chatuser}) {
  return (
    <div>Chatbox
        <Message/>
        <ChatInput chatuser={chatuser}/>
    </div>
  )
}
