import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Carousel } from "react-bootstrap";

export default function UserStory() {
  const [allStory, setallStory] = useState([])
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(()=>{
    axios.post('http://localhost:5000/story/getstory',{id:localStorage.getItem('id')},{
      headers:{
          "Authorization":  localStorage.getItem('token')
      }
    }).then((response)=>{
      console.log(response.data[0].story);
      setallStory(response.data[0].story)
    })
  },[])
  return (
    <div style={{height:'540px', width:'400px'}}>
        <Carousel  activeIndex={index}
            onSelect={handleSelect}  >
          {
            allStory.map((item,index)=>{
              return(
                <Carousel.Item>
                  <img src={`http://localhost:5000/static/${item.storylist}`} height='540px' width='400px'/>
                </Carousel.Item>
              )
            })
          }
            
        </Carousel>
    </div>
  )
}
