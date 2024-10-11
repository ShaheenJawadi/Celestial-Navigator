"use client";
import Icon from "@mdi/react";
import { mdiArrowLeftThick } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closePopup } from "@/store/generalState";

export const Popup = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>()
  
  return (
    <>
      {!state.isPopupOpen ? null : (
        <div className="popupHolder">
          <div className="popup">
            <div className="headSection">
              <div className="close icon" onClick={() => dispatch(closePopup())}>
                <Icon path={mdiArrowLeftThick} size={1} />
              </div>
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
