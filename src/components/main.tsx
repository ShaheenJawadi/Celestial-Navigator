import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "./scene";
import { Planet } from "./planets/planet";
import { Sun } from "./stars/sun";
const Orrery = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = new SceneSetup();
  const planet = new Planet();
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
    scene.add(planet.getMesh());
 
    camera.position.z = 10;
 
    const handleResize = () => {
      sceneSetup.handleResize();
    };
    window.addEventListener("resize", handleResize);
 
    const animate = () => {
      requestAnimationFrame(animate); 
      planet.updatePosition(5); 
      controls.update();  
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [sceneSetup, planet, sun]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Orrery;
