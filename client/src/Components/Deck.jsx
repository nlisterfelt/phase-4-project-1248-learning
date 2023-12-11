import React, {useState} from "react";

function Deck(){
    const [deckName, setDeckName]=useState("")
    
    function handleSubmit(e){
        e.preventDefault()
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Create a new deck of cards.</h4>
                <div>
                    <label>Name</label>
                    <input type='text' id='deck_name' value={deckName} onChange={e => setDeckName(e.target.value)}/>
                </div>
                <button type="Submit">Create</button>
            </form>
        </div>
    )
}

export default Deck