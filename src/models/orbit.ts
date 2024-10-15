// models/Orbit.ts
import * as THREE from 'three';
import { NEOTypes } from '@/types/NEO';
import { keplerianElementsType } from '@/types/planet';
import { calculateOrbitalPosition } from '@/utils/keplerianElements';

export class Orbit {
    private keplerianElements: keplerianElementsType;
    private orbitColor: string;
    private targetObject: "NEO" | "PLANET";
    private objectRef: THREE.Object3D | null = null;

    constructor(keplerianElements: keplerianElementsType, orbitColor: string, targetObject: "NEO" | "PLANET") {
        this.keplerianElements = keplerianElements;
        this.orbitColor = orbitColor;
        this.targetObject = targetObject;
    }
    private getOrbitalPeriod(): number {

        const semiMajorAxis = this.keplerianElements.a;
        const orbitalPeriodInYears = Math.pow(semiMajorAxis, 1.5);
        const orbitalPeriodInDays = orbitalPeriodInYears * 365;
        return orbitalPeriodInDays;
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


    drawOrbit() {
        if (this.targetObject === "NEO") {
            return this.drawNeoOrbit();
        } else {
            return this.createPlanetOrbit();
        }
    }


    private drawNeoOrbit() {
        const keplerianElements = this.keplerianElements;
        const orbitPoints: THREE.Vector3[] = [];
        const totalSegments = this.calculateSegmentCount(keplerianElements.e, keplerianElements.a);
        const orbitalPeriod = this.getOrbitalPeriod();
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
        const orbitMaterial = new THREE.LineBasicMaterial({ color: this.orbitColor, opacity: 0.5, transparent: true });
        return new THREE.Line(orbitGeometry, orbitMaterial);

    }



    private createPlanetOrbit() {



        const orbitPoints: THREE.Vector3[] = [];
        const totalSegments = 5000;
        const orbitalPeriod = this.getOrbitalPeriod();
        for (let i = 0; i <= totalSegments; i++) {
            const t = (i / totalSegments) * orbitalPeriod;
            const position = calculateOrbitalPosition(t, this.keplerianElements);
            orbitPoints.push(position);
        }

        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: this.orbitColor, opacity: 0.5, transparent: true });
        const currentOrbit = new THREE.Line(orbitGeometry, orbitMaterial);
        return currentOrbit;
    }


}
