import { keplerianElementsType, planetType } from '@/types/planet';
import { planetPosition } from '@/utils/keplerianElements';
import { PlanetRingGeomtry } from '@/utils/planetRing';
import { SATURN_RING_TEXTURE } from '@/utils/resourcePaths';
import { PLANET_SIZE_SCALE_FACTOR } from '@/utils/scaling';
import * as THREE from 'three';
import { Orbit } from './orbit';
import { CelestialObject } from './celestialObject';

export class PlanetManager extends CelestialObject {
  planets: THREE.Mesh[] = []; 
  planetData: planetType[];
  private static instance: PlanetManager;

 private constructor(scene: THREE.Scene, planetsData: planetType[], camera: THREE.Camera, openPopup: (name: string) => void) {
    super(scene, camera); 
 
    this.planetData = planetsData;
 
    this.planetData.forEach((planet) => {
      const { name, color, texture, radius, keplerianElements } = planet;
      const textureLoader = new THREE.TextureLoader();
      const texture3d = textureLoader.load(texture);

      const geometry = new THREE.SphereGeometry(radius * PLANET_SIZE_SCALE_FACTOR, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        map: texture3d,
        roughness: 1,
        metalness: 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = true;
      
      this.planets.push(mesh);
      scene.add(mesh);

      // Create rings for Saturn
      if (name === 'SATURN') {
        this.createRings(mesh, radius);
      }

      new Orbit(keplerianElements, color, 'PLANET').drawOrbit(scene);
      
      this.setupInteractions(mesh, name, openPopup);
    });
  }

  createRings(planetMesh: THREE.Mesh, radius: number) {
    const innerRadius = 1.15 * PLANET_SIZE_SCALE_FACTOR * radius;
    const outerRadius = 2.41 * PLANET_SIZE_SCALE_FACTOR * radius;
    const textureLoader = new THREE.TextureLoader();
    const geometry = new PlanetRingGeomtry(innerRadius, outerRadius, 42);

    geometry.rotateX(Math.PI / 2);
    geometry.rotateZ(THREE.MathUtils.degToRad(27));

    const texture = textureLoader.load(SATURN_RING_TEXTURE);
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    const ring = new THREE.Mesh(geometry, material);
    ring.position.set(0, 0, 0.1 * PLANET_SIZE_SCALE_FACTOR);

    ring.frustumCulled = true;
    planetMesh.add(ring);
  }

  setupInteractions(planetMesh: THREE.Mesh, planetName: string, openPopup: (name: string) => void) {
    window.addEventListener('click', (event: MouseEvent) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);

      const intersects = raycaster.intersectObjects([planetMesh]);
      if (intersects.length > 0) {
        this.onClickCamera(intersects[0].object);
        openPopup(planetName);
      }
    });
  }

  update(deltaTime: number) {
 

    // Update each planet's position
    this.planetData.forEach((planetData, index) => {
      const keplerianParams = this.getPlanetParams(deltaTime, planetData);
      const position = planetPosition(keplerianParams);
      this.planets[index].position.copy(position);
    });
  }

  getPlanetParams(year: number, planet: planetType) {
    const T = (year - 2451545.0) / 36525;
    const { a, e, I, L, longPeri, longNode } = planet.keplerianElements;
    const { a: aRate, e: eRate, I: IRate, L: LRate, longPeri: longPeriRate, longNode: longNodeRate } = planet.rates;

    const newA = a + aRate * T;
    const newE = e + eRate * T;
    const newI = I + IRate * T;
    const newL = L + LRate * T;
    const newLongPeri = longPeri + longPeriRate * T;
    const newLongNode = longNode + longNodeRate * T;

    return { a: newA, e: newE, I: newI, L: newL, longPeri: newLongPeri, longNode: newLongNode };
  }



  public static getInstance(scene: THREE.Scene, planetsData: planetType[], camera: THREE.Camera, openPopup: (name: string) => void): PlanetManager {
    if (!PlanetManager.instance) {
      PlanetManager.instance = new PlanetManager(scene, planetsData, camera, openPopup);
    }
    return PlanetManager.instance;
  }
}
