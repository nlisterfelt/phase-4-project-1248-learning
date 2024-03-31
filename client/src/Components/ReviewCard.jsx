import React, { useContext } from "react"
import { CardContext } from "../context/CardContext"

const ReviewCard = () => {
    const {isFront, setIsFront, reviewCard, levelColors, currentReview}=useContext(CardContext)
    const color = levelColors[currentReview.level]
    return (
            <div className="large_card" style={{borderColor: color}} onClick={e=>setIsFront(!isFront)}>
            {isFront ? <div >
                <h6>Front</h6>
                <h4>{reviewCard.front_title}</h4>
                <p>{reviewCard.front_description}</p>
                <img src={reviewCard.front_image} style={{width: '70%'}}/>
            </div> : 
            <div>
                <h6>Back</h6>
                <h4>{reviewCard.back_title}</h4>
                <p>{reviewCard.back_description}</p>
                <img src={reviewCard.back_image} style={{width: '70%'}}/>
                
            </div>}
        </div>
    )
}

export default ReviewCard