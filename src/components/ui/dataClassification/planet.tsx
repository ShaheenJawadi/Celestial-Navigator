import { planetsInformation } from "@/data/planetsInformation";
import { PlanetProperty } from "@/types/planet";

const displayData = ({ planetName }: { planetName: string }) => {
  const currentPlanet: PlanetProperty[] = planetsInformation[planetName];

  return (
    <>
      {currentPlanet.map((planet, index) => {
        return (
          <div key={index} className="single">
            <h4>
              {planet.label}: {"  "}
            </h4>
            <span>
              {planet.metric.value}{" "}
              <DisplayUnit unit={planet.metric.unit as string} />{" "}
            </span>
          </div>
        );
      })}
    </>
  );
};

const DisplayUnit = ({ unit }: { unit: string }) => {
    let addMultiple = "";
  if (unit.startsWith("10")) {
    addMultiple="*";
  }  
  return (
    <span>
      {addMultiple} 
      <span dangerouslySetInnerHTML={{ __html: unit }} />{" "}
    </span>
  );
};

export default displayData;
