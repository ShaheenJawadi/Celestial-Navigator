import { TimeTravelingStepsType } from "@/types/general";
import { step } from "three/webgpu";

export const SUN_SCALE_FACTOR = 1 / 50000;
export const PLANET_SIZE_SCALE_FACTOR = 1 / 2000;
export const DISTANCE_SCALE_FACTOR = 100;
export const ORBIT_SEGMENTS = 200;


export const timeTravelingSteps: TimeTravelingStepsType[] = [{
    step: 1 / 365.25,
    label: "1 day",
},
{
    step: 7 / 365.25,
    label: "1 week",
},
{
    step: 1 / 12,
    label: "1 month",
},
{
    step: 0.5,
    label: "6 months",
},
{
    step: 1,
    label: "1 year",
},
{
    step: 2,
    label: "2 years",
},
{
    step: 3,
    label: "3 years",
}];

export const maxDate = 2469807.5000000;
export const minDate = 2378496.5000000;