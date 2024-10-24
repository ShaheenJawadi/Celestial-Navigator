
import { NEOTypes } from '@/types/NEO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { ObjectsType, OrbitType, TimeTravelingStepsType } from '@/types/general';
import { keplerianElementsType } from '@/types/planet';
import { dateToJulian } from '@/utils/conversionHelpers';
import { timeTravelingSteps } from '@/utils/scaling';


interface PopupState {
  isPopupOpen: boolean;
  target: "SUN" | "PLANET" | "NEO" | null;
  identifier: string | null;
  unitSystem: "us" | "metric";
  neo: { kind: ObjectsType, objectData: NEOTypes, keplerianElements: keplerianElementsType } | null;
  neoOrbitColor: string;
  orbits: OrbitType[];
  dialog: { isOpen: boolean; content: DialogContent | null } | null;
  drawer: { isOpen: boolean; content: DrawerContent | null } | null;
  objectsCount: { asteroid: number, pha: number, comet: number };
  worldUnitsFor150px: number;





  isPaused: boolean;
  timeDirection: number;
  timeSpeed: TimeTravelingStepsType;
  targetDate: number;
  currentDate: number;
  isLive: boolean;
  timeTravelingStepsIndex: number;
}
type DrawerContent = "WatchList" | "Pho" | "SearchObject" | null;
type DialogContent = "Informations" | "Settings" | null;

const initialState: PopupState = {
  isPopupOpen: false,
  target: null,
  identifier: null,
  unitSystem: "metric",
  neo: null,
  neoOrbitColor: "#0866ff",
  orbits: [],
  dialog: null,
  drawer: null,
  objectsCount: { asteroid: 0, pha: 0, comet: 0 },
  worldUnitsFor150px: 0,


  currentDate: dateToJulian(new Date()),
  targetDate: dateToJulian(new Date()),
  isPaused: false,
  isLive: true,
  timeDirection: 1,
  timeTravelingStepsIndex: 0,
  timeSpeed: timeTravelingSteps[0],


};

const generalSlice = createSlice({
  name: 'celestialNavigator',
  initialState,
  reducers: {
    manageTools: (state, action: PayloadAction<{ target: "dialog" | "drawer", content: DrawerContent | DialogContent | null, open: boolean }>) => {
      const { target, content, open } = action.payload;
      const op = { isOpen: open, content: content };
      state.drawer = { isOpen: false, content: null };
      state.dialog = { isOpen: false, content: null };
      if (target === "dialog") {
        state.dialog = { ...op, content: content as DialogContent };
      } else if (target === "drawer") {
        state.drawer = { ...op, content: content as DrawerContent };
      }

    },
    openPopup: (state, action) => {
      state.isPopupOpen = true;
      state.target = action.payload.target;
      state.identifier = action.payload.identifier;
      if (action.payload.target == "NEO" && action.payload.neo) {
        state.neo = action.payload.neo;
      }
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
      state.target = null;
      state.identifier = null;
      state.neo = null;
    },
    changeUnitSystem: (state, action: PayloadAction<"us" | "metric">) => {
      state.unitSystem = action.payload;
    },
    changeNeoOrbitColor: (state, action) => {
      state.neoOrbitColor = action.payload;
    },
    addOrbit: (state, action) => {

      state.orbits = [{ ...action.payload, orbitColor: state.neoOrbitColor }];
    },
    setObjectsCount: (state, action: PayloadAction<{ asteroid: number, pha: number, comet: number }>) => {
      state.objectsCount = action.payload;
    },








    setLandMarkUnit: (state, action: PayloadAction<number>) => {


      const fov = 90 * (Math.PI / 180);

      const distance = action.payload;

      const aspectRatio = window.innerWidth / window.innerHeight;
      const worldUnits = 2 * distance * Math.tan(fov / 2) * aspectRatio;
      const worldUnitsFor150px = (150 * worldUnits) / window.innerWidth;

      state.worldUnitsFor150px = worldUnitsFor150px;
    },

    togglePause: (state) => {

      state.isPaused = !state.isPaused;
    },
    setTimeDirection: (state, action: PayloadAction<number>) => {
      if (action.payload == state.timeDirection) {
        let newStepIndex = 0;
        if (action.payload > 0) {
          newStepIndex = state.timeTravelingStepsIndex + 1;

        }
        else {
          newStepIndex = state.timeTravelingStepsIndex - 1;
        }
        if (newStepIndex < 0 || newStepIndex > timeTravelingSteps.length) {
          state.timeTravelingStepsIndex = 0;
        }
        else {
          state.timeTravelingStepsIndex = newStepIndex;
        }
      }

      else {
        state.timeTravelingStepsIndex = 0;
      }

      state.timeDirection = action.payload;
      
      state.timeSpeed = timeTravelingSteps[state.timeTravelingStepsIndex];

      state.isLive = false;
    },


    setCurrentTime: (state, action: PayloadAction<number>) => {

      state.currentDate = action.payload;

    },

    setLive: (state) => {
      state.isLive = true;

    },

  },
});


export const openPopupAndAddOrbit = (payload: { target: string, identifier: string, neo?: { kind: ObjectsType, objectData: NEOTypes, keplerianElements: keplerianElementsType } }) =>
  (dispatch: AppDispatch) => {
    dispatch(openPopup(payload));


    if (payload.target === "NEO" && payload.neo) {
      const neo = payload.neo;
      dispatch(addOrbit({ keplerianElements: neo.keplerianElements, targetObject: neo.kind, objectRef: neo.objectData.spkid }));
    }
  };


export const { openPopup,
  setLandMarkUnit,
  closePopup,
  changeUnitSystem,
  changeNeoOrbitColor,
  addOrbit,
  manageTools,
  setObjectsCount,
  togglePause,
  setTimeDirection,
  setCurrentTime,
  setLive } = generalSlice.actions;
export default generalSlice.reducer;
