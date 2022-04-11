import React from 'react'

export default function WordPopUp({ words, socket,roomId,setWords,choosingWord,drawerId }) {
   

    if(choosingWord){
        if (words.length) {
            function displayWords() {
                let array = words.map((word, index) => {
                    return (
                        <p key={index} className="text-2xl  p-2" onClick={() => {
                            socket.emit("chosenWord", word,roomId);
                            setWords([]);
                        }}>{word}</p>
                    )
                })
                return array;
            }
            return (
                <div className="w-full h-full bg-slate-600">
                    <div className="relative top-1/3 left-1/3 w-1/3 h-40 flex justify-between">
                        {displayWords()}
                    </div>
                </div>
            )
        }
    
        else {

            return (
                <div className="absolute w-full h-full -z-1 bg-slate-600">
                    <h1 className="relative top-1/3 left-1/3 text-2xl">Now {drawerId} is ChoosingWord</h1>
                </div>
            )
        }
    }

    else{
        return(
            ""
        )
    }
   






}