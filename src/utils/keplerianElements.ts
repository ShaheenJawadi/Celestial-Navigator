 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three'; 
import { NEOTypes } from '@/types/NEO';
import { degreesToRadians } from './conversionHelpers';


export function calculateOrbitalPosition(  keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e, I, longPeri, longNode, L } = keplerianElements;

    // Calculate mean anomaly
    const meanAnomaly = degreesToRadians(L - longPeri);

    // Solve for eccentric anomaly using Newton's method
    const eccentricAnomaly = solveEccentricAnomaly(meanAnomaly, e);

    // Calculate the true anomaly
    const trueAnomaly = 2 * Math.atan2(
        Math.sqrt(1 + e) * Math.sin(eccentricAnomaly / 2),
        Math.sqrt(1 - e) * Math.cos(eccentricAnomaly / 2)
    );

    // Distance from the focus (sun) to the planet at the given time
    const r = a * (1 - e * Math.cos(eccentricAnomaly));

    // Position in orbital plane (x', y')
    const xPrime = r * Math.cos(trueAnomaly);
    const yPrime = r * Math.sin(trueAnomaly);

    // Inclination, longitude of ascending node, and argument of periapsis to rotate to 3D
    const I_rad = degreesToRadians(I);                // Inclination
    const longNode_rad = degreesToRadians(longNode);  // Longitude of ascending node
    const argPeri_rad = degreesToRadians(longPeri - longNode); // Argument of periapsis
    
    // Calculate the 3D position using rotation matrices
    const x = (Math.cos(longNode_rad) * Math.cos(argPeri_rad) - Math.sin(longNode_rad) * Math.sin(argPeri_rad) * Math.cos(I_rad)) * xPrime
            + (-Math.cos(longNode_rad) * Math.sin(argPeri_rad) - Math.sin(longNode_rad) * Math.cos(argPeri_rad) * Math.cos(I_rad)) * yPrime;
    
    const y = (Math.sin(longNode_rad) * Math.cos(argPeri_rad) + Math.cos(longNode_rad) * Math.sin(argPeri_rad) * Math.cos(I_rad)) * xPrime
            + (-Math.sin(longNode_rad) * Math.sin(argPeri_rad) + Math.cos(longNode_rad) * Math.cos(argPeri_rad) * Math.cos(I_rad)) * yPrime;

    const z = (Math.sin(argPeri_rad) * Math.sin(I_rad)) * xPrime
            + (Math.cos(argPeri_rad) * Math.sin(I_rad)) * yPrime;

    // Return as a THREE.Vector3
    return new THREE.Vector3(x*100, y*100, z*100);
}

// Solve Kepler's Equation using Newton's Method to find the Eccentric Anomaly
function solveEccentricAnomaly(M: number, e: number, tolerance: number = 1e-6): number {
    let E = M; // Start with mean anomaly as the first guess
    let delta = 1;
    while (Math.abs(delta) > tolerance) {
        delta = E - e * Math.sin(E) - M;
        E = E - delta / (1 - e * Math.cos(E));
    }
    return E;
}


 


export function NeoTokeplerianElementsObject(neo: NEOTypes): keplerianElementsType {

    return {
        a: parseFloat(neo.a),
        e: parseFloat(neo.e),
        L: parseFloat(neo.ma) + parseFloat(neo.w) + parseFloat(neo.om),
        I:parseFloat(neo.i),
        longNode: parseFloat(neo.om),
        longPeri: parseFloat(neo.w)
    };
}
