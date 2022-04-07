import React,{useRef, useEffect,useState,useContext} from 'react'
import { gameContext } from '../App'



// I will have 2 functions canvas for drawer and canvas for the guesser;



export default function Canvas({isDrawer, setIsDrawer}) {
  

  const {socket,roomId}=useContext(gameContext); 
 
  const canvasRef=useRef(null);
  const [draw, setDraw]=useState(false);
  const [ctx,setCtx]=useState(null);
  const [start,setStart]=useState({x:0, y:0})
  const [drawingType,setDrawingType]=useState(0);
  const {innerWidth}=window;
  const [offset,setOffsets]=useState({});
  const [canvasSize,setCanvasSize]=useState(0);
  



  function emitData(drawingType,startX,startY, endX, endY,canvasSize){
    if(socket){
      socket.emit('canvas-data', roomId,drawingType, startX, startY, endX, endY, canvasSize);
    }
    
  }



//  I will choose word and If I get it within 10Sec I will change other I will not change




  socket.on("usersInfo", usersInfo => {
    if(ctx){
      ctx.clearRect(0,0,600,400);
      console.log('we have receieved clear Canvas')
    }
  }
  )


 useEffect(()=>{
  const canvas=canvasRef.current;
  setCtx(canvas.getContext('2d'));


  
  if(innerWidth>840){
    let width=Math.min(600, innerWidth-640);
    canvas.width=width;
    canvas.height=width;

  
  }

  setCanvasSize(canvas.width);
  setOffsets({left:canvas.offsetLeft, top:canvas.offsetTop});

},[isDrawer])

if(isDrawer){
    return (
      <div id="canvas" className="" >
        {/* <WordPopUp socket={socket} words={words} roomId={roomId} setWords={setWords}/> */}
        {/* <p className="text-2xl text-center">{wordToGuess}</p> */}
        <div id="canvas-area" >
        <canvas ref={canvasRef} width="200" height="200" className="canvas-container border-4 border-red-600 "  onMouseMove={(e)=>{
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

                emitData(drawingType, start.x, start.y, e.clientX-offset.left, e.clientY-offset.top, canvasSize);
    
                ctx.moveTo(start.x, start.y);
    
                ctx.lineTo(e.clientX-offset.left, e.clientY-offset.top);
    
                ctx.stroke();
       

              }
  
     
              setStart({x:e.clientX-offset.left, y:e.clientY-offset.top})

  
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
              // console.log(canvas.width, canvas.height,"This is clear canvas function")
              ctx.clearRect(0, 0, canvasSize, canvasSize);
             
              emitData(2, 0, 0, canvasSize, canvasSize, canvasSize);
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
          let drawerCanvasSize=data[0][5];
          ctx.lineWidth=10;
          ctx.lineCap="round";
          for(let i=0;i<data.length;i++){
            if(data[i][0]===1){
              ctx.beginPath();
              ctx.strokeStyle='white'
              // get your canvas width 
              ctx.moveTo((data[i][1])*(canvasSize)/drawerCanvasSize, (data[i][2])*(canvasSize)/drawerCanvasSize );
              ctx.lineTo((data[i][3])*(canvasSize)/drawerCanvasSize,  (data[i][4])*(canvasSize)/drawerCanvasSize);
              ctx.stroke();
            }

            else if(data[i][0]===2){
              ctx.clearRect((data[i][1])*(canvasSize)/drawerCanvasSize, (data[i][2])*(canvasSize)/drawerCanvasSize, (data[i][3])*(canvasSize)/drawerCanvasSize, (data[i][4])*(canvasSize)/drawerCanvasSize)
              // this is clear all function
            }
            else{
              ctx.beginPath();
              ctx.strokeStyle='black'
              ctx.moveTo((data[i][1])*(canvasSize)/drawerCanvasSize, (data[i][2])*(canvasSize)/drawerCanvasSize );
              ctx.lineTo((data[i][3])*(canvasSize)/drawerCanvasSize,  (data[i][4])*(canvasSize)/drawerCanvasSize);
              ctx.stroke();
              // this is normal drawing
            }
           
          }
        }

          
     }
  )

 
}
    return(
      <div className="">
      {/* <p className="text-2xl text-center">{wordToGuess}</p> */}
         <canvas ref={canvasRef} width="200" height="200" className="canvas-container border-4 border-red-600 " />
      </div>
    )
  }
}

   



