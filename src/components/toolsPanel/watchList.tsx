import { mdiNotebookPlus, mdiEyeArrowLeft, mdiCircleDouble, mdiOrbit, mdiPalette, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import { PopoverPicker } from "../ui/PopupColorPicker";

const WatchList = () => {
  return (
    <div className="watchList">
      <div className="objList">
        <SingleWatchListGrid kind="PHA" />
        <SingleWatchListGrid kind="" />

        <SingleWatchListGrid kind="COMET" />
        <SingleWatchListGrid kind="PHA" />
      </div>
    </div>
  );
};

const SingleWatchListGrid = ({ kind }: { kind: string }) => {
  return (
    <div className={`singleObj ${kind}`}>
      <div className="dataBox g">
        <div className="single">
          <h4>SPK-ID:</h4>
          <span>dsfdsdfsdfs</span>
        </div>
        <div className="single">
          <h4>Object fullname:</h4>
          <span>dsfdsdfsdfs</span>
        </div>
        <div className="single">
          <h4>Primary designation:</h4>
          <span>dsfdsdfsdfs</span>
        </div>
      </div>
      <div className="utils">
      <div className="btn">
        <Icon path={mdiEyeArrowLeft} size={1} />
        <span className="popover">{"View Object"}</span>
        </div>


        <div className="btn">
          <Icon path={mdiOrbit} size={1} />
          <span className="popover">{"Toggle Orbit"}</span>
        </div>
      
        <div className="btn">
          
          <span className="colorPicker">
            <PopoverPicker ColorIcon={<Icon path={mdiPalette} size={1} />} color={"#fff"} onChange={(color: string) => null} />
          </span>
          <span className="popover">{"Change Orbit Color"}</span>
        </div>

        <div className="btn">
          <Icon path={mdiCircleDouble} size={1} />
          <span className="popover">{"Toggle ripple effect"}</span>
        </div>

        <div className="btn">
          <Icon path={mdiTrashCan} size={1} />
          <span className="popover">{"Remove from list"}</span>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
