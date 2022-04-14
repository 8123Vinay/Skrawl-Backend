import React, { useContext } from 'react';
import { gameContext } from '../App'
export default function ShowScore({roundScore}) {
    const { wordToGuess} = useContext(gameContext);
    function displayScores(roundScore){
        let array=[];

       array=roundScore.map((user,i)=>{
            return(
                <h1 className={`text-white text-2xl w-full text-center opacity-100 z-10`} key={i}>
                    {user[1].userName}:+{user[1].score}
                </h1>
            )
        })
        return array;
    }

    return (
        <div className="w-full h-full fixed top-0 left-0 fixed bg-black opacity-60 flex flex-col text-bold justify-center items-center z-1">
            <h1>
               The word is {wordToGuess}
            </h1>
            <h2 className="text-2xl">Players Scores</h2>
          <div>
              {displayScores(roundScore)}
          </div>
        </div>
    )
}