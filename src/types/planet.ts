
export type planetType = {
    name: string;
    texture: string;
    color: string;
    radius: number;

    keplerianElements: keplerianElementsType
}

export type keplerianElementsType = {
    a: number; // semi-major axis
    e: number; // eccentricity
    I: number; // inclination
    L: number; // mean longitude
    longPeri: number; // longitude of perihelion
    longNode: number; // longitude of ascending node
}

/* ***********************  */

type UnitSystem = {
    value: string;
    unit: string;
}


export type PlanetProperty ={
    label: string;
    us: UnitSystem;
    metric: UnitSystem;
}
 
export type planetInfoType = {
    [planetName: string]: PlanetProperty[];   
};
 