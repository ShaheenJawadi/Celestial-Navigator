import { useEffect, useRef, useCallback } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneSetup } from "../models/scene";
import { PlanetManager } from "../models/planet";
import { Sun } from "../models/sun";
import { planetsList } from "@/data/planets";
import { NEO } from "../models/neo";
import { NEOTypes } from "@/types/NEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { openPopup, openPopupAndAddOrbit ,setLandMarkUnit} from "@/store/generalState";
import { dateToJulian } from "@/utils/conversionHelpers";
import { ObjectsType } from "@/types/general";
import { keplerianElementsType } from "@/types/planet";
import { Orbit } from "@/models/orbit"; 
import * as THREE from 'three';

type Params = { 
  mergedNeo: NEOTypes[]; 
};

const Orrery = ({ mergedNeo }: Params) => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.generalState);

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneSetup = useRef(SceneSetup.getInstance());  
  const controlsRef = useRef<OrbitControls | null>(null);
  const sunRef = useRef<Sun | null>(null);
  const neoManagerRef = useRef<NEO | null>(null);
  const planetsRef = useRef<PlanetManager|null>(null);
  const orbitsRef = useRef<Orbit[]>([]); 
  const handleResize = sceneSetup.current.handleResize;
  let lastFrameTime = 0;
  const initializeScene = useCallback(() => {
    const { scene, camera, renderer } = sceneSetup.current;
 
    if (mountRef.current && !renderer.domElement.parentElement) {
      mountRef.current.appendChild(renderer.domElement);
    }
 
    sunRef.current =  Sun.getInstance(scene, camera, () =>
      dispatch(openPopup({ target: "SUN", identifier: "SUN" }))
    );
    planetsRef.current =   PlanetManager.getInstance(
      scene,
      planetsList,   
      camera,
      (name: string) => dispatch(openPopup({ target: "PLANET", identifier: name }))
    );
 
    neoManagerRef.current =  NEO.getInstance(
      scene,
      camera,
      mergedNeo,
      (kind: ObjectsType, objectData: NEOTypes, keplerianElements: keplerianElementsType) =>
        dispatch(
          openPopupAndAddOrbit({
            target: "NEO",
            identifier: objectData.full_name,
            neo: { kind, objectData, keplerianElements },
          })
        )
    );
 
    if (!camera.userData.initialized) {
      camera.position.set(0, 200, 500);  
      camera.lookAt(0, 0, 0);   
      dispatch(setLandMarkUnit( camera.position.length())); 
      camera.userData.initialized = true; 
    }
 
    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    controlsRef.current.enableDamping = true; 
    controlsRef.current.dampingFactor = 0.5; 
    controlsRef.current.enableZoom = true;
    controlsRef.current?.addEventListener('change', () => {
       
 
      const target = controlsRef.current?.target;
      if (target) {
        
        dispatch(setLandMarkUnit(camera.position.length())); 
      }
     
    });

    window.addEventListener("resize", sceneSetup.current.handleResize);
  }, [dispatch,mergedNeo]);


  const animate = useCallback(() => {
     const now = performance.now();
    if (now - lastFrameTime > 1000 / 30) { // Cap to 30 FPS
      lastFrameTime = now; 
      const { scene, camera, renderer } = sceneSetup.current;
  
    
      const time = dateToJulian(new Date()); 
      planetsRef.current?.update(time); 
      neoManagerRef.current?.update(time);
  
      controlsRef.current?.update();
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }, []);
 
  const drawOrbits = useCallback(() => {
    const { scene } = sceneSetup.current;

    orbitsRef.current.forEach((orbit) => orbit.removeOrbit(scene));
    orbitsRef.current = [];

    state.orbits.forEach((orbit) => {
      const orbitInstance = new Orbit(orbit.keplerianElements, orbit.orbitColor, orbit.targetObject);
      orbitInstance.drawOrbit(scene);
      orbitsRef.current.push(orbitInstance);  
    });
  }, [state.orbits]);
 
  useEffect(() => {
    initializeScene();
    animate();
    drawOrbits();  

    return () => {
      const { renderer } = sceneSetup.current;
      if (mountRef.current && renderer.domElement.parentElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
 
    };
  }, [initializeScene, animate, drawOrbits]);
  
  useEffect(() => {
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Orrery;
