import React, {useState} from "react"

const ReviewCard = ({card, levelColors, review, onCorrectReview, onWrongReview}) => {
    const [isFront, setIsFront] = useState(true)
    return (
            <div className="large_card" style={{borderColor: levelColors[review.level]}} onClick={e=>setIsFront(!isFront)}>
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
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={e=>onWrongReview(review)} style={{marginRight: '20px', borderColor: 'red', backgroundColor: 'white', width: '100px'}}>
                        Wrong 
                        <p style={{fontSize: '70%'}}>(Level 1)</p>
                    </button>
                    <button onClick={e=>onCorrectReview(review)} style={{borderColor: 'lime', backgroundColor: 'white', width: '100px'}}>
                        Correct 
                        <p style={{fontSize:"70%"}}>(Next Level {review.level+1})</p>
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default ReviewCard