"use client";
import Icon from "@mdi/react";
import { mdiArrowLeftThick } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closePopup } from "@/store/generalState";
import dynamic from "next/dynamic";


const Sun = dynamic(() => import("./dataClassification/sun"), { ssr: false });
const Planet = dynamic(() => import("./dataClassification/planet"), { ssr: false });
const NEO = dynamic(() => import("./dataClassification/neo"), { ssr: false });





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

            <Sun />
            <Planet />
            <NEO />
          </div>
        </div>
      )}
    </>
  );
};
