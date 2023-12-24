import React from "react";

function Card({card}){

    return (
        <div className="cards">
            <h4>{card.front_title}</h4>
            <div style={{display: "flex"}}>
                <button>Edit</button>
                <button>X</button>
            </div>
        </div>
    ) 
}

export default Card