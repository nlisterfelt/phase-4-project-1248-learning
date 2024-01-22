import React from "react";
import Select from "react-select"

const DeckForm = ({deckOptions}) => {

    return (
        <div style={{display: 'flex'}}>
            <label>Add this card to another deck: </label>
            <Select />
        </div>
    )
}

export default DeckForm