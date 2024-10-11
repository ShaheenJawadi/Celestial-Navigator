"use client";
import Icon from "@mdi/react";
import { mdiArrowLeftThick } from "@mdi/js";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
 

export const Popup = () => {
  const state = useSelector((state: RootState) => state.generalState);
  return (
    <>
      {!state.isPopupOpen ? null : (
        <div className="popupHolder">
          <div className="popup">
            <div className="headSection">
              <Icon path={mdiArrowLeftThick} size={1} />
              <h2 className="identifier">astroid</h2>
            </div>

            <div className="dataBox">
              <div className="single">
                <h4>name:</h4>
                <span>name</span>
              </div>

              <div className="single">
                <h4>name:</h4>
                <span>name</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
