import Dialog from "@/components/ui/dialog";
import { Popup } from "@/components/ui/popup";
import Drawer from "@/components/ui/drawer";
import ToolsPanel from "@/components/toolsPanel";
import ObjectsCount from "./objectsCount";
import DisplayScaling from "./displayScaling";

import Image from "next/image";
import TimeTraveling from "./TimeTraveling";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UIPanels = () => {
  return (
    <>
      <div className="logoHolder">
        <Image src={"./logo.svg"} width={75} height={60} alt={"logo "} />{" "}
      </div>
      <DisplayScaling />
      <ObjectsCount />
      <ToolsPanel />
      <Popup />
      <Dialog />
      <Drawer />

      <TimeTraveling />
      <ToastContainer position="top-right" />
    </>
  );
};

export default UIPanels;
