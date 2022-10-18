import React from "react";

const Qualitie = ({color, name}) => {
    
    return (
    
        <div className={`badge bg-${color} m-1`}>{name}</div>
    
    )
   

}

export default Qualitie;