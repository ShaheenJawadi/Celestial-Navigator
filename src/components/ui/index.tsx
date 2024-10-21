import Dialog from "@/components/ui/dialog";
import { Popup } from "@/components/ui/popup";
import Drawer from "@/components/ui/drawer";
import ToolsPanel from "@/components/toolsPanel";

const UIPanels = () => {
  return (
    <>
      <ToolsPanel />
      <Popup />
      <Dialog />
      <Drawer />
    </>
  );
};

export default UIPanels;
