 
import { NEOTypes } from '@/types/NEO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { ObjectsType, OrbitType } from '@/types/general';
import { keplerianElementsType } from '@/types/planet';

interface PopupState {
  isPopupOpen: boolean;
  target :"SUN" | "PLANET" | "NEO" | null;
  identifier: string |null;
  unitSystem: "us" | "metric";
  neo:{kind:ObjectsType,objectData:NEOTypes , keplerianElements:keplerianElementsType} | null;
  neoOrbitColor:string ;
  orbits: OrbitType[];
  dialog: { isOpen: boolean; content: string | null} | null;
  drawer: { isOpen: boolean; content: string | null} | null;

}

const initialState: PopupState = {
  isPopupOpen: false,
  target: null,
  identifier: null,
  unitSystem: "us",
  neo: null,
  neoOrbitColor: "#0866ff",
  orbits: [],
  dialog: null,
  drawer: null
};

const generalSlice = createSlice({
  name: 'celestialNavigator',
  initialState,
  reducers: {
    manageTools: (state , action: PayloadAction<{target:"dialog"|"drawer" , content :string , open:boolean}>) => {
      const {target , content , open} = action.payload;
      const op ={isOpen : open , content: content};
      if(target === "dialog"){
        state.dialog = op;
      }else if(target === "drawer"){
        state.drawer = op;
      }
     
    },
    openPopup: (state , action) => {
      state.isPopupOpen = true;
      state.target = action.payload.target;
      state.identifier = action.payload.identifier;
      if( action.payload.target=="NEO" && action.payload.neo){
          state.neo = action.payload.neo; 
      }
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
      state.target=null ;
      state.identifier = null;
      state.neo=null;
    },
    changeUnitSystem: (state, action: PayloadAction<"us" | "metric">) => {
      state.unitSystem = action.payload;
    },
    changeNeoOrbitColor: (state, action) => {
      state.neoOrbitColor = action.payload;
    },
    addOrbit: (state, action  ) => {
      state.orbits.push({...action.payload , orbitColor: state.neoOrbitColor}); 
  },
  },
});


export const openPopupAndAddOrbit = (payload: { target: string, identifier: string, neo?: { kind: ObjectsType, objectData: NEOTypes ,keplerianElements:keplerianElementsType} }) => 
  (dispatch: AppDispatch) => { 
    dispatch(openPopup(payload));
    
    
    if (payload.target === "NEO" && payload.neo) {
      const neo = payload.neo; 
       dispatch(addOrbit({ keplerianElements: neo.keplerianElements,targetObject: neo.kind, objectRef: null }));   
    }
  };


export const { openPopup, closePopup ,changeUnitSystem,changeNeoOrbitColor,addOrbit,manageTools } = generalSlice.actions;
export default generalSlice.reducer;
