import React from "react";

function Home({levelColors}){

    return(
        <div>
            <h2 style={{textAlign:'center'}}>Study using spaced repetition.</h2>
            <h4 style={{textAlign:'center'}}>The cards you don't know will show up more often than the cards you do know.</h4>
            <p>Each card will have a different level assigned to it. When you go through a review session, you will be click either "Wrong" or "Correct". All wrong cards go back to level 1 for more review during the current session. Correct cards move on to the next level based on the list below.</p>
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <ul style={{fontSize: 'large'}}>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[0]}}>Level 1  -  1 session later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[1]}}>Level 2  -  2 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[2]}}>Level 3  -  4 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[3]}}>Level 4  -  8 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[4]}}>Level 5  -  16 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[5]}}>Level 6  -  32 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[6]}}>Level 7  -  64 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[7]}}>Level 8  -  128 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[8]}}>Level 9  -  248 sessions later</li>
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[9]}}>Level 10  - Retire</li>
                </ul>
            </div>
            <p>If you are reviewing a level 3 card in session 1 and get it correct, this card will go to level 4 in session 5.</p>
        </div>
    )
}

export default Home;