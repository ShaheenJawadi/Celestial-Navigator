import { div } from "three/webgpu";

const DisplayScaling = () => {
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
            <div className="value">149,597,370 km</div>
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
            <div className="value">299,196,390 km</div>
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
            <div className="value">1AU</div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default DisplayScaling;
