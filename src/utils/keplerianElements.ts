 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three'; 
import { NEOTypes } from '@/types/NEO';
import { degreesToRadians } from './conversionHelpers';

const GM = 1.32712440018e20; // Gravitational parameter for the Sun in m^3/s^2

export function planetPosition(  keplerianElements: keplerianElementsType): THREE.Vector3 {
    const {a,e,longPeri, L } = keplerianElements;
       // Calculate mean anomaly
       const meanAnomaly = degreesToRadians(L - longPeri);


       const eccentricAnomaly = solveEccentricAnomaly(meanAnomaly, e);

       // Calculate the true anomaly
       const trueAnomaly = 2 * Math.atan2(
           Math.sqrt(1 + e) * Math.sin(eccentricAnomaly / 2),
           Math.sqrt(1 - e) * Math.cos(eccentricAnomaly / 2)
       );
   
       // Distance from the focus (sun) to the planet at the given time
       const r = a * (1 - e * Math.cos(eccentricAnomaly));

    return calculateOrbitalPosition(keplerianElements,r, trueAnomaly);
}


export function objectPosition( julianDate:number, keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e,longPeri,  L } = keplerianElements;

    // Calculate time since epoch (J2000)
    const T = (julianDate - 2451545.0) * 86400; // Time difference in seconds

    // Calculate mean anomaly at current time
    const meanMotion = calculateMeanMotion(a); // Mean motion in rad/s
    const meanAnomaly = (degreesToRadians(L - longPeri) + meanMotion * T) % (2 * Math.PI); // M = M0 + n * t
    const eccentricAnomaly = solveEccentricAnomaly(meanAnomaly, e);

    // Calculate the true anomaly
    const trueAnomaly = 2 * Math.atan2(
        Math.sqrt(1 + e) * Math.sin(eccentricAnomaly / 2),
        Math.sqrt(1 - e) * Math.cos(eccentricAnomaly / 2)
    );

    // Distance from the focus (sun) to the planet at the given time
    const r = a * (1 - e * Math.cos(eccentricAnomaly));

    return calculateOrbitalPosition(keplerianElements,r , trueAnomaly);

}
export function calculateOrbitalPosition(  keplerianElements: keplerianElementsType , r:number ,trueAnomaly:number ): THREE.Vector3 {
    const {  I, longPeri, longNode } = keplerianElements;

 

    // Solve for eccentric anomaly using Newton's method


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
    return new THREE.Vector3(x*DISTANCE_SCALE_FACTOR, y*DISTANCE_SCALE_FACTOR, z*DISTANCE_SCALE_FACTOR);
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


function calculateMeanMotion(a: number): number {
    // Convert AU to meters for a
    const a_meters = a * 1.496e11; // 1 AU = 1.496e11 meters
    return Math.sqrt(GM / Math.pow(a_meters, 3)); // Mean motion in rad/s
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
