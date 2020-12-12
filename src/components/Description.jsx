import React from 'react'

const Description = (props) => {
    return (
        <p style={{color: "black", textDecoration:"none" , width:"150px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{props.description}</p>
    )
}

export default Description