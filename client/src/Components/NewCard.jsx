import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "./CardForm";

const NewCard = ({deckItems, setError, cardItems, setCardItems, onEditDeck, deckOptions, isNewCard}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        return ()=> {setError(null)}
    }, [])
    const initialVal = {
        front_title: "",
        front_description: "",
        front_image: "",
        back_title: "",
        back_description: "",
        back_image: "",
        deck_id: null
    }
    
    function handleSubmitCard(values){
        fetch('/api/cards', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2)
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    const selectedDeck = deckItems.find(deck=>deck.id === values.deck_id)
                    data.decks.push(selectedDeck)
                    submitReview(data, values.deck_id)
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }
    function submitReview(card_data, deck_id){
        fetch('/api/reviews', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                card_id: card_data.id,
                deck_id: deck_id
            })
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    card_data.reviews.push(data)
                    setCardItems([...cardItems, card_data])
                    const newDeck = deckItems.find(deck=>deck.id===deck_id)
                    newDeck.cards.push(card_data)
                    newDeck.reviews.push(data)
                    onEditDeck(newDeck)
                    navigate('/cards')
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })          
    }
    
    return (
        <div>
            <button onClick={e => navigate('/cards')}>Back to All Cards</button>
            <CardForm onSubmitCard={handleSubmitCard} deckOptions={deckOptions} isNewCard={isNewCard} initialVal={initialVal} />
        </div>
    )
}

export default NewCard