import React, {useContext} from 'react'
import {gameContext} from '../App.js';

export default function EndGame(){
    const {usersInfo}=useContext(gameContext);
    function showScores(usersInfo){
        let array=[];
        array=usersInfo.map((user,i)=>{
            let bgColour="bg-slate-300";

            if(i%2){
              bgColour="bg-slate-200"
            }
              return(
                <div key={user[0]} className={`${bgColour} h-16 flex justify-between text-white`}>
                  <p className="text-2xl"># {i+1}</p>  
                <div className="flex-flex-col items-center">
                  <p className="text-xl">{user[1].userName}</p>
                  <p className="text-xl">Score:{user[1].score}</p>
                </div>
                <img src={`https://robohash.org/${i}`} className={` w-16 h-16 `} alt='this is avatar'/>
             </div>
              )
           }
           
        )
        return array;
    }


    return(
        <div className="fixed bg-black opacity-50 top-0 left-0 flex flex-col justify-center items-center text-bold w-full h-full">
        <p>This is the End of the game</p>
           {showScores(usersInfo)}
        </div>
    )
}