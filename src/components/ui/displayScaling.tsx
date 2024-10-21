import { AU_TO_KM, convertUSToMetricDistances } from "@/utils/conversionHelpers";
import { useState } from "react";

const DisplayScaling = () => {
    const SunInitialPixelScale = 149597370;
    const PlanetInitialPixelScale = 299196390;

  const [sunScaling, setSunScaling] = useState(149597370);
  const [planetScaling, setPlanetScaling] = useState(299196390);
  const [distanceScaling, setDistanceScaling] = useState(AU_TO_KM);


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
