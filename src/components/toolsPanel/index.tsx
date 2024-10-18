import Icon from "@mdi/react";
import {
  mdiInformationSlabCircle,
  mdiCog,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiCrosshairs,
  mdiCardSearchOutline,
  mdiNotebook,
  mdiMeteor,
} from "@mdi/js";

const listTools = [
  {
    icon: mdiInformationSlabCircle,
    title: "inf",
  },
  {
    icon: mdiCog,
    title: "inf",
  },
  {
    icon: mdiFullscreen,
    title: "inf",
  },
  {
    icon: mdiFullscreenExit,
    title: "inf",
  },
  {
    icon: mdiCrosshairs,
    title: "inf",
  },
  {
    icon: mdiCardSearchOutline,
    title: "inf",
  },
  {
    icon: mdiNotebook,
    title: "inf",
  },
  {
    icon: mdiMeteor,
    title: "inf",
  },
];

const ToolsPanel = () => {
  return (
    <div className="toolsPanelHolder">
      <div className="toolsBtns">
        {listTools.map((tool) => (
          <div className="single">
            <Icon className="icon" path={tool.icon} size={1} />
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default ToolsPanel;
