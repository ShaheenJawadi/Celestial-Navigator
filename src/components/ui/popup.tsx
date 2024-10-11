"use client";
import Icon from "@mdi/react";
import { mdiArrowLeftThick } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closePopup } from "@/store/generalState";
import dynamic from "next/dynamic";
import { stat } from "fs";

const Sun = dynamic(() => import("./dataClassification/sun"), { ssr: false });
const Planet = dynamic(() => import("./dataClassification/planet"), {
  ssr: false,
});
const NEO = dynamic(() => import("./dataClassification/neo"), { ssr: false });

export const Popup = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {!state.isPopupOpen ? null : (
        <>
          <div className="popupHolder">
            <div className="popup">
              <div className="headSection">
                <div
                  className="close icon"
                  onClick={() => dispatch(closePopup())}
                >
                  <Icon path={mdiArrowLeftThick} size={1} />
                </div>
                <h2 className="identifier">{state.identifier}</h2>
              </div>
              <div className="dataBox">
                {state.target === "SUN" ? <Sun /> : null}
                {state.target === "PLANET" ? (
                  <Planet planetName={state.identifier as string} />
                ) : null}
                {state.target === "NEO" ? (
                  <NEO spkid={state.identifier as string} />
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
