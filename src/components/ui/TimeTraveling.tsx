import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiRewind, mdiFastForward, mdiPause, mdiPlay } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { setTimeDirection, togglePause } from "@/store/generalState";
import { RootState } from "@/store";

const TimeTraveling = () => {

  const dispatch = useDispatch();
  const { isPaused, timeDirection, timeSpeed , isLive } = useSelector((state: RootState) => state.generalState);

  const currentDateTime = new Date();
  const formattedDate = currentDateTime.toLocaleString(); 

  const handlePlay = () => {
    dispatch(setTimeDirection(1)); 
    dispatch(togglePause());  
  };

  const handleRewind = () => {
    dispatch(setTimeDirection(-1)); 
    dispatch(togglePause());  
  };

  const handlePause = () => {
    dispatch(togglePause());  
  };
  return (
    <div className="timeTravelingHolder">
      <div className="timeTravelingBox">
        <div className="targetDate">
        <div className="t_date">{formattedDate.split(', ')[0]}</div>
        <div className="t_time">{formattedDate.split(', ')[1]}</div>
        </div>
        <div className="btm_i">
          
          <div className="live"> <span></span> {isLive && "Live"}</div>
          {
            !isLive &&<div className="steps">3 years /sec</div>
          }
          
  

          <div className="btns">
            <div className="singleBtn" onClick={()=>handleRewind()}>
              <Icon path={mdiRewind} size={1.5} />
            </div>
            <div className="singleBtn"onClick={()=>handlePause()}>
              <Icon path={mdiPause} size={1.5} />
            </div>

            <div className="singleBtn"  onClick={()=>handlePlay()}>
              <Icon path={mdiFastForward} size={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTraveling;
