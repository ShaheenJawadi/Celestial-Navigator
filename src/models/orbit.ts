import * as THREE from 'three';
import { keplerianElementsType } from '@/types/planet';
import { calculateOrbitalPosition, planetPosition } from '@/utils/keplerianElements';
import { ObjectsType } from '@/types/general';
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'
import { degreesToRadians } from '@/utils/conversionHelpers';
export class Orbit {
    private keplerianElements: keplerianElementsType;
    private orbitColor: string;
    private targetObject: ObjectsType;
    private instancedMesh: THREE.InstancedMesh | null = null;

    constructor(keplerianElements: keplerianElementsType, orbitColor: string, targetObject: ObjectsType) {
        this.keplerianElements = keplerianElements;
        this.orbitColor = orbitColor;
        this.targetObject = targetObject;
   
    }
 

    drawOrbit(scene: THREE.Scene) {
        scene.add( this.createPlanetOrbitInstanced());
    }

  
 
    removeOrbit(scene: THREE.Scene) {
        if (this.instancedMesh) {
            scene.remove(this.instancedMesh);  
            this.instancedMesh.geometry.dispose();
            if (Array.isArray(this.instancedMesh.material)) {
                this.instancedMesh.material.forEach((material) => {
                    if (material && typeof material.dispose === 'function') {
                        material.dispose();
                    }
                });
            } else {
                this.instancedMesh.material.dispose(); 
            }
            this.instancedMesh = null;
        }
    }


   
    


    createPlanetOrbitInstanced( ): THREE.Line {
        const { a, e } = this.keplerianElements;
    
        const segments = Math.max(32, Math.floor(a * 100));
        const points: THREE.Vector3[] = [];
    
        // Create points along the orbit by varying the true anomaly
        for (let i = 0; i <= segments; i++) {
            const trueAnomaly = (i / segments) * 2 * Math.PI;
    
            // Calculate the radius (distance) at this true anomaly
            const r = a * (1 - e * e) / (1 + e * Math.cos(trueAnomaly));
     
            points.push(calculateOrbitalPosition(this.keplerianElements , r , trueAnomaly)); 
        }
    
        // Create geometry from the points
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
        // Create the material for the orbit line
        const material = new THREE.LineBasicMaterial({ color: this.orbitColor });
    
        // Create the line (orbit) and return it
        return new THREE.Line(geometry, material);
    }
 

   
}
