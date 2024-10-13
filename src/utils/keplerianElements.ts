 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three';

const PERIHELION_THRESHOLD = 0.3;  // AU
 
export function calculateOrbitalPosition(julianDate: number, keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e, I, longPeri, longNode, L } = keplerianElements;

    const T0 = 2451545.0; // Julian Date for January 1, 2000 (UTC)
    const daysSinceEpoch = julianDate - T0; // Days since epoch

    const n = Math.sqrt(1 / Math.pow(a, 3));  // Mean motion (in rad/day)
    const M = (n * daysSinceEpoch) + L;  // Mean anomaly

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


export function julianDate(date: Date): number {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth() is 0-indexed
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    // Calculate the Julian Date
    const A = Math.floor((14 - month) / 12);
    const y = year + 4800 - A;
    const m = month + 12 * A - 3;

    const julianDay = day + Math.floor((153 * m + 2) / 5) +
        365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    // Add fractional day
    const fractionalDay = (hour / 24) + (minute / 1440) + (second / 86400);
    
    return julianDay + fractionalDay;
}
