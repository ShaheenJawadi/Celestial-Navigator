import Dialog from "@/components/ui/dialog";
import { Popup } from "@/components/ui/popup";
import Drawer from "@/components/ui/drawer";
import ToolsPanel from "@/components/toolsPanel";
import ObjectsCount from "./objectsCount";
import DisplayScaling from "./displayScaling";

const UIPanels = () => {
  return (
    <>
      <DisplayScaling />
      <ObjectsCount />
      <ToolsPanel />
      <Popup />
      <Dialog />
      <Drawer />
    </>
  );
};

export default UIPanels;
