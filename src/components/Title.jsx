import React from 'react'

const Title = (props) => {
    return (
    <h3 style={{fontSize :"1.2rem", textDecoration:"none", width:"150px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{props.title}</h3>
    )
}

export default Title