import React from "react";

export default function ControlButtons(props) {

  const StartButton = (
    <div className="btn btn-one btn-start"
      onClick={props.handleStart}>
      Start
    </div>
  );
  const ActiveButtons = (
    <div className="btns btn-stop"
      onClick={props.handleStop}>
      Stop
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}