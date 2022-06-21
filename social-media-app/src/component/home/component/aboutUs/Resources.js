import React from 'react'
import './resources.css'

const resources = [
    {
        image: 'resources2.jpg',
        title : 'Marketing Chanels that consistently work for founder',
        description : 'we haver analyzed all 494 founder interview on indie Hacker & uncoverd'
    },
    {
        image: 'resources1.png',
        title : 'Marketing Chanels that consistently work for founder',
        description : 'we haver analyzed all 494 founder interview on indie Hacker & uncoverd we haver analyzed all 494 founder interview on indie Hacker & uncoverd we haver analyzed all 494 founder interview on indie Hacker & uncoverd '
    },
    {
        image: 'resources2.jpg',
        title : 'Marketing Chanels that consistently work for founder',
        description : 'we haver analyzed all 494 founder interview on indie Hacker & uncoverd'
    },
]

export default function Resources() {
  return (
    <div className='resources-container'>
        <h5>Resources</h5>
        {
            resources.map((i,index)=>{
                return(
                    <div  key={index}>
                    <div className='resources-box'>
                        <div>
                            <img src={`images/${i.image}`} className='resources-img'/>
                        </div>
                        <h5>{i.title}</h5>
                       
                        <p>
                            {   
                                i.description.length > 100 
                                ? `${i.description.substring(0,100)}...`
                                :`${i.description}`
                                
                            }
                        </p>
                    </div><br/>
                    </div>
                )
            })
        }
        
    </div>
  )
}
