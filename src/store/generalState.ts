import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isPopupOpen: boolean;
}

const initialState: PopupState = {
  isPopupOpen: false,
};

const popupSlice = createSlice({
  name: 'celestialNavigator',
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isPopupOpen = true;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
