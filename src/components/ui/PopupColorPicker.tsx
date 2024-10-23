import React, { useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
 

interface PopoverPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const PopoverPicker: React.FC<PopoverPickerProps> = ({ color, onChange }) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
const useClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
      let startedInside = false;
      let startedWhenMounted = false;
  
      const listener = (event: MouseEvent | TouchEvent) => { 
        if (startedInside || !startedWhenMounted) return; 
        if (!ref.current || ref.current.contains(event.target as Node)) return;
  
        handler(event);
      };
  
      const validateEventStart = (event: MouseEvent | TouchEvent) => {
        startedWhenMounted = ref.current !== null;
        startedInside = ref.current !== null && ref.current.contains(event.target as Node);
      };
  
      document.addEventListener("mousedown", validateEventStart);
      document.addEventListener("touchstart", validateEventStart);
      document.addEventListener("click", listener);
  
      return () => {
        document.removeEventListener("mousedown", validateEventStart);
        document.removeEventListener("touchstart", validateEventStart);
        document.removeEventListener("click", listener);
      };
    }, [ref, handler]);
  };
  