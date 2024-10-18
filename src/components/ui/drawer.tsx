"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { stat } from "fs";

const Drawer = () => {
  const state = useSelector((state: RootState) => state.generalState);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {state.drawer?.isOpen ? (
        <div>
          <h1 color="#fff">Drawer{state.drawer.content}</h1>
        </div>
      ) : null}
    </>
  );
};

export default Drawer;
