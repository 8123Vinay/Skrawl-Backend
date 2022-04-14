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
  
  function drawingByMouse(e){
    if(ctx && draw){
      if(drawingType==0){
        ctx.strokeStyle='black';
      }

      else if(drawingType==1){
        ctx.strokeStyle='white';
      }

  
      ctx.lineWidth=2;

       ctx.lineCap="round"

       ctx.beginPath();

        emitData(drawingType, start.x, start.y, e.clientX-offset.left, e.clientY-offset.top, canvasSize);

        ctx.moveTo(start.x, start.y);

        ctx.lineTo(e.clientX-offset.left, e.clientY-offset.top);

        ctx.stroke();


      }


      setStart({x:e.clientX-offset.left, y:e.clientY-offset.top})
  }

 function drawingOnMobile(e){
  if(ctx){
    if(drawingType==0){
      ctx.strokeStyle='black';
     
    }

    else if(drawingType==1){
      ctx.strokeStyle='white';
     
    }
    ctx.lineWidth=2;
    
     socket.emit('mouse', 'mouse touch Receieved');

     ctx.lineCap="round"

     ctx.beginPath();

     emitData(drawingType, start.x, start.y, e.touches[0].clientX-offset.left, e.touches[0].clientY-offset.top, canvasSize);

     ctx.moveTo(start.x, start.y);

     ctx.lineTo(e.touches[0].clientX-offset.left, e.touches[0].clientY-offset.top);

     ctx.stroke();



    setStart({x:e.touches[0].clientX-offset.left, y:e.touches[0].clientY-offset.top})
 }
}

  function emitData(drawingType,startX,startY, endX, endY,canvasSize){
    if(socket){
      socket.emit('canvas-data', roomId,drawingType, startX, startY, endX, endY, canvasSize);
    }
    
  }



//  I will choose word and If I get it within 10Sec I will change other I will not change




  socket.on("usersInfo", usersInfo => {
    if(ctx){
      ctx.clearRect(0,0,600,400);
      
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
      <div id="canvas" className="overscroll-contain" >
        {/* <WordPopUp socket={socket} words={words} roomId={roomId} setWords={setWords}/> */}
        {/* <p className="text-2xl text-center">{wordToGuess}</p> */}
        <div id="canvas-area" >
        <canvas ref={canvasRef} width="200" height="200" className="canvas-container border-4 border-red-600 bg-white overscroll-contain"  onMouseMove={(e)=>{
            drawingByMouse(e);
          }} onMouseDown={(e)=>{
          setDraw(true);
          ctx.lineTo(e.clientX-offset.left, e.clientY-offset.top);
          drawingByMouse(e);
         
          
        }} onMouseUp={(e)=>{
          setDraw(false);
  
        }}
         
        onTouchMove={(e)=>{
          drawingOnMobile(e);

        }}  onTouchStart={(e)=>{
           setStart({x:e.touches[0].clientX-offset.left, y:e.touches[0].clientY-offset.top});
           drawingOnMobile(e);
        }}/>
        </div>
        <div id="tools " className="flex gap-2">
          <button onClick={()=>{
            setDrawingType(0)
          }} className="bg-blue-600 text-white md:text-6xl text-2xl">✏️</button>
  
          <button onClick={()=>{
            setDrawingType(1)
          }} className="bg-blue-600 text-white md:text-6xl text-2xl md:w-20 w-12">
            <div className="bg-white md:w-12 md:h-4 md:ml-4 -rotate-45 w-8 h-2 ml-2"></div>
          </button>
  
          <button className=" bg-blue-600 text-white md:text-6xl text-2xl " onClick={()=>{
            if(ctx){
         
              ctx.clearRect(0, 0, canvasSize, canvasSize);
             
              emitData(2, 0, 0, canvasSize, canvasSize, canvasSize);
            }
  
          }}>🧹</button>
        </div>
      </div>
    )
  }



else{

    if(socket){
      socket.on('canvas-data',(data)=>{
        if(ctx && (data[0])){
          let drawerCanvasSize=data[0][5];
          ctx.lineWidth=2;
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
         <canvas ref={canvasRef} width="200" height="200" className="canvas-container border-4 border-red-600 bg-white" />
      </div>
    )
  }
}

   



