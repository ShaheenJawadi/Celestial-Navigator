 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three';


const epsilon = 1e-6; // Accuracy for Newton's method

  export function calculateOrbitalPosition(
    julianDate: number,
    keplerianElements: keplerianElementsType
): THREE.Vector3 {
    const { a, e, I, longPeri, longNode, L } = keplerianElements;

    // 1. Calculate mean anomaly (M)
    const M = (L - longPeri) % (2 * Math.PI);
    const normalizeAngle = (angle: number) => (angle + 2 * Math.PI) % (2 * Math.PI);

    // Normalize M to be between 0 and 2π
    const M_norm = normalizeAngle(M);

    // 2. Solve for eccentric anomaly (E) using Newton's method
    let E = M_norm; // Initial guess for E
    let delta = 1;
    while (Math.abs(delta) > epsilon) {
        delta = (E - e * Math.sin(E) - M_norm) / (1 - e * Math.cos(E));
        E -= delta;
    }

    // 3. Calculate the true anomaly (ν)
    const nu = 2 * Math.atan2(
        Math.sqrt(1 + e) * Math.sin(E / 2),
        Math.sqrt(1 - e) * Math.cos(E / 2)
    );

    // 4. Calculate the distance (r)
    const r = a * (1 - e * Math.cos(E));

    // 5. Calculate the position in the orbital plane (x', y')
    const xOrbital = r * Math.cos(nu);
    const yOrbital = r * Math.sin(nu);

    // 6. Rotate into 3D space
    const cosI = Math.cos(I);
    const sinI = Math.sin(I);
    const cosNode = Math.cos(longNode);
    const sinNode = Math.sin(longNode);
    const cosPeri = Math.cos(longPeri);
    const sinPeri = Math.sin(longPeri);

    const x = xOrbital * (cosNode * cosPeri - sinNode * sinPeri * cosI) -
              yOrbital * (cosNode * sinPeri + sinNode * cosPeri * cosI);

    const y = xOrbital * (sinNode * cosPeri + cosNode * sinPeri * cosI) -
              yOrbital * (sinNode * sinPeri - cosNode * cosPeri * cosI);

    const z = xOrbital * (sinPeri * sinI) + yOrbital * (cosPeri * sinI);

  
    return new THREE.Vector3(
        x * DISTANCE_SCALE_FACTOR,
        z * DISTANCE_SCALE_FACTOR,
        y * DISTANCE_SCALE_FACTOR
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
    let A = Math.floor((14 - month) / 12);
    const y = year + 4800 - A;
    const m = month + 12 * A - 3;

    const julianDay = day + Math.floor((153 * m + 2) / 5) +
        365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    // Add fractional day
    const fractionalDay = (hour / 24) + (minute / 1440) + (second / 86400);
    
    return julianDay + fractionalDay;
}
