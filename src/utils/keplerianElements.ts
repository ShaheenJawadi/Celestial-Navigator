 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three';


/* 
export function calculateOrbitalPosition(time: number ,keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e, I, longPeri, longNode ,L } = keplerianElements;

    const n = Math.sqrt(1 / Math.pow(a, 3));
    const M = (n * time )+L; // Mean anomaly

    let E = M;
    const tolerance = 1e-6;
    let delta = 1;

    while (Math.abs(delta) > tolerance) {
        delta = E - e * Math.sin(E) - M;
        E -= delta / (1 - e * Math.cos(E));
    }

    const trueAnomaly = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2),
        Math.sqrt(1 - e) * Math.cos(E / 2));

    const r = a * (1 - e * Math.cos(E));

    const x = r * Math.cos(trueAnomaly + longPeri);
    const y = r * Math.sin(trueAnomaly + longPeri);

    const z = y * Math.sin(I);
    const yInclined = y * Math.cos(I);

    const xFinal = x * Math.cos(longNode) - yInclined * Math.sin(longNode);
    const yFinal = x * Math.sin(longNode) + yInclined * Math.cos(longNode);

    return new THREE.Vector3(xFinal * DISTANCE_SCALE_FACTOR, z * DISTANCE_SCALE_FACTOR, yFinal * DISTANCE_SCALE_FACTOR);
}

 */ 
const PERIHELION_THRESHOLD = 0.3;  // AU

export function calculateOrbitalPosition(time: number, keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e, I, longPeri, longNode, L } = keplerianElements;

    const n = Math.sqrt(1 / Math.pow(a, 3));  // Mean motion
    const M = (n * time) + L;  // Mean anomaly

    let E = M;  // Eccentric anomaly
    const tolerance = 1e-6;
    let delta = 1;

    // Solve Kepler's equation iteratively
    while (Math.abs(delta) > tolerance) {
        delta = E - e * Math.sin(E) - M;
        E -= delta / (1 - e * Math.cos(E));
    }

    const trueAnomaly = 2 * Math.atan2(
        Math.sqrt(1 + e) * Math.sin(E / 2),
        Math.sqrt(1 - e) * Math.cos(E / 2)
    );

    const r = a * (1 - e * Math.cos(E));  // Distance from the Sun
    const perihelion = a * (1 - e);  // Calculate perihelion distance

    const x = r * Math.cos(trueAnomaly + longPeri);
    const y = r * Math.sin(trueAnomaly + longPeri);

    const z = y * Math.sin(I);  // Inclination (Z-axis offset)
    const yInclined = y * Math.cos(I);

    const xFinal = x * Math.cos(longNode) - yInclined * Math.sin(longNode);
    const yFinal = x * Math.sin(longNode) + yInclined * Math.cos(longNode);
 

    // Adjust position if perihelion is below the threshold
    if (perihelion < PERIHELION_THRESHOLD) {
        // If below threshold, keep it at the threshold distance from the Sun
        const adjustedR = PERIHELION_THRESHOLD; 
        return new THREE.Vector3(
            xFinal * (adjustedR / perihelion) * DISTANCE_SCALE_FACTOR,
            z * DISTANCE_SCALE_FACTOR,
            yFinal * (adjustedR / perihelion) * DISTANCE_SCALE_FACTOR
        );
    }

    return new THREE.Vector3(
        xFinal * DISTANCE_SCALE_FACTOR,
        z * DISTANCE_SCALE_FACTOR,
        yFinal * DISTANCE_SCALE_FACTOR
    );
}



export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}


function julianDate(date: Date): number {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();




    let adjustedYear = year;
    let adjustedMonth = month;
    if (adjustedMonth <= 2) {
        adjustedYear -= 1;
        adjustedMonth += 12;
    }
    const A = Math.floor(adjustedYear / 100);
    const B = 2 - A + Math.floor(A / 4);
 
    let jd = Math.floor(365.25 * (adjustedYear + 4716)) +
             Math.floor(30.6001 * (adjustedMonth + 1)) +
             day + B - 1524.5;
    jd += (hour + minute / 60) / 24;
    return jd;
}
