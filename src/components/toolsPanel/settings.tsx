"use client";

import { PopoverPicker } from "../ui/PopupColorPicker";

const Settings = () => {
  return (
    <>
      <div className="dataBox g colorsList">
      <div className="subDataSep">
          <div className="tit">Colors</div>
          <div className="separator"></div>
        </div>
        <div className="single">
          <h4>{"NEO default orbits's color:"}</h4>
          <span className="colorPicker">
            <PopoverPicker color={"#fff"} onChange={(color: string) => null} />
          </span>
        </div>
        <div className="single">
          <h4>{"Comet's color:"}</h4>
          <span className="colorPicker">
            <PopoverPicker color={"#fff"} onChange={(color: string) => null} />
          </span>
        </div>
        <div className="single">
          <h4>{"Asteroid's color:"}</h4>
          <span className="colorPicker">
            <PopoverPicker color={"#fff"} onChange={(color: string) => null} />
          </span>
        </div>
        <div className="single">
          <h4>{"PHA's color:"}</h4>
          <span className="colorPicker">
            <PopoverPicker color={"#fff"} onChange={(color: string) => null} />
          </span>
        </div>
      </div>
      <>
        <div className="subDataSep">
          <div className="tit">Planets</div>
          <div className="separator"></div>
        </div>

        <label className={"checkboxContainer"}>
          Display Planets
          <input type="checkbox" className={"checkboxInput"} />
          <span className={"checkmark"}></span>
        </label>

        <label className={"checkboxContainer"}>
          {"Display planet's orbit"}
          <input type="checkbox" className={"checkboxInput"} />
          <span className={"checkmark"}></span>
        </label>
      </>
      <div className="subDataSep">
        <div className="tit">Near-Earth objects</div>
        <div className="separator"></div>
      </div>

      <label className={"checkboxContainer"}>Display Near-Earth objects</label>
      <label className={"checkboxContainer"}>
        Comets
        <input type="checkbox" className={"checkboxInput"} />
        <span className={"checkmark"}></span>
      </label>
      <label className={"checkboxContainer"}>
        Asteroids
        <input type="checkbox" className={"checkboxInput"} />
        <span className={"checkmark"}></span>
      </label>
      <label className={"checkboxContainer"}>
        PHAs (Potentially Hazardous Asteroids)
        <input type="checkbox" className={"checkboxInput"} />
        <span className={"checkmark"}></span>
      </label>
     
    
    
    </>
  );
};
export default Settings;
