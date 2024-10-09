 
import { keplerianElementsType } from '@/types/planet';
import { DISTANCE_SCALE_FACTOR  } from '@/utils/scaling';
import * as THREE from 'three';

export function calculateOrbitalPosition(time: number ,keplerianElements: keplerianElementsType): THREE.Vector3 {
    const { a, e, I, longPeri, longNode } = keplerianElements;

    const n = Math.sqrt(1 / Math.pow(a, 3));
    const M = n * time; // Mean anomaly

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