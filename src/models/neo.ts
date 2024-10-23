import { ObjectsType } from '@/types/general';
import { NEOTypes } from '@/types/NEO';
import { keplerianElementsType } from '@/types/planet';
import { objectPosition,NeoTokeplerianElementsObject } from '@/utils/keplerianElements';
import {PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';
import { or } from 'three/webgpu';
import { Orbit } from './orbit';
import { CelestialObject } from './celestialObject';


export class NEO extends CelestialObject{ 

    private static instance: NEO;
    private neoInstancedMesh: THREE.InstancedMesh;
    private mergedNeo: NEOTypes[];
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;  
    private initialized: boolean = false; 

   private constructor(scene: THREE.Scene, camera: THREE.Camera, mergedNeo: NEOTypes[], openPopup: (kind: ObjectsType, objectData: NEOTypes, keplerianElements: keplerianElementsType) => void) {
        
        super(scene, camera); 
        this.mergedNeo = mergedNeo;
       

        this.neoInstancedMesh = this.createNEOInstances(this.mergedNeo); 

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(); 
        this.setupInteractions(openPopup);
    }

    private createNEOInstances(dataList: NEOTypes[]) {
        const geometry = new THREE.SphereGeometry(1, 4, 4);
        const material = new THREE.MeshStandardMaterial();
        const count = dataList.length;
    
        const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
        this.scene.add(instancedMesh);
    
        const color = new THREE.Color();
    
        dataList.forEach((neoData, i) => {
            const size = neoData.diameter ? parseFloat(neoData.diameter) * PLANET_SIZE_SCALE_FACTOR : 1;
    
            const matrix = new THREE.Matrix4();
            matrix.makeScale(size, size, size);
            matrix.setPosition(i * 2, 0, 0); 
            instancedMesh.setMatrixAt(i, matrix);
     
            let neoColor = "#15FB2C"; 
            if (neoData.neoKind === "PHA") {
                neoColor = "#D1002D";
            } else if (neoData.neoKind === "COMET") {
                neoColor = "#D1C600";
            } 
            color.set(neoColor);
            instancedMesh.setColorAt(i,  color);
        });
       
        if (instancedMesh.instanceColor) {
            instancedMesh.instanceColor.needsUpdate = true;
        }


        instancedMesh.frustumCulled = true;
    
        return instancedMesh;
    }
    

    public update(deltaTime: number) {
 
        if (!this.initialized) {
            this.updateObjects(deltaTime, this.mergedNeo, this.neoInstancedMesh); 
      
            this.initialized = true;  // Only update once
          }
    }

    private updateObjects(deltaTime: number, dataList: NEOTypes[], instancedMesh: THREE.InstancedMesh) {
        dataList.forEach((neoData, i) => {
            const position = objectPosition(deltaTime, NeoTokeplerianElementsObject(neoData));

            const matrix = new THREE.Matrix4();
            matrix.setPosition(position.x, position.y, position.z);
            instancedMesh.setMatrixAt(i, matrix);

        });

        instancedMesh.instanceMatrix.needsUpdate = true;
    }
  
    setupInteractions(openPopup: (kind: ObjectsType, objectData: NEOTypes, keplerianElements: keplerianElementsType) => void) {
        window.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
    
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            this.raycaster.setFromCamera(this.mouse, this.camera);
    
            const neoIntersect = this.raycaster.intersectObject(this.neoInstancedMesh, true); 
            let neoData;
            let intersectedObjectPosition: THREE.Object3D<THREE.Object3DEventMap> | undefined;
    
            // Handle NEO intersection
            if (neoIntersect.length > 0) {
                const instanceId = neoIntersect[0].instanceId;
                if (instanceId !== undefined) { 
                    neoData = this.mergedNeo[instanceId];
                    intersectedObjectPosition = neoIntersect[0].object;
 
    
                    if (intersectedObjectPosition instanceof THREE.InstancedMesh) {
                        const matrix = new THREE.Matrix4();
                        intersectedObjectPosition.getMatrixAt(instanceId, matrix);
                        const position = new THREE.Vector3();
                        position.setFromMatrixPosition(matrix);
    
                        console.log('Instance Position:', position); 
                        this.onClickCamera(position, true);   
                    }
                }
            }
        
    
            if (neoData  !== undefined) {
                openPopup(neoData.neoKind, neoData, NeoTokeplerianElementsObject(neoData));
            }
        });
    }
    
    public static getInstance(scene: THREE.Scene, camera: THREE.Camera, mergedNeo: NEOTypes[], openPopup: (kind: ObjectsType, objectData: NEOTypes, keplerianElements: keplerianElementsType) => void): NEO {
        if (!NEO.instance) {
            NEO.instance = new NEO(scene, camera, mergedNeo, openPopup);
        }
        return NEO.instance;
      }
    
}


