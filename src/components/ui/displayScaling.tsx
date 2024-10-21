import { div } from "three/webgpu";

const DisplayScaling = () => {
  return (

    <div className="scalingPanel">

      <div className="single">
        <div className="label"> Sun Scaling</div>
        <div className="scalingLine" ></div>
        <div className="value" >149,597,370 km</div>

      </div>
      <div className="single">
        <div className="label">Distances scaling </div>
        <div className="scalingLine" ></div>
        <div className="value" >1AU</div>

      </div>

      <div className="single">
        <div className="label">Planets scaling</div>
        <div className="scalingLine" ></div>
        <div className="value" >299,196,390 km</div>

      </div>
    </div>
  );
};

export default DisplayScaling;
