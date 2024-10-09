import { NEOTypes } from '@/types/NEO';
import { keplerianElementsType } from '@/types/planet';
import { calculateOrbitalPosition, degreesToRadians } from '@/utils/keplerianElements';
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
        const geometry = new THREE.SphereGeometry(defaultSize, 4,4);
        const material = new THREE.MeshStandardMaterial({ color });
        const count = dataList.length;

        const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
        this.scene.add(instancedMesh);

        dataList.forEach((neoData, i) => {
            const size = neoData.diameter ? parseFloat(neoData.diameter) * PLANET_SIZE_SCALE_FACTOR : defaultSize;
         

            const matrix = new THREE.Matrix4();
            matrix.makeScale(size, size, size);
            matrix.identity();
        
            instancedMesh.setMatrixAt(i, matrix);
        });

        return instancedMesh;
    }
 

    public update(deltaTime: number) {

        this.updateObjects(deltaTime,this.neoDataList, this.neoInstancedMesh);

        this.updateObjects(deltaTime,this.phaDataList, this.phaInstancedMesh);

        this.updateObjects(deltaTime,this.cometDataList, this.cometInstancedMesh);
    }

    private updateObjects(deltaTime: number,dataList: NEOTypes[], instancedMesh: THREE.InstancedMesh) {
        dataList.forEach((neoData, i) => {
            const position = calculateOrbitalPosition( deltaTime ,this.keplerianElementsObject(neoData));

            const matrix = new THREE.Matrix4();
            matrix.setPosition(position.x, position.y, position.z);
            instancedMesh.setMatrixAt(i, matrix);
        });

        instancedMesh.instanceMatrix.needsUpdate = true;
    }

 

    private keplerianElementsObject(neo: NEOTypes): keplerianElementsType {

        return   {
            a: parseFloat(neo.a),                   
            e: parseFloat(neo.e),     
            L: degreesToRadians(parseFloat(neo.ma) + parseFloat(neo.w) +   parseFloat(neo.om)),               
            I: degreesToRadians(parseFloat(neo.i)),  
            longNode: degreesToRadians(parseFloat(neo.om)),  
            longPeri: degreesToRadians(parseFloat(neo.w))    
        };
    }


}