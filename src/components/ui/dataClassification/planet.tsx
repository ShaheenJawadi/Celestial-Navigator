import { planetsInformation } from "@/data/planetsInformation";
import { PlanetProperty } from "@/types/planet";
import React from "react";

const displayData = ({ planetName }: { planetName: string }) => {
  const currentPlanet: PlanetProperty[] = planetsInformation[planetName];
  const [unitSystem, setUnitSystem] = React.useState<"metric"|"us">("us");

  return (
    <>
    <div className="units">
        <button  className={unitSystem=="us" ? "selected" : ""}  onClick={() => setUnitSystem("us")}>US</button>
        <button  className={unitSystem=="metric" ? "selected" : ""} onClick={() => setUnitSystem("metric")}>Metric</button>
    </div>
    <div className="dataBox">

      {currentPlanet.map((planet, index) => {
        return (
          <div key={index} className="single">
            <h4>
              {planet.label}: {"  "}
            </h4>
            <span>
              {planet[unitSystem].value}{" "}
              <DisplayUnit unit={planet[unitSystem].unit as string} />{" "}
            </span>
          </div>
        );
      })}
      <div style={{marginTop:10}} className="single">
            <h4>
              source:
            </h4>
            <span>
              <a href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/">NASA Planetary Fact Sheet - Metric</a>
            </span>
          </div>
          </div>
    </>
  );
};

const DisplayUnit = ({ unit }: { unit: string }) => {
    let addMultiple = " ";
  if (unit.startsWith("10")) {
    addMultiple=" x ";
  }  
  return (
    <span>
      {addMultiple} 
      <span dangerouslySetInnerHTML={{ __html: unit }} />{" "}
    </span>
  );
};

export default displayData;
