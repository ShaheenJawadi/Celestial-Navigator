import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isPopupOpen: boolean;
  target :"SUN" | "PLANET" | "NEO" | null;
  identifier: string |null;
}

const initialState: PopupState = {
  isPopupOpen: false,
  target: null,
  identifier: null,

};

const popupSlice = createSlice({
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
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
