"use client";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { PopoverPicker } from "../ui/PopupColorPicker";
import { changeUnitSystem } from "@/store/generalState";

const Settings = () => {

  const state = useSelector((state: RootState) => state.generalState);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
    <>
    
    <div className="subDataSep">
        <div className="tit">Unit Preferences</div>
        <div className="separator"></div>
      </div>
      <div className="units">
        <button
          className={state.unitSystem == "us" ? "selected" : ""}
          onClick={() => dispatch(changeUnitSystem("us"))}
        >
          US
        </button>
        <button
          className={state.unitSystem == "metric" ? "selected" : ""}
          onClick={() => dispatch(changeUnitSystem("metric"))}
        >
          Metric
        </button>
      </div>
      </>
      

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
