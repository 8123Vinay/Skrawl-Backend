import React,{useRef, useEffect,useState,useContext} from 'react'
import { gameContext } from '../App'

export default function Canvas() {
  

  const {socket,isDrawer,roomId}=useContext(gameContext); 

  const canvasRef=useRef(null);
  const [draw, setDraw]=useState(false);
  const [ctx,setCtx]=useState(null);
  const [start,setStart]=useState({x:0, y:0})
  const [drawingType,setDrawingType]=useState(0);


  // zero is pencil
  // one is erasor
  //two is clear;
  
  // const [canvasData,setCanvasData]=useState(null);


  function emitData(drawingType,startX,startY, endX, endY){
    if(socket){
      socket.emit('canvas-data', roomId,drawingType, startX, startY, endX, endY)
    }
    
  }
  
 
 

 useEffect(()=>{
  const canvas=canvasRef.current;
  setCtx(canvas.getContext('2d'));
 
},[])

if(isDrawer){
  let array=[]
    return (
      <div id="canvas" className="absolute left-96 top-0" >
        <div id="canvas-area" >
        <canvas ref={canvasRef} width="600" height="400" className="canvas-container border-4 border-red-600 "  onMouseMove={(e)=>{
            if(ctx && draw){

              if(drawingType===1){
                ctx.strokeStyle='white'
              }

              else if(drawingType===0){
                ctx.strokeStyle="black"
              }
                ctx.lineWidth=10;
  
                ctx.lineCap="round";

                ctx.beginPath();
    
                ctx.moveTo(start.x, start.y);
    
                ctx.lineTo(e.clientX-384, e.clientY);
    
                ctx.stroke();
                // setTimeout(() => {
                  emitData(drawingType, start.x, start.y, e.clientX-384, e.clientY);
                // }, 10);

               

                // i will emit the data

              }
  
  
            setStart({x:e.clientX-384, y:e.clientY})
  
        }} onMouseDown={(e)=>{
          setDraw(true);
          
        }} onMouseUp={()=>{
          setDraw(false);
  
        }}/>
        </div>
        <div id="tools">
          <button onClick={()=>{
            setDrawingType(0)
            console.log('pencil clicked')
          }} className="w-12 h-8 bg-blue-600 text-white ">Pencil</button>
  
          <button onClick={()=>{
            setDrawingType(1)
          }} className="w-12 h-8 bg-blue-600 text-white">Erasor</button>
  
          <button className=" w-12 h-8 bg-blue-600 text-white " onClick={()=>{
            if(ctx){
              ctx.clearRect(0,0,600,400);

              // setDrawingType(2);
             
              // emitData(2, 0, 0, 600, 400);
            }
  
          }}>clear</button>
        </div>
      </div>
    )
  }

  else{

      let data=[[28, 72, 28,73],
      [28, 73, 31,76],
      [31, 76, 34,82],
      [34, 82, 46,99],
      [46, 99, 62,122],
      [62, 122, 70,135],
      [70, 135, 75,146],
      [75, 146, 78,149],
      [78, 149, 79,153],
      [79, 153, 81,155],
      [81, 155, 82,158],
      [82, 158, 83,161],
      [83, 161, 84,163],
      [84, 163, 85,164],
      [85, 164, 86,165],
      [86, 165, 86,165],
      [86, 165, 87,166],
      [87, 166, 87,166],
      [87, 166, 93,150],
      [93, 150, 97,133],
      [97, 133, 99,90],
      [99, 90, 102,65],
      [102, 65, 102,43],
      [102, 43, 102,39],
      [102, 39, 102,37],
      [121, 46, 121,46],
      [121, 46, 122,49],
      [122, 49, 131,70],
      [131, 70, 141,98],
      [141, 98, 148,117],
      [148, 117, 149,123],
      [149, 123, 149,123],
      [149, 123, 149,123],
      [116, 26, 116,26],
      [116, 26, 116,29],
      [116, 29, 119,34],
      [119, 34, 121,36],
      [121, 36, 125,37],
      [125, 37, 127,37],
      [127, 37, 129,36],
      [129, 36, 131,35],
      [131, 35, 131,31],
      [131, 31, 131,28],
      [131, 28, 130,26],
      [130, 26, 129,24],
      [129, 24, 127,23],
      [127, 23, 127,22],
      [161, 71, 161,72],
      [161, 72, 161,73],
      [161, 73, 163,80],
      [163, 80, 165,86],
      [165, 86, 166,88],
      [166, 88, 167,89],
      [167, 89, 167,90],
      [167, 90, 167,90],
      [167, 90, 168,88],
      [168, 88, 168,82],
      [168, 82, 168,76],
      [168, 76, 171,67],
      [171, 67, 176,58],
      [176, 58, 184,53],
      [184, 53, 193,53],
      [193, 53, 197,53],
      [197, 53, 200,54],
      [200, 54, 202,57],
      [202, 57, 205,63],
      [205, 63, 209,74],
      [209, 74, 216,91],
      [216, 91, 218,97],
      [218, 97, 219,100],
      [219, 100, 219,101],
      [250, 64, 250,63],
      [250, 63, 249,63],
      [249, 63, 246,64],
      [246, 64, 243,68],
      [243, 68, 240,74],
      [240, 74, 240,83],
      [240, 83, 240,90],
      [240, 90, 242,97],
      [242, 97, 246,100],
      [246, 100, 250,100],
      [250, 100, 254,99],
      [254, 99, 259,95],
      [259, 95, 268,81],
      [268, 81, 271,70],
      [271, 70, 273,53],
      [273, 53, 273,49],
      [273, 49, 273,48],
      [273, 48, 273,49],
      [273, 49, 274,57],
      [274, 57, 278,71],
      [278, 71, 282,80],
      [282, 80, 286,85],
      [286, 85, 289,86],
      [289, 86, 293,86],
      [293, 86, 297,85],
      [297, 85, 301,78],
      [301, 78, 304,65],
      [304, 65, 304,56],
      [304, 56, 304,48],
      [304, 48, 304,44],
      [304, 44, 305,44],
      [305, 44, 306,44],
      [306, 44, 315,63],
      [315, 63, 327,89],
      [327, 89, 340,134],
      [340, 134, 342,163],
      [342, 163, 340,182],
      [340, 182, 336,189],
      [336, 189, 331,190],
      [331, 190, 327,189],
      [327, 189, 320,182],
      [320, 182, 315,175],
      [315, 175, 314,170],
      [314, 170, 314,163],
      [314, 163, 316,147],
      [316, 147, 326,128],
      [326, 128, 330,122],
      ]
      if(ctx){
        ctx.lineWidth=10;
  
        ctx.lineCap="round";
        for(let i=0;i<data.length;i++){
     

          ctx.beginPath();
          ctx.strokeStyle='black'
          ctx.moveTo(data[i][0],data[i][1]);
          ctx.lineTo(data[i][2],data[i][3]);
          ctx.stroke();
      }

      }
     
        
    return(
     <div id="canvas" className="absolute left-96 top-0">
        <canvas ref={canvasRef} width="600" height="400" className="canvas-container border-4 border-green-600 text-yellow-600 ml-16" /> 
     </div>
    )
   
}
}

 


