import React, {useContext} from 'react'
import {gameContext} from '../App.js';

export default function EndGame(){
    const {usersInfo}=useContext(gameContext);
    function showScores(usersInfo){
        let array=[];
        array=usersInfo.map((user,i)=>{
              return(
                <div key={user[0]} className='grid grid-col-2'>
                  <img src={`https://robohash.org/${i}`} className={` w-16 h-16 `} alt='this is avatar'/>
                  <p className="text-2xl"># {i+1}</p>  
                  <p className="col-start-1 col-end-3">{user[1].userName}</p>
                </div>
              )
           }
           
        )
        return array;
    }


    return(
        <div className="fixed bg-black opacity-50 top-0 left-0 flex flex-col justify-center items-center text-bold w-full h-full">
        <p className="text-white text-2xl text-bold">Scores of the Game</p>
           {showScores(usersInfo)}
        </div>
    )
}