import { NEOTypes } from '@/types/NEO';
import { keplerianElementsType } from '@/types/planet';
import { degreesToRadians } from '@/utils/conversionHelpers';
import { calculateOrbitalPosition} from '@/utils/keplerianElements';
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

    constructor(scene: THREE.Scene, camera: THREE.Camera, neaDataList: NEOTypes[], CometList: NEOTypes[], PHAList: NEOTypes[], openPopup: (kind: string, objectData:NEOTypes) => void , orbitColor: string) {
        this.scene = scene;
        this.neoDataList = neaDataList;
        this.phaDataList = PHAList;
        this.cometDataList = CometList;

        this.neoInstancedMesh = this.createNEOInstances(this.neoDataList, "#15FB2C", 1);
        this.phaInstancedMesh = this.createNEOInstances(this.phaDataList, "#D1002D", 1);
        this.cometInstancedMesh = this.createNEOInstances(this.cometDataList, "#D1C600", 1);


        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;
      //  window.addEventListener('click', this.onMouseClick.bind(this), false);
        this.setupInteractions(openPopup ,orbitColor);
    }

    private createNEOInstances(dataList: NEOTypes[], color: string, defaultSize: number) {
        const geometry = new THREE.SphereGeometry(defaultSize, 4, 4);
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

        this.updateObjects(deltaTime, this.neoDataList, this.neoInstancedMesh);

        this.updateObjects(deltaTime, this.phaDataList, this.phaInstancedMesh);

        this.updateObjects(deltaTime, this.cometDataList, this.cometInstancedMesh);
    }

    private updateObjects(deltaTime: number, dataList: NEOTypes[], instancedMesh: THREE.InstancedMesh) {
        dataList.forEach((neoData, i) => {
            const position = calculateOrbitalPosition(deltaTime, this.keplerianElementsObject(neoData));

            const matrix = new THREE.Matrix4();
            matrix.setPosition(position.x, position.y, position.z);
            instancedMesh.setMatrixAt(i, matrix);

        });

        instancedMesh.instanceMatrix.needsUpdate = true;
    }



    private keplerianElementsObject(neo: NEOTypes): keplerianElementsType {

        return {
            a: parseFloat(neo.a),
            e: parseFloat(neo.e),
            L: degreesToRadians(parseFloat(neo.ma) + parseFloat(neo.w) + parseFloat(neo.om)),
            I: degreesToRadians(parseFloat(neo.i)),
            longNode: degreesToRadians(parseFloat(neo.om)),
            longPeri: degreesToRadians(parseFloat(neo.w))
        };
    }


    setupInteractions( openPopup: (kind: string,  objectData:NEOTypes) => void ,orbitColor: string) {
        window.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    
            this.raycaster.setFromCamera(this.mouse, this.camera);

            const neoIntersect = this.raycaster.intersectObject(this.neoInstancedMesh, true);
            const phaIntersect = this.raycaster.intersectObject(this.phaInstancedMesh, true);
            const cometIntersect = this.raycaster.intersectObject(this.cometInstancedMesh, true);
            let neoData;
         
            if (neoIntersect.length > 0) {
              
                const instanceId = neoIntersect[0].instanceId;
                if (instanceId !== undefined) {
                    console.log(instanceId);
                     neoData = this.neoDataList[instanceId];
                     openPopup('Astroid', neoData);
                }
            } else if (phaIntersect.length > 0) {
            
                const instanceId = phaIntersect[0].instanceId;
                if (instanceId !== undefined) {
                    console.log(instanceId);
                      neoData = this.phaDataList[instanceId];
                      openPopup('PHA', neoData);
                }
            } else if (cometIntersect.length > 0) {
            
                const instanceId = cometIntersect[0].instanceId;
                if (instanceId !== undefined) {
                    console.log(instanceId);
                     neoData = this.cometDataList[instanceId];
                     openPopup('Comet', neoData);
                }
            }
            if(neoData){
                this.drawOrbit(neoData , orbitColor);
            }     
        });
    }
   



    private drawOrbit1(neo: NEOTypes , orbitColor: string) { 

        if (this.currentOrbit) {
            this.scene.remove(this.currentOrbit);
            this.currentOrbit.geometry.dispose();
        }

        const orbitPoints: THREE.Vector3[] = [];
        const totalSegments = 1000;
        const orbitalPeriod = this.getOrbitalPeriod(this.keplerianElementsObject(neo).a); 
        for (let i = 0; i <= totalSegments; i++) {
            const t = (i / totalSegments) * 365;
            const position = calculateOrbitalPosition(t, this.keplerianElementsObject(neo));
            orbitPoints.push(position);
        }

        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: orbitColor, opacity: 0.5, transparent: true });
        this.currentOrbit = new THREE.Line(orbitGeometry, orbitMaterial);
        this.scene.add(this.currentOrbit);
    }

    private getOrbitalPeriod(a:number ): number {
        // Get the Keplerian elements for the object
       
      
        // The semi-major axis (a) is typically part of the Keplerian elements
        const semiMajorAxis =  a; // Assuming 'a' is the semi-major axis in AU
      
        // Calculate the orbital period using Kepler's Third Law
        const orbitalPeriodInYears = Math.pow(semiMajorAxis, 1.5);
      
        // Convert orbital period to days (1 year = 365 days)
        const orbitalPeriodInDays = orbitalPeriodInYears * 365;
      
        return orbitalPeriodInDays;
      }
      


      private drawOrbit(neo: NEOTypes, orbitColor: string) {

        if (this.currentOrbit) {
            this.scene.remove(this.currentOrbit);
            this.currentOrbit.geometry.dispose();
        }
   
        const orbitPoints: THREE.Vector3[] = [];    
        const keplerianElements = this.keplerianElementsObject(neo);        
        const totalSegments = this.calculateSegmentCount(keplerianElements.e, keplerianElements.a);            
        const orbitalPeriod = this.getOrbitalPeriod(keplerianElements.a);            
        let prevPosition = calculateOrbitalPosition(0, keplerianElements);
        orbitPoints.push(prevPosition);    
        for (let i = 1; i <= totalSegments; i++) {

            const t = (i / totalSegments) * orbitalPeriod;             
            const position = calculateOrbitalPosition(t, keplerianElements);
            const distance = position.distanceTo(prevPosition);         
            if (distance > 0.1) {   
                const midT = (i - 0.5) / totalSegments * orbitalPeriod;
                const midPosition = calculateOrbitalPosition(midT, keplerianElements);
                orbitPoints.push(midPosition);
            }
    
            orbitPoints.push(position);
            prevPosition = position;
        }
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: orbitColor, opacity: 0.5, transparent: true });
        this.currentOrbit = new THREE.Line(orbitGeometry, orbitMaterial);
        this.scene.add(this.currentOrbit);
    }
    
    

    private calculateSegmentCount(eccentricity: number, semiMajorAxis: number): number {
        let baseSegments = 800;
        if (eccentricity > 0.3) {
            baseSegments += Math.floor(eccentricity * 5000);   
        }
        if (semiMajorAxis > 5) {   
            baseSegments += Math.floor(semiMajorAxis * 2000);  
        }
        return Math.min(baseSegments, 10000);   
    }



}


