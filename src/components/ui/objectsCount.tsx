import {  useSelector } from "react-redux";
import {  RootState } from "@/store";


const ObjectsCount = () => {
    const state = useSelector((state: RootState) => state.generalState);

  return (
    <div className="objectsCount">
      <div>
        <span> 🟢</span>
        <span>Asteroid:{state.objectsCount.asteroid}</span>
      </div>
      <div>
        |<span>🔴</span>
        <span>PHA:{state.objectsCount.pha} </span>
      </div>

      <div> 
        |<span>🟡</span>
        <span>Comet:{state.objectsCount.comet}</span>
      </div>
    </div>
  );
};

export default ObjectsCount;
