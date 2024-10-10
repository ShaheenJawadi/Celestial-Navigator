import Icon from "@mdi/react";
import { mdiArrowLeftThick } from "@mdi/js";

export const Popup = () => {
  return (
    <div className="popupHolder">
      <div className="popup">
        <div className="headSection">
          <Icon path={mdiArrowLeftThick} size={1} />
          <h2 className="identifier">astroid</h2>
        </div>
      </div>
    </div>
  );
};
