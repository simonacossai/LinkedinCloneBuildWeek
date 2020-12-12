import React from 'react'

import {Spinner} from 'react-bootstrap'


const Loader = () =>{
    return (
        <div className="d-flex">
            <Spinner animation="border" size="lg" variant="secondary" className="m-auto"  />
        </div>
        
    )
}

export default Loader