"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { stat } from "fs";
import Icon from "@mdi/react";
import { mdiCloseBox } from "@mdi/js";
import { manageTools } from "@/store/generalState";

const Dialog = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {state.dialog?.isOpen ? (
        <div className="dialogHolder">
          <div>
              <h1 >Dialog</h1>
          </div>
          <div
                  className="close icon"
                  onClick={() => dispatch(manageTools({ target: "dialog", content: null, open: false }))}
                >
                  <Icon path={mdiCloseBox} size={1} />
                </div>
        
        </div>
      ) : null}
    </>
  );
};

export default Dialog;
