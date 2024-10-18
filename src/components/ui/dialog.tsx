"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { stat } from "fs";

const Dialog = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {state.dialog?.isOpen ? (
        <div>
          <h1 >Dialog</h1>
        </div>
      ) : null}
    </>
  );
};

export default Dialog;
