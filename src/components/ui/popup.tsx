"use client";
import Icon from "@mdi/react";
import { mdiCloseBox } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closePopup } from "@/store/generalState";
import dynamic from "next/dynamic";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NEOTypes } from "@/types/NEO";

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
             
                <h2 className="identifier">{state.identifier}</h2>
                <div
                  className="close"
                  onClick={() => dispatch(closePopup())}
                >
                  <Icon path={mdiCloseBox} size={1} />
                </div>
              </div>
              <PerfectScrollbar>
                {state.target === "SUN" ? <Sun /> : null}
                {state.target === "PLANET" ? (
                  <Planet planetName={state.identifier as string} />
                ) : null}
                {state.target === "NEO" && state.neo ? (
                  <NEO  neoData={state.neo} />
                ) : null}
              </PerfectScrollbar>
            </div>
          </div>
        </>
      )}
    </>
  );
};
