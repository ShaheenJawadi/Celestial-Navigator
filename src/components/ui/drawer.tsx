"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import Icon from "@mdi/react";
import { manageTools } from "@/store/generalState";
import PerfectScrollbar from "react-perfect-scrollbar";

import dynamic from "next/dynamic";
import {
  mdiInformationSlabCircle,
  mdiCog,
  mdiArrowRightThick,
  mdiFullscreenExit,
  mdiCrosshairs,
  mdiCardSearchOutline,
  mdiNotebook,
  mdiMeteor,
} from "@mdi/js";

const SearchObject = dynamic(() => import("../toolsPanel/searchObject"), {
  ssr: false,
});
const WatchList = dynamic(() => import("../toolsPanel/watchList"), {
  ssr: false,
});
const Pho = dynamic(() => import("../toolsPanel/pho"), {
  ssr: false,
});

const Drawer = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {state.drawer?.isOpen ? (
        <div className="drawerHolder">
          <div
            className="close icon"
            onClick={() =>
              dispatch(
                manageTools({ target: "drawer", content: null, open: false })
              )
            }
          >
            <Icon path={mdiArrowRightThick} size={1} />
          </div>

          <div className="header">
            <Icon
              path={headerData(state.drawer?.content)?.icon ?? ""}
              size={1.5}
            />
            <h2> {headerData(state.drawer?.content)?.title}</h2>
          </div>
          <div>
            <PerfectScrollbar>
              <div  className="dataContent">
                {state.drawer?.content == "WatchList" && <WatchList />}
                {state.drawer?.content == "SearchObject" && <SearchObject />}
                {state.dialog?.content == "Pho" && <Pho />}
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      ) : null}
    </>
  );
};

const headerData = (s: any) => {
  if (s == "WatchList") {
    return { icon: mdiNotebook, title: "Watchlist" };
  } else if (s == "Pho") {
    return { icon: mdiMeteor, title: "Potentially hazardous object" };
  } else if (s == "SearchObject") {
    return { icon: mdiCardSearchOutline, title: "Search Object" };
  } else return null;
};

export default Drawer;
