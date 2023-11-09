import React from 'react'
import { combineReducers } from 'redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';
import { connect } from 'react-redux';

 function Wheel(props) {
  const {moveClockwise,moveCounterClockwise, initialWheelState} = props

  const handleClockwise = () =>{
    moveClockwise()
  }

  const handleCounterClockwise = () =>{
    moveCounterClockwise()
  }
   const cogsArray = [...Array(6)]

  return (
    <div id="wrapper">
      <div id="wheel">
      {
        cogsArray.map((_, i) =>(
          <div
           key={`cog-${i}`}
           className={`cog${initialWheelState.wheel === i || initialWheelState.wheel === i - cogsArray.length ? ' active' : ''}`}
           style={{ '--i': i}}
          >
            {initialWheelState.wheel === i || initialWheelState.wheel === i - cogsArray.length ? 'B' : null}
            </div>
        ))
      }

      </div>
      <div id="keypad">
        <button onClick={handleCounterClockwise}id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockwise}  id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}
const mapStateToProps = state =>{
  return{
    initialWheelState: state
  }
}
export default connect(mapStateToProps,{moveClockwise, moveCounterClockwise})(Wheel)


// {(initialWheelState.wheel === 0) ? <div className="cog active" style={{ "--i": 0 }}>B</div> :  <div className="cog" style={{ "--i": 0 }}></div>}
//         {(initialWheelState.wheel === 1) ? <div className="cog active" style={{ "--i": 1 }}>B</div> : <div className="cog" style={{ "--i": 1 }}></div>}
//         {(initialWheelState.wheel === 2) ? <div className="cog active" style={{ "--i": 2 }}>B</div> : <div className="cog" style={{ "--i": 2 }}></div>}
//         {(initialWheelState.wheel === 3) ? <div className="cog active" style={{ "--i": 3 }}>B</div> : <div className="cog" style={{ "--i": 3 }}></div>}
//         {(initialWheelState.wheel === 4) ? <div className="cog active" style={{ "--i": 4 }}>B</div> : <div className="cog" style={{ "--i": 4 }}></div>}
//         {(initialWheelState.wheel === 5) ? <div className="cog active" style={{ "--i": 5 }}>B</div> : <div className="cog" style={{ "--i": 5 }}></div>}
