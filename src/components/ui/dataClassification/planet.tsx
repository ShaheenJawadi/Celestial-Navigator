import { planetsInformation } from "@/data/planetsInformation";
import { PlanetProperty } from "@/types/planet";

const displayData = ({ planetName }: { planetName: string }) => {
  const currentPlanet:PlanetProperty[] = planetsInformation[planetName];
 
  return (
    <>
      {currentPlanet.map((planet , index) => {
        return (
          <div key={index} className="single">
            <h4>{planet.label}: {"  "}</h4>
            <span>{planet.metric.value}  <span dangerouslySetInnerHTML={{ __html: planet.metric.unit }} />   </span>
          </div>
        );
      })}
    </>
  );
};

export default displayData;
