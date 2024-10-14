import { NEOTypes } from '@/types/NEO';
import { keplerianElementsType } from '@/types/planet';
import { calculateOrbitalPosition, degreesToRadians } from '@/utils/keplerianElements';
import { DISTANCE_SCALE_FACTOR, ORBIT_SEGMENTS, PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';
import { or } from 'three/webgpu';
 

export class NEO {
    private scene: THREE.Scene;
    private neoInstancedMesh: THREE.InstancedMesh;
    private phaInstancedMesh: THREE.InstancedMesh;
    private cometInstancedMesh: THREE.InstancedMesh;
    private neoDataList: NEOTypes[];
    private phaDataList: NEOTypes[];
    private cometDataList: NEOTypes[];
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2; 
    private camera: THREE.Camera;
    private currentOrbit: THREE.Line | null = null; 

    constructor(scene: THREE.Scene, camera: THREE.Camera, neaDataList: NEOTypes[], CometList: NEOTypes[], PHAList: NEOTypes[]) {
        this.scene = scene;
        this.neoDataList = neaDataList;
        this.phaDataList = PHAList;
        this.cometDataList = CometList;

        this.neoInstancedMesh = this.createNEOInstances(this.neoDataList, "#15FB2C", 0.15);
        this.phaInstancedMesh = this.createNEOInstances(this.phaDataList, "#D1002D", 0.2);
        this.cometInstancedMesh = this.createNEOInstances(this.cometDataList, "#D1C600", 1);

       
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;  
        window.addEventListener('click', this.onMouseClick.bind(this), false);
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

    private onMouseClick(event: MouseEvent) {
        event.preventDefault();

     
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

   
        this.raycaster.setFromCamera(this.mouse, this.camera);

 
        const neoIntersect = this.raycaster.intersectObject(this.neoInstancedMesh, true);
        const phaIntersect = this.raycaster.intersectObject(this.phaInstancedMesh, true);
        const cometIntersect = this.raycaster.intersectObject(this.cometInstancedMesh, true);

        if (neoIntersect.length > 0) {
            const instanceId = neoIntersect[0].instanceId;
            if (instanceId !== undefined) {
                this.handleNEOClick('NEO', instanceId);
            }
        } else if (phaIntersect.length > 0) {
            const instanceId = phaIntersect[0].instanceId;
            if (instanceId !== undefined) {
                this.handleNEOClick('PHA', instanceId);
            }
        } else if (cometIntersect.length > 0) {
            const instanceId = cometIntersect[0].instanceId;
            if (instanceId !== undefined) {
                this.handleNEOClick('Comet', instanceId);
            }
        }
    }
    private handleNEOClick(type: string, instanceId: number) {
        let neoData;
        if (type === 'NEO') {
            neoData = this.neoDataList[instanceId];
        } else if (type === 'PHA') {
            neoData = this.phaDataList[instanceId];
        } else   {
            neoData = this.cometDataList[instanceId];
        }
 
        console.log(`Clicked ${type}:`, neoData);
       
        this.drawOrbit(neoData);
 
    }

  private drawOrbit(neo: NEOTypes) {
    
        if (this.currentOrbit) {
            this.scene.remove(this.currentOrbit);
            this.currentOrbit.geometry.dispose();  
        }
    
        const orbitPoints: THREE.Vector3[] = [];
        const totalSegments = 5000;  
    
        for (let i = 0; i <= totalSegments; i++) {
            const t = (i / totalSegments) * 365;  
            const position = calculateOrbitalPosition(t, this.keplerianElementsObject(neo));
            orbitPoints.push(position);
        }
    
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, opacity: 0.5, transparent: true });
        this.currentOrbit = new THREE.Line(orbitGeometry, orbitMaterial);
        this.scene.add(this.currentOrbit);
    }
    
 


    
    
}


 