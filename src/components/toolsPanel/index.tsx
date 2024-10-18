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
import { act, useState } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { manageTools } from "@/store/generalState";



const ToolsPanel = () => {

    const dispatch = useDispatch<AppDispatch>();
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
            icon: mdiNotebook,
            title: "Watchlist",
            action: ()=> dispatch(manageTools({target:"drawer" , content:"watchList" , open:true}))
          },
          {
            icon: mdiCardSearchOutline,
            title: "Search Object",
            action: ()=> dispatch(manageTools({target:"drawer" , content:"search" , open:true}))
            
          },
         
          {
            icon: mdiMeteor,
            title: "Potentially hazardous object",
            action: ()=> dispatch(manageTools({target:"drawer" , content:"pha" , open:true}))
          },
          {
            icon: mdiCog,
            title: "Settings",
            action:()=>dispatch(manageTools({target:"dialog" , content:"settings" , open:true}))
          },
          {
            icon: !isFullScreen ? mdiFullscreen : mdiFullscreenExit,
            title:!isFullScreen ? "Fullscreen" :"Exit Fullscreen",
            action: toggleFullScreen
          },
          {
        
            icon: mdiInformationSlabCircle,
            title: "Informations",
            action:()=>dispatch(manageTools({target:"dialog" , content:"informations" , open:true}))
          },
         
        ];
      
  return (
    <div className="toolsPanelHolder">
      <div className="toolsBtns">
        {listTools.map((tool , index) => (
          <div key={index} className="single" onClick={()=> tool.action && tool.action()}>
            <Icon className="icon" path={tool.icon} size={1} />
            <span className="popover">{tool.title}</span>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default ToolsPanel;
