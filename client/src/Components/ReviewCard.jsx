import React from "react"

const ReviewCard = ({card, color, isFront, setIsFront}) => {
    return (
            <div className="large_card" style={{borderColor: color}} onClick={e=>setIsFront(!isFront)}>
            {isFront ? <div >
                <h6>Front</h6>
                <h4>{card.front_title}</h4>
                <p>{card.front_description}</p>
                <img src={card.front_image} style={{width: '90%'}}/>
            </div> : 
            <div>
                <h6>Back</h6>
                <h4>{card.back_title}</h4>
                <p>{card.back_description}</p>
                <img src={card.back_image} style={{width: '90%'}}/>
                
            </div>}
        </div>
    )
}

export default ReviewCard