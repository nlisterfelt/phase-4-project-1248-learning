import React from "react";

function Home({levelColors, sessionAdvances}){
    const levelInfo = sessionAdvances
        .filter(level=>sessionAdvances.indexOf(level)!==sessionAdvances.length-1)
        .map(level=><li key={sessionAdvances.indexOf(level)+1} style={{textDecoration: 'underline', textDecorationColor: levelColors[sessionAdvances.indexOf(level)+1]}}>Level {sessionAdvances.indexOf(level)+1}  -  {sessionAdvances[sessionAdvances.indexOf(level)]} session later</li>)
    return(
        <div>
            <h2 style={{textAlign:'center'}}>Study using spaced repetition.</h2>
            <h4 style={{textAlign:'center'}}>The cards you don't know will show up more often than the cards you do know.</h4>
            <p>Each card will have a different level assigned to it. When you go through a review session, you will click either "Wrong" or "Correct". All wrong cards go back to level 1 for more review during the current session. Correct cards move on to the next level based on the list below.</p>
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <ul style={{fontSize: 'large'}}>
                    {levelInfo}
                    <li style={{textDecoration: 'underline', textDecorationColor: levelColors[sessionAdvances.length-1]}}>Level {sessionAdvances.length}  -  Retire card</li>
                </ul>
            </div>
            <p>If you are reviewing a level 3 card in session 1 and get it correct, this card will go to level 4 in session 5.</p>
        </div>
    )
}

export default Home;