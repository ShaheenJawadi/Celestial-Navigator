import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiRewind, mdiFastForward, mdiPause, mdiPlay } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { setLive, setTimeDirection, togglePause } from "@/store/generalState";
import { RootState } from "@/store";
import { julianToDate } from "@/utils/conversionHelpers";

const TimeTraveling = () => {

  const dispatch = useDispatch();
  const { isPaused, timeDirection, timeSpeed , isLive ,currentDate } = useSelector((state: RootState) => state.generalState);
 

 
 

 
  return (
    <div className="timeTravelingHolder">
      <div className="timeTravelingBox">
        <div className="targetDate">
        <div className="t_date">{julianToDate(currentDate)}</div> 
        </div>
        <div className="btm_i">
          
          <div className="live" onClick={()=>dispatch(setLive())}> <span></span> {isLive && "Live"}</div>
          {
            !isLive &&<div className="steps">+ 1 year /sec</div>
          }
          
  

          <div className="btns">
            <div className="singleBtn" onClick={()=>dispatch(setTimeDirection(-1))}>
              <Icon path={mdiRewind} size={1.5} />
            </div>
            <div className="singleBtn"onClick={()=> dispatch(togglePause())}>
              {
                isPaused ? <Icon path={mdiPlay} size={1.5} /> : <Icon path={mdiPause} size={1.5} />
              }
          
            </div>

            <div className="singleBtn"  onClick={()=>  dispatch(setTimeDirection(1))}>
              <Icon path={mdiFastForward} size={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTraveling;
