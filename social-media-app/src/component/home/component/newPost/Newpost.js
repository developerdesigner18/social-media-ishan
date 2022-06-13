import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import './newpost.css'
import axios from 'axios'


export default function Newpost({handleClose}) {

  const [postimage, setpostimage] = useState({})
  const [imageflag, setimageflag] = useState(false)
  const [caption, setcaption] = useState('')


  const onSubmitpost =(e)=>{
    e.preventDefault()
    var today  = new Date()
    var formdata = new FormData()
    formdata.append('username',localStorage.getItem('username'))
    formdata.append('postTime',today.getFullYear() + '-' + today.toLocaleString('en-us', { month: 'long' }) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes())
    formdata.append('caption',caption)
    formdata.append('postimage',postimage)

    axios.post('http://localhost:5000/addpost',formdata,{
      headers:{
          "Authorization":  localStorage.getItem('token')
      }
  })
  .then((response)=>{
    console.log('post uploaded',response);
  })
  .catch((err)=>{
    console.log('err',err);
  })

    
    
  }
  return (
    <div className='add-post-box'> 
      <Typography variant='h4'>Add new post</Typography><br/>
      <form method='post' onSubmit={onSubmitpost}>
          <TextField label="caption" size='small'  margin="dense" sx={{width:'80%'}} onChange={(e)=>setcaption(e.target.value)}></TextField>
          <div className='image-container'>
            {imageflag 
            ? (<img className='upload-image' src={URL.createObjectURL(postimage)} height='100%' width='100%'/>) 
            :(<div className='alt-image-container'></div>)}
            <TextField  type='file' variant="standard" name="postimage" 
              onChange={(e)=>{
                setpostimage(e.target.files[0])
                setimageflag(true)
              }} />
            <br/>
          <Button variant='contained' sx={{width:'30%',marginRight:1}} type='submit'>Post</Button>
          <Button variant='contained' sx={{width:'30%',margin:1}} onClick={()=>handleClose()}>Cancel</Button>            
          </div>
      </form>
    </div>
  )
}
