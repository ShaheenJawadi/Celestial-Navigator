import * as THREE from 'three';

const SCALE_FACTOR = 150;
const ORBIT_SEGMENTS = 1000;  

export class Planet {
    mesh: THREE.Mesh; 
    currentTime: number = 0;
    keplerianElements: {
        a: number; // semi-major axis
        e: number; // eccentricity
        I: number; // inclination
        L: number; // mean longitude
        longPeri: number; // longitude of perihelion
        longNode: number; // longitude of ascending node
    };
    orbitLine: THREE.Line; // To store the orbit line

    constructor(scene: THREE.Scene, radius: number, color: number, elements: any) {
        this.keplerianElements = elements;

        // Create the planet mesh
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color });
        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

        // Create the orbit line and add it to the scene
        this.orbitLine = this.createOrbitLine();
        scene.add(this.orbitLine);
    }

    update(timeIncrement: number) {
        this.currentTime += timeIncrement;

        // Update the planet position
        const position = this.calculateOrbitalPosition(this.currentTime);
        this.mesh.position.copy(position);
    }

    // Method to calculate the orbital position based on time
    calculateOrbitalPosition(time: number): THREE.Vector3 {
        const { a, e, I, longPeri, longNode } = this.keplerianElements;
 
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
 
        return new THREE.Vector3(xFinal * SCALE_FACTOR, z * SCALE_FACTOR, yFinal * SCALE_FACTOR);
    }
 
    createOrbitLine(): THREE.Line {
        const points: THREE.Vector3[] = [];
 
        for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
            const time = (i / ORBIT_SEGMENTS) * 2 * Math.PI; // Full orbit
            const position = this.calculateOrbitalPosition(time);
            points.push(position);
        }
 
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
 
        return new THREE.Line(orbitGeometry, orbitMaterial);
    }
}
