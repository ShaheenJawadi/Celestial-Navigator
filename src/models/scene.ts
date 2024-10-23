import * as THREE from 'three';
import { Orbit } from './orbit';
import { OrbitType } from '@/types/general';

export class SceneSetup {
  private static instance: SceneSetup;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  private constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      50000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  
    this.scene.add(ambientLight);

    console.log("SceneSetup constructor");
    document.addEventListener('fullscreenchange', this.handleResize.bind(this));
    document.addEventListener('webkitfullscreenchange', this.handleResize.bind(this));
    document.addEventListener('mozfullscreenchange', this.handleResize.bind(this));
    document.addEventListener('MSFullscreenChange', this.handleResize.bind(this));
  }
 
  public static getInstance(): SceneSetup {
    if (!SceneSetup.instance) {
      SceneSetup.instance = new SceneSetup();
    }
    return SceneSetup.instance;
  }

  getRenderer() {
    return this.renderer;
  }

  getCamera() {
    return this.camera;
  }

  getScene() {
    return this.scene;
  }

  handleResize() {
    if (!this.camera || !this.renderer) {
      console.error("resize prob");
      return;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
