import React from 'react'

export default function WordPopUp({ words, socket,roomId,setWords,choosingWord,drawerId }) {
    if(choosingWord){
        if (words.length) {
            function displayWords() {
                let array = words.map((word, index) => {
                    return (
                        <p key={index} className="text-2xl p-4 text-black bg-white rounded-lg" onClick={() => {
                            socket.emit("chosenWord", word,roomId);
                            setWords([]);
                        }}>{word}</p>
                    )
                })
                return array;
            }
            return (
                <div className="w-screen h-screen flex items-center justify-center gap-4 opacity-60 fixed top-0 left-0">
                    <div className="">
                        {displayWords()}
                    </div>
                </div>
            )
        }
    
        else {

            return (
                <div className="absolute w-full h-full -z-1 bg-black opacity-60 text-white fixed top-0 left-0">
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
