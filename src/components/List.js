import React from 'react'
import './List.css'

export default function List({data}) {
    console.log(data)
    return (
        <div className='List'>
            {data.map((value,index)=> {
                return (
                    <div index={index} className='ListItem'>
                        <div style={{color:'grey',textAlign:'right'}}>{value.exp}=</div>
                        <div style={{color:'white',textAlign:'right'}}>{value.res}</div>
                        
                        
                        
                    </div>
                    
                )
            })}
        </div>
    )
}
