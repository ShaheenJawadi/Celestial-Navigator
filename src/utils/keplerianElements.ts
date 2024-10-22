 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three';
import { degreesToRadians } from './conversionHelpers';
import { NEOTypes } from '@/types/NEO';

export function calculateOrbitalPosition(julianDate: number, keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e, I, longPeri, longNode, L } = keplerianElements;

    // J2000 epoch
    const T0 = 2451545.0; 
    const daysSinceEpoch = julianDate - T0;

    // Mean motion (n), in radians per day
    const n = Math.sqrt(1 / Math.pow(a, 3)); 

    // Corrected Mean anomaly (M), making sure it is within 0 to 2π
    const M = ((n * daysSinceEpoch + (L - longPeri)) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    // Solve Kepler's equation for Eccentric Anomaly (E)
    let E = M;
    const tolerance = 1e-10;
    let delta = 1;

    // Iterate to solve for Eccentric Anomaly
    while (Math.abs(delta) > tolerance) {
        delta = E - e * Math.sin(E) - M;
        E -= delta / (1 - e * Math.cos(E));
    }

    // True anomaly (ν or θ)
    const trueAnomaly = 2 * Math.atan2(
        Math.sqrt(1 + e) * Math.sin(E / 2),
        Math.sqrt(1 - e) * Math.cos(E / 2)
    );

    // Distance to the Sun (r)
    const r = a * (1 - e * Math.cos(E));

    // Orbital plane coordinates (perifocal)
    const xOrbital = r * Math.cos(trueAnomaly);
    const yOrbital = r * Math.sin(trueAnomaly);

    // Rotation matrices to convert to 3D heliocentric coordinates
    const cosI = Math.cos(I);
    const sinI = Math.sin(I);
    const cosNode = Math.cos(longNode);
    const sinNode = Math.sin(longNode);
    const cosPeri = Math.cos(longPeri);
    const sinPeri = Math.sin(longPeri);

    // Transforming to heliocentric coordinates
    const X = (cosNode * cosPeri - sinNode * sinPeri * cosI) * xOrbital
        + (-cosNode * sinPeri - sinNode * cosPeri * cosI) * yOrbital;
    const Y = (sinNode * cosPeri + cosNode * sinPeri * cosI) * xOrbital
        + (-sinNode * sinPeri + cosNode * cosPeri * cosI) * yOrbital;
    const Z = (sinPeri * sinI) * xOrbital + (cosPeri * sinI) * yOrbital;

    return new THREE.Vector3(X * DISTANCE_SCALE_FACTOR, Z * DISTANCE_SCALE_FACTOR, Y * DISTANCE_SCALE_FACTOR);
}
 



export function NeoTokeplerianElementsObject(neo: NEOTypes): keplerianElementsType {

    return {
        a: parseFloat(neo.a),
        e: parseFloat(neo.e),
        L: degreesToRadians(parseFloat(neo.ma) + parseFloat(neo.w) + parseFloat(neo.om)),
        I: degreesToRadians(parseFloat(neo.i)),
        longNode: degreesToRadians(parseFloat(neo.om)),
        longPeri: degreesToRadians(parseFloat(neo.w))
    };
}
