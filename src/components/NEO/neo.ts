import { NEOTypes } from '@/types/NEO';
import { DISTANCE_SCALE_FACTOR, PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';

export class NEO {
    private scene: THREE.Scene;
    private neoInstancedMesh: THREE.InstancedMesh;
    private phaInstancedMesh: THREE.InstancedMesh;
    private cometInstancedMesh: THREE.InstancedMesh;
    private neoDataList: NEOTypes[];
    private phaDataList: NEOTypes[];
    private cometDataList: NEOTypes[];


    constructor(scene: THREE.Scene, neaDataList: NEOTypes[], CometList: NEOTypes[], PHAList: NEOTypes[]) {
        this.scene = scene;
        this.neoDataList = neaDataList;
        this.phaDataList = PHAList;
        this.cometDataList = CometList;

        this.neoInstancedMesh = this.createNEOInstances(this.neoDataList, "#15FB2C", 0.15);
        this.phaInstancedMesh = this.createNEOInstances(this.phaDataList, "#D1002D", 0.2);
        this.cometInstancedMesh = this.createNEOInstances(this.cometDataList, "#D1C600", 0.2);
    }

    private createNEOInstances(dataList: NEOTypes[], color: string, defaultSize: number) {
        const geometry = new THREE.SphereGeometry(defaultSize, 8, 8);
        const material = new THREE.MeshStandardMaterial({ color });
        const count = dataList.length;

        const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
        this.scene.add(instancedMesh);

        dataList.forEach((neoData, i) => {
            const size = neoData.diameter ? parseFloat(neoData.diameter) * PLANET_SIZE_SCALE_FACTOR : defaultSize;
            const position = this.calculatePositionFromOrbitalElements(neoData);

            const matrix = new THREE.Matrix4();
            matrix.makeScale(size, size, size);
            matrix.identity();
            matrix.setPosition(position.x, position.y, position.z);
            instancedMesh.setMatrixAt(i, matrix);
        });

        return instancedMesh;
    }
    private calculatePositionFromOrbitalElements(neo: NEOTypes) {
        const a = parseFloat(neo.a) * DISTANCE_SCALE_FACTOR; // Semi-major axis in AU, scaled
        const e = parseFloat(neo.e); // Eccentricity
        const i = this.degreesToRadians(parseFloat(neo.i)); // Inclination in radians
        const om = this.degreesToRadians(parseFloat(neo.om)); // Longitude of the ascending node in radians
        const w = this.degreesToRadians(parseFloat(neo.w)); // Argument of periapsis in radians
        const ma = this.degreesToRadians(parseFloat(neo.ma)); // Mean anomaly in radians

        // Calculate the true anomaly (nu) using Kepler's equation
        const E = this.meanAnomalyToEccentricAnomaly(ma, e); // Convert Mean Anomaly to Eccentric Anomaly
        const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2)); // True anomaly

        // Calculate the distance from the sun at the true anomaly
        const r = a * (1 - e * Math.cos(E)); // Distance from the sun in AU

        // Calculate Cartesian coordinates in the orbital plane
        const xOrbital = r * Math.cos(nu); // X position in the orbital plane
        const yOrbital = r * Math.sin(nu); // Y position in the orbital plane

        // Apply the rotation by the ascending node and the inclination
        const x = (xOrbital * Math.cos(om)) - (yOrbital * Math.sin(om) * Math.cos(i));
        const y = (yOrbital * Math.sin(i)); // Elevation based on inclination
        const z = (xOrbital * Math.sin(om)) + (yOrbital * Math.cos(om) * Math.cos(i));

        // Return the final position
        return new THREE.Vector3(x, y, z); // Return unscaled position
    }





    private meanAnomalyToEccentricAnomaly(M: number, e: number): number {
        let E = M; // Initial guess for E
        let deltaE = 0;

        // Iterate to solve for E using Newton's method
        for (let j = 0; j < 10; j++) {
            deltaE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
            E += deltaE;

            if (Math.abs(deltaE) < 1e-6) break; // Convergence check
        }

        return E;
    }

    public update(deltaTime: number) {

        this.updateObjects(this.neoDataList, this.neoInstancedMesh);

        this.updateObjects(this.phaDataList, this.phaInstancedMesh);

        this.updateObjects(this.cometDataList, this.cometInstancedMesh);
    }

    private updateObjects(dataList: NEOTypes[], instancedMesh: THREE.InstancedMesh) {
        dataList.forEach((neoData, i) => {
            const position = this.calculatePositionFromOrbitalElements(neoData);

            const matrix = new THREE.Matrix4();
            matrix.setPosition(position.x, position.y, position.z);
            instancedMesh.setMatrixAt(i, matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;
    }

    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

}