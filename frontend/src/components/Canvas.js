import React from 'react'

export default function Canvas() {
  return (
    <div id="canvas-container">
      <div id="canvas-area" >
      <canvas width="500" height="500"/>
      </div>
      <div id="tools">
        <p>Pencil</p>
        <p>Erasor</p>
        <p>clear</p>
      </div>
    </div>
  )
}
