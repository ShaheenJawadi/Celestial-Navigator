import { planetsInformation } from "@/data/planetsInformation";
import { PlanetProperty } from "@/types/planet";
import React from "react";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { changeUnitSystem } from "@/store/generalState";

const DisplayData = ({ planetName }: { planetName: string }) => {
  const currentPlanet: PlanetProperty[] = planetsInformation[planetName]?.data;
 
  const state = useSelector((state: RootState) => state.generalState);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
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
      <div className="dataBox">
        {currentPlanet.map((planet, index) => {
          return (
            <div key={index} className="single">
              <h4>
                {planet.label}: {"  "}
              </h4>
              <span>
                {planet[state.unitSystem].value}{" "}
                <DisplayUnit unit={planet[state.unitSystem].unit as string} />{" "}
              </span>
            </div>
          );
        })}

<div style={{ marginTop: 10 }} className="single">
          <h4>* - See the </h4> 
          <span>
          <a rel="noopener noreferrer" target="_blank"  href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html">
          Fact Sheet Notes.
              </a>
          </span>
        </div>

        <div style={{ marginTop: 10 }} className="single">
          <h4>source:</h4>
          <span>
            {state.unitSystem == "us" ? (
              <a rel="noopener noreferrer" target="_blank" href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_british.html">
                NASA Planetary Fact Sheet - U.S. Units
              </a>
            ) : (
              <a rel="noopener noreferrer" target="_blank"  href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/">
                NASA Planetary Fact Sheet - Metric
              </a>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

const DisplayUnit = ({ unit }: { unit: string }) => {
  let addMultiple = " ";
  if (unit.startsWith("10")) {
    addMultiple = " x ";
  }
  return (
    <span>
      {addMultiple}
      <span dangerouslySetInnerHTML={{ __html: unit }} />{" "}
    </span>
  );
};

export default DisplayData;
