import { NEOTypes } from '@/types/NEO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isPopupOpen: boolean;
  target :"SUN" | "PLANET" | "NEO" | null;
  identifier: string |null;
  unitSystem: "us" | "metric";
  neo:{kind:string,objectData:NEOTypes} | null;
  neoOrbitColor:string ;
}

const initialState: PopupState = {
  isPopupOpen: false,
  target: null,
  identifier: null,
  unitSystem: "us",
  neo:null,
  neoOrbitColor:"#0866ff",

};

const generalSlice = createSlice({
  name: 'celestialNavigator',
  initialState,
  reducers: {
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
    }
  },
});

export const { openPopup, closePopup ,changeUnitSystem,changeNeoOrbitColor } = generalSlice.actions;
export default generalSlice.reducer;
