import { gsap } from 'gsap';
import * as THREE from 'three';

import { keplerianElementsType, planetType } from '@/types/planet';
import { calculateOrbitalPosition } from '@/utils/keplerianElements';
import { Orbit } from './orbit';

export class CelestialObject { 
  protected camera: THREE.Camera;
  protected scene: THREE.Scene; 

  constructor(scene: THREE.Scene, camera: THREE.Camera ) {
    this.scene = scene;
    this.camera = camera; 
  }
  onClickCamera = (mesh: THREE.Object3D<THREE.Object3DEventMap> | THREE.Vector3, isNEO: boolean = false) => {
    if (isNEO && mesh instanceof THREE.Vector3) { 
        const ripplePosition = mesh.clone();  
 
        const geometry = new THREE.RingGeometry(1, 1.2, 32);   
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,   
            transparent: true,
            opacity: 0.6,     
            side: THREE.DoubleSide   
        });

        const ripple = new THREE.Mesh(geometry, material);
        ripple.position.set(ripplePosition.x, ripplePosition.y, ripplePosition.z);
        ripple.lookAt(this.camera.position);   

        this.scene.add(ripple);
 
        gsap.to(ripple.scale, {
            x: 10,   
            y: 10,  
            duration: 2,   
            ease: "power1.out"   
        });

        gsap.to(ripple.material, {
            opacity: 0,  
            duration: 2,
            ease: "power1.out",
            onComplete: () => {
                this.scene.remove(ripple);   
                ripple.geometry.dispose();   
                ripple.material.dispose();  
            }
        });
 
        const distance = 10;   
        const direction = new THREE.Vector3().subVectors(mesh, new THREE.Vector3(0, 0, 0)).normalize();
        const newPosition = direction.multiplyScalar(distance).add(mesh);

        gsap.to(this.camera.position, {
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z,
            duration: 1,
            onUpdate: () => {
                this.camera.lookAt(mesh);
            }
        });

    } else if (mesh instanceof THREE.Mesh) {
        // Handle Planet case (same as before)
        const box = new THREE.Box3().setFromObject(mesh);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        const maxSize = Math.max(size.x, size.y, size.z);
        const distance = maxSize * 2;

        const direction = new THREE.Vector3().subVectors(center, new THREE.Vector3(0, 0, 0)).normalize();
        const newPosition = direction.multiplyScalar(distance).add(center);

        const originalMaterial = mesh.material;
        const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        mesh.material = highlightMaterial;

        gsap.to(this.camera.position, {
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z,
            duration: 1,
            onUpdate: () => {
                this.camera.lookAt(center);
            },
            onComplete: () => {
                mesh.material = originalMaterial;
            }
        });
    } else {
        console.error("Unsupported object type for camera focus.");
    }
};

  
}