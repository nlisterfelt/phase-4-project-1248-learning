import React, {useState} from "react";
import Login from "./Login";

function Home(){

    return(
        <div>
            <h2 style={{textAlign:'center'}}>Study using spaced repitition.</h2>
            <h4 style={{textAlign:'center'}}>The cards you don't know will show up more often than the cards you do know.</h4>
            <p>Each card will have a different level assigned to it. When you go through a review session, you will be click either "Wrong" or "Correct". All wrong cards go back to level 1 for more review during the current session. Correct cards move on to the next level based on the list below.</p>
            <ul>
                <li>Level 1  -  1 session later</li>
                <li>Level 2  -  2 sessions later</li>
                <li>Level 3  -  4 sessions later</li>
                <li>Level 4  -  8 sessions later</li>
                <li>Level 5  -  16 sessions later</li>
                <li>Level 6  -  32 sessions later</li>
                <li>Level 7  -  64 sessions later</li>
                <li>Level 8  -  128 sessions later</li>
                <li>Level 9  -  248 sessions later</li>
                <li>Level 10  - Retire</li>
            </ul>
            <p>If you are reviewing a level 3 card in session 1 and get it correct, this card will go to level 4 in session 5.</p>
        </div>
    )
}

export default Home;