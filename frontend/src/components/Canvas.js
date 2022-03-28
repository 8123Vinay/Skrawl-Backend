import React,{useRef, useEffect,useState,useContext} from 'react'
import { gameContext } from '../App'



// I will have 2 functions canvas for drawer and canvas for the guesser;



export default function Canvas() {
  

  const {socket,roomId}=useContext(gameContext); 
  const [isDrawer,setIsDrawer]=useState(false);
  const canvasRef=useRef(null);
  const [draw, setDraw]=useState(false);
  const [ctx,setCtx]=useState(null);
  const [start,setStart]=useState({x:0, y:0})
  const [drawingType,setDrawingType]=useState(0);

 



  function emitData(drawingType,startX,startY, endX, endY){
    if(socket){
      socket.emit('canvas-data', roomId,drawingType, startX, startY, endX, endY);
    }
    
  }
  socket.on('setDrawer',(word)=>
  {
    // console.log("We have got the wordToGuess Here")
    
      setIsDrawer(true);

  })

  socket.on('removeDrawer',(word)=>{
    // console.log('we have got remove drawer')
    setIsDrawer(false);
  })

  socket.on('clear-canvas',()=>{
    if(ctx){
      ctx.clearRect(0,0,600,400);
    }
    
    console.log('we have clear Rectangle')
  })
 
 

 useEffect(()=>{
  const canvas=canvasRef.current;
  setCtx(canvas.getContext('2d'));

  

},[isDrawer])

if(isDrawer){


    return (
      <div id="canvas" className="absolute left-96 top-0" >
        <div id="canvas-area" >
        <canvas ref={canvasRef} width="600" height="400" className="canvas-container border-4 border-red-600 "  onMouseMove={(e)=>{
            if(ctx && draw){
              if(drawingType==0){
                ctx.strokeStyle='black';
              }
              else if(drawingType==1){
                ctx.strokeStyle='white';
              }
 
              console.log('we are in mouseover here') 
              ctx.lineWidth=10;
  
               ctx.lineCap="round"

               ctx.beginPath();

               emitData(drawingType, start.x, start.y, e.clientX-384, e.clientY);
    
                ctx.moveTo(start.x, start.y);
    
                ctx.lineTo(e.clientX-384, e.clientY);
    
                ctx.stroke();
       

              }
  
     
              setStart({x:e.clientX-384, y:e.clientY})

  
        }} onMouseDown={(e)=>{
          setDraw(true);
          console.log('we are drawing')
          
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
             
              emitData(2, 0, 0, 600, 400);
            }
  
          }}>clear</button>
        </div>
      </div>
    )
  }



else{


    if(socket){
      socket.on('canvas-data',(data)=>{
        if(ctx){
          ctx.lineWidth=10;
          ctx.lineCap="round";
          for(let i=0;i<data.length;i++){
            if(data[i][0]===1){
              ctx.beginPath();
              ctx.strokeStyle='white'
              ctx.moveTo(data[i][1],data[i][2]);
              ctx.lineTo(data[i][3],data[i][4]);
              ctx.stroke();
            }

            else if(data[i][0]===2){
              ctx.clearRect(data[i][1],data[i][2],data[i][3],data[i][4])
              // this is clear all function
            }
            else{
              ctx.beginPath();
              ctx.strokeStyle='black'
              ctx.moveTo(data[i][1],data[i][2]);
              ctx.lineTo(data[i][3],data[i][4]);
              ctx.stroke();
              // this is normal drawing
            }
           
          }
        }

          
     }
  )

 
}
    return(
      <div className="absolute left-96 top-0">
         <canvas ref={canvasRef} width="600" height="400" className="canvas-container border-4 border-red-600 " />
      </div>
    )
  }
}

   



