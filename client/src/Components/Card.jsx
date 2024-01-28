import React from "react";

function Card({card, onViewCard, onDeleteCard}){
    
    return (
        <div className="cards">
            <h4>{card.front_title}</h4>
            <div style={{display: "flex"}}>
                <button onClick={e=>onViewCard(card)}>View</button>
                <button onClick={e=>onDeleteCard(card)}>X</button>
            </div>
        </div>
    ) 
}

export default Card