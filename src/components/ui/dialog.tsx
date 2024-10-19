"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store"; 
import Icon from "@mdi/react";
import { mdiCloseBox } from "@mdi/js";
import { manageTools } from "@/store/generalState";
import dynamic from "next/dynamic";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  mdiInformationSlabCircle,
  mdiCog,
  mdiMeteor,
} from "@mdi/js";
import { title } from "process";

const Informations = dynamic(() => import("../toolsPanel/informations"), {
  ssr: false,
});

const Settings = dynamic(() => import("../toolsPanel/settings"), {
  ssr: false,
});
const Dialog = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {state.dialog?.isOpen ? (
        <div className="dialogHolder">
         
          <div
            className="close icon"
            onClick={() =>
              dispatch(
                manageTools({ target: "dialog", content: null, open: false })
              )
            }
          >
            <Icon path={mdiCloseBox} size={1} />
          </div>
          <div className="header">
            <Icon path={headerData(state.dialog?.content)?.icon ?? ""} size={1.5} />
            <h2> {headerData(state.dialog?.content)?.title}</h2>
          </div>
         
            <PerfectScrollbar>
              <div   className="dataContent">
                {state.dialog?.content == "Informations" && <Informations />}
              
                {state.dialog?.content == "Settings" && <Settings />}
              </div>
            </PerfectScrollbar>
        
        </div>
      ) : null}
    </>
  );
};

const headerData = (s: any) => {
  if (s == "Informations") {
    return { icon: mdiInformationSlabCircle, title: "Informations" };
  } 
  else if (s == "Settings") {
    return { icon: mdiCog, title: "Settings" };
  }
  else return null;
};

export default Dialog;
