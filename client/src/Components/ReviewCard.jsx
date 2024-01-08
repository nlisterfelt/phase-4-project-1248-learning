import React, {useState} from "react"

const ReviewCard = ({card}) => {
    const [isFront, setIsFront] = useState(true)

    return (
        <div>
            {isFront ? <div className="large_card">
                <h6>Front</h6>
                <h4>{card.front_title}</h4>
                <p>{card.front_description}</p>
                <img src={card.front_image} />
            </div> : 
            <div className="large_card">
                <h6>Back</h6>
                <h4>{card.back_title}</h4>
                <p>{card.back_description}</p>
                <img src={card.back_image} />
            </div>}
            <button onClick={e=>setIsFront(!isFront)}>Flip</button>
        </div>
    )
}

export default ReviewCard