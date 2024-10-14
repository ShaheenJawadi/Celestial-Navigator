 
import { keplerianElementsType, planetType } from '@/types/planet';
import { calculateOrbitalPosition } from '@/utils/keplerianElements';
import { PlanetRingGeomtry } from '@/utils/planetRing';
import { SATURN_RING_TEXTURE } from '@/utils/resourcePaths';
import { DISTANCE_SCALE_FACTOR, ORBIT_SEGMENTS, PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';




export class Planet {
  mesh: THREE.Mesh;
  currentTime: number = 0;
  keplerianElements: keplerianElementsType;
  planetData: planetType;
  orbitLine: THREE.Line;
  ring: THREE.Mesh | null = null; // Added for rings

  constructor(scene: THREE.Scene, data: planetType, camera: THREE.Camera, openPopup: () => void) {
    const { name, color, texture, radius, keplerianElements } = data;
    this.keplerianElements = keplerianElements;
    this.planetData = data;

    const textureLoader = new THREE.TextureLoader();
    const texture3d = textureLoader.load(texture);

    const geometry = new THREE.SphereGeometry(radius * PLANET_SIZE_SCALE_FACTOR, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      map: texture3d,
      roughness: 1,
      metalness: 0,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    scene.add(this.mesh);
    if (name === 'SATURN') {
      this.createRings(radius);
    }

    this.orbitLine = this.createOrbit();
    scene.add(this.orbitLine);
    this.setupInteractions(scene, camera, openPopup);
  }
  createRings(radius: number) {

    const innerRadius = 1.15 * PLANET_SIZE_SCALE_FACTOR * radius;
    const outerRadius = 2.41 * PLANET_SIZE_SCALE_FACTOR * radius;
    const textureLoader = new THREE.TextureLoader();



    const geometry = new PlanetRingGeomtry(
      innerRadius,
      outerRadius,
      42,
    );
    geometry.rotateX(Math.PI / 2);
    geometry.rotateZ(THREE.MathUtils.degToRad(27));
    const texture = textureLoader.load(SATURN_RING_TEXTURE);


    const material = new THREE.MeshLambertMaterial({
      map: texture,

      side: THREE.DoubleSide,
    });

    const ring = new THREE.Mesh(geometry, material);
    ring.position.set(0, 0, 0.1 * PLANET_SIZE_SCALE_FACTOR);



    this.mesh.add(ring);
  }








  setupInteractions(scene: THREE.Scene, camera: THREE.Camera, openPopup: () => void) {
    window.addEventListener('click', (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([this.mesh]);

      if (intersects.length > 0) {
        openPopup();
      }
    });
  }
  update(deltaTime: number) {


    // Update the planet position
    const position = calculateOrbitalPosition(deltaTime, this.keplerianElements);
    this.mesh.position.copy(position);
  }



  createOrbit() {
    const { a, e, I, longPeri, longNode } = this.keplerianElements;
    const orbitPoints = [];

    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
      const trueAnomaly = (i / ORBIT_SEGMENTS) * 2 * Math.PI;
      const r = a * (1 - e * Math.cos(trueAnomaly));


      const x = r * Math.cos(trueAnomaly + longPeri);
      const y = r * Math.sin(trueAnomaly + longPeri);
      const z = y * Math.sin(I);
      const yInclined = y * Math.cos(I);


      const xFinal = x * Math.cos(longNode) - yInclined * Math.sin(longNode);
      const yFinal = x * Math.sin(longNode) + yInclined * Math.cos(longNode);

      orbitPoints.push(new THREE.Vector3(xFinal * DISTANCE_SCALE_FACTOR, z * DISTANCE_SCALE_FACTOR, yFinal * DISTANCE_SCALE_FACTOR));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: this.planetData.color, linewidth: 0.1 });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);

    return orbitLine;
  }
}


