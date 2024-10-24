import { keplerianElementsType } from "./planet";
import * as THREE from 'three';

export type ObjectsType ="PLANET" | "ASTEROID" | "COMET" | "PHA" ;


export type OrbitType = {

     keplerianElements: keplerianElementsType;
     orbitColor: string;
     targetObject: ObjectsType
     objectRef: any;

}

export type TimeTravelingStepsType={
     step: number;
     label: string;
}