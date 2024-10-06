import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "./scene";
import { Planet } from "./planets/planet";
import { Sun } from "./stars/sun";
import { planetsList } from "@/data/planets";
import * as THREE from 'three';
const Orrery = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = new SceneSetup();
  
  const sun = new Sun();

  useEffect(() => {
    const { scene, camera, renderer } = sceneSetup;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;

    scene.add(sun.getMesh());
 
    const planets = planetsList.map(planetData => new Planet(scene, planetData.radius, planetData.texture, planetData.keplerianElements));
    camera.far = 10000;
    camera.position.set(0, 100, 200);
    

    const handleResize = () => {
      sceneSetup.handleResize();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.000000000000001; 

      planets.forEach(planet => planet.update(time));
      controls.update();
      renderer.render(scene, camera);
    };
    const gridHelper = new THREE.GridHelper(200, 10);
    scene.add(gridHelper);
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Orrery;
