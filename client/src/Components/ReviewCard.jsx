import React, {useState} from "react"

const ReviewCard = ({card, levelColors, review}) => {
    const [isFront, setIsFront] = useState(true)
    console.log(review)
    return (
        <div className="large_card" style={{borderColor: levelColors[0]}} onClick={e=>setIsFront(!isFront)}>
            {isFront ? <div >
                <h6>Front</h6>
                <h4>{card.front_title}</h4>
                <p>{card.front_description}</p>
                <img src={card.front_image} />
            </div> : 
            <div>
                <h6>Back</h6>
                <h4>{card.back_title}</h4>
                <p>{card.back_description}</p>
                <img src={card.back_image} />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button style={{marginRight: '20px', borderColor: 'red', backgroundColor: 'white', width: '100px'}}>
                        Wrong 
                        <p style={{fontSize: '70%'}}>(Level 1)</p>
                    </button>
                    <button style={{borderColor: 'lime', backgroundColor: 'white', width: '100px'}}>
                        Correct 
                        <p style={{fontSize:"70%"}}>(Next Level)</p>
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default ReviewCard