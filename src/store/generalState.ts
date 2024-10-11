import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isPopupOpen: boolean;
  target :"SUN" | "PLANET" | "NEO" | null;
  identifier: string |null;
  unitSystem: "us" | "metric";
}

const initialState: PopupState = {
  isPopupOpen: false,
  target: null,
  identifier: null,
  unitSystem: "us",

};

const generalSlice = createSlice({
  name: 'celestialNavigator',
  initialState,
  reducers: {
    openPopup: (state , acttion) => {
      state.isPopupOpen = true;
      state.target = acttion.payload.target;
      state.identifier = acttion.payload.identifier;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
      state.target=null ;
      state.identifier = null;
    },
    changeUnitSystem: (state, action: PayloadAction<"us" | "metric">) => {
      state.unitSystem = action.payload;
    }
  },
});

export const { openPopup, closePopup ,changeUnitSystem } = generalSlice.actions;
export default generalSlice.reducer;
