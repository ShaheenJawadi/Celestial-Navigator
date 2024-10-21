import { AU_TO_KM, convertUSToMetricDistances } from "@/utils/conversionHelpers";
import { useEffect, useState } from "react";

import {  useSelector } from "react-redux";
import {  RootState } from "@/store";
import { DISTANCE_SCALE_FACTOR, PLANET_SIZE_SCALE_FACTOR, SUN_SCALE_FACTOR } from "@/utils/scaling";
 

const DisplayScaling = () => {
    const state = useSelector((state: RootState) => state.generalState);

 

  const [sunScaling, setSunScaling] = useState(0);
  const [planetScaling, setPlanetScaling] = useState(0);
  const [distanceScaling, setDistanceScaling] = useState(0);


  useEffect(() => {
     

    setSunScaling(state.worldUnitsFor150px/SUN_SCALE_FACTOR);   
    setPlanetScaling(state.worldUnitsFor150px / PLANET_SIZE_SCALE_FACTOR);  
    setDistanceScaling((state.worldUnitsFor150px/ DISTANCE_SCALE_FACTOR)*AU_TO_KM);  
  }, [state.worldUnitsFor150px]);




  return (
    <div className="scalingPanel">
      <table>
        <tr className="single">
          <td>
            <div className="label"> Sun scaling</div>
          </td>
          <td>
            <div className="scalingLine"></div>
          </td>
          <td>
            <div className="value">{convertUSToMetricDistances(sunScaling , "metric" , "metric").st}</div>
          </td>
        </tr>
        <tr className="single">
          <td>
            <div className="label"> Planets scaling</div>
          </td>
          <td>
            <div className="scalingLine"></div>
          </td>
          <td>
            <div className="value">{convertUSToMetricDistances(planetScaling , "metric" , "metric").st}</div>
          </td>
        </tr>
        <tr className="single">
          <td>
            <div className="label"> Distances scaling</div>
          </td>
          <td>
            <div className="scalingLine"></div>
          </td>
          <td>
            <div className="value">{convertUSToMetricDistances(distanceScaling , "metric" , "metric").st}</div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default DisplayScaling;
