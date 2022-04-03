import React from 'react'

export default function WordPopUp({ words, socket,roomId,setWords }) {
    if (words.length) {
        function displayWords() {
            let array = words.map((word, index) => {
                return (
                    <p key={index} className="text-2xl bg-grey-600 p-2" onClick={() => {
                        socket.emit("chosenWord", word,roomId);
                        setWords([]);
                    }}>{word}</p>
                )
            })
            return array;
        }
        return (
            <div className="w-full h-full bg-grey-500 fixed">
                <div className="relative top-1/3 left-1/3 w-1/3 h-40 flex justify-between">
                    {displayWords()}
                </div>
            </div>
        )
    }

    else {
        return (
            ""
        )
    }






}
