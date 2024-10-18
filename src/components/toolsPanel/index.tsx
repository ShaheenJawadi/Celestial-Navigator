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
import { useState } from "react";



const ToolsPanel = () => {


    const [isFullScreen , setIsFullScreen]=useState(false);
    const toggleFullScreen = () => {
        const doc = document as any;
        const elem = doc.documentElement;
      
        if (!doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
          }
          setIsFullScreen(true)
        } else {
          if (doc.exitFullscreen) {
            doc.exitFullscreen();
          } else if (doc.mozCancelFullScreen) { // Firefox
            doc.mozCancelFullScreen();
          } else if (doc.webkitExitFullscreen) { // Chrome, Safari, and Opera
            doc.webkitExitFullscreen();
          } else if (doc.msExitFullscreen) { // IE/Edge
            doc.msExitFullscreen();
          }
          setIsFullScreen(false)
        } 
      };
      const listTools = [


        /*   {
            icon: mdiFullscreenExit,
            title: "inf",
          }, 
          {
            icon: mdiCrosshairs,
            title: "inf",
          },*/
          {
            icon: mdiCardSearchOutline,
            title: "Search Object",
          },
          {
            icon: mdiNotebook,
            title: "Watchlist",
          },
          {
            icon: mdiMeteor,
            title: "Potentially hazardous object",
          },
          {
            icon: mdiCog,
            title: "Settings",
          },
          {
            icon: !isFullScreen ? mdiFullscreen : mdiFullscreenExit,
            title:!isFullScreen ? "Fullscreen" :"Exit Fullscreen",
          },
          {
        
            icon: mdiInformationSlabCircle,
            title: "Informations",
          },
         
        ];
      
  return (
    <div className="toolsPanelHolder">
      <div className="toolsBtns">
        {listTools.map((tool) => (
          <div className="single" onClick={toggleFullScreen}>
            <Icon className="icon" path={tool.icon} size={1} />
            <span className="popover">{tool.title}</span>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default ToolsPanel;
