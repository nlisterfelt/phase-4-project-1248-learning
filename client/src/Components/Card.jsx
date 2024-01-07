import React, {useState} from "react";

function Card({card, cardItems, setCardItems}){
    const [isEdit, setIsEdit]=useState(false)

    function handleDelete(id){
        fetch(`/api/cards/${id}`, {
            method: 'DELETE'
        }).then(r=>{
            if (r.ok){
                setCardItems(cardItems=>cardItems.filter(item=>item.id !== id))
            }
        })
    }

    return (
        <div className="cards">
            <h4>{card.front_title}</h4>
            <div style={{display: "flex"}}>
                <button>Edit</button>
                <button onClick={e=>handleDelete(card.id)}>X</button>
            </div>
        </div>
    ) 
}

export default Card