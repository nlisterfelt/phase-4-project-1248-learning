import React, { useContext } from "react"
import { CardContext } from "../context/CardContext"

const ReviewCard = ({card, color}) => {
    const {isFront, setIsFront}=useContext(CardContext)
    return (
            <div className="large_card" style={{borderColor: color}} onClick={e=>setIsFront(!isFront)}>
            {isFront ? <div >
                <h6>Front</h6>
                <h4>{card.front_title}</h4>
                <p>{card.front_description}</p>
                <img src={card.front_image} style={{width: '70%'}}/>
            </div> : 
            <div>
                <h6>Back</h6>
                <h4>{card.back_title}</h4>
                <p>{card.back_description}</p>
                <img src={card.back_image} style={{width: '70%'}}/>
                
            </div>}
        </div>
    )
}

export default ReviewCard