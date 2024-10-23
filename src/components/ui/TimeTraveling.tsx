import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiRewind, mdiFastForward, mdiPause, mdiPlay } from "@mdi/js";

const TimeTraveling = () => {
  return (
    <div className="timeTravelingHolder">
      <div className="timeTravelingBox">
        <div className="targetDate">
          <div className="t_date">12/04/1998</div>
          <div className="t_time">17:20:15</div>
        </div>
        <div className="btns">
          <div className="singleBtn">
            <Icon path={mdiRewind} size={1.5} />
          </div>
          <div className="singleBtn">
            <Icon path={mdiPause} size={1.5} />
          </div>

          <div className="singleBtn">
            <Icon path={mdiFastForward} size={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTraveling;
