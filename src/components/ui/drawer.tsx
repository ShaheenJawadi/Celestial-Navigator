"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { stat } from "fs";
import Icon from "@mdi/react";
import { mdiArrowRightThick } from "@mdi/js";
import { manageTools } from "@/store/generalState";

const Drawer = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {state.drawer?.isOpen ? (
        <div className="drawerHolder">
          <div>
              <h1 >Drawer</h1>
          </div>
          <div
                  className="close icon"
                  onClick={() => dispatch(manageTools({ target: "drawer", content: null, open: false }))}
                >
                  <Icon path={mdiArrowRightThick} size={1} />
                </div>
        
        </div>
      ) : null}
    </>
  );
};

export default Drawer;
