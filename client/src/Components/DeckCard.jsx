import React, {useState} from "react";


function DeckCard({deck}){
    const [isEdit, setIsEdit]=useState(false)
    const [newDeckName, setNewDeckName]=useState('')

    function handleDeckEditSubmit(e){
        e.preventDefault()
        fetch(`/api/decksById/${deck.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: newDeckName
            })
        }).then(r=> {
            if (r.ok) {
                r.json()
            }
        })
        setIsEdit(false)
    }

    function handleDeckDelete(){
        fetch(`/api/decksById/${deck.id}`, {
            method: 'DELETE'
        }).then(r=> {
            if (r.ok) {
                r.json()
            }
        })
    }

    return(
        <div style={{display: 'flex'}}>
            <li>{deck.name}</li>
            <button onClick={e=>{
                setIsEdit(!isEdit)
                setNewDeckName(deck.name)
            }}>Edit</button>
            <button onClick={handleDeckDelete}>X</button>
            {isEdit ? <form onSubmit={handleDeckEditSubmit}>
                <label>New name</label>
                <input value={newDeckName} onChange={e=>setNewDeckName(e.target.value)}></input>
                <button>Submit</button>
            </form>: null}
        </div>
    )
}

export default DeckCard
