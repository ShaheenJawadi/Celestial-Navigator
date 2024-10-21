import Dialog from "@/components/ui/dialog";
import { Popup } from "@/components/ui/popup";
import Drawer from "@/components/ui/drawer";
import ToolsPanel from "@/components/toolsPanel";
import ObjectsCount from "./objectsCount";

const UIPanels = () => {
  return (
    <>
    <ObjectsCount/>
      <ToolsPanel />
      <Popup />
      <Dialog />
      <Drawer />
    </>
  );
};

export default UIPanels;
