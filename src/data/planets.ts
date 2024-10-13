import { planetType } from "@/types/planet";
import { degreesToRadians } from "@/utils/keplerianElements";



export const IMG_FOLDER = "./textures/planets/"
export const IMG_RING_FOLDER = "./textures/planets/rings/"


export const planetsList: planetType[] = [
    {
        name: "EARTH",
        color: '#2e3b92',
        texture: IMG_FOLDER + "earth.jpg",
        radius: 6371,

        keplerianElements: {
            a: 1.00000261,
            e: 0.01671123,
            I: degreesToRadians(-0.00001531),
            L: degreesToRadians(100.46457166),
            longPeri: degreesToRadians(102.93768193),
            longNode: degreesToRadians(0.0),
        }

    },

    {
        name: "MERCURY",
        color: '#b5b5b5',
        texture: IMG_FOLDER + "mercury.jpg",
        radius: 2440,
        keplerianElements: {
            a: 0.38709927,
            e: 0.20563593,
            I: degreesToRadians(7.00497902),
            L: degreesToRadians(252.25032350),
            longPeri: degreesToRadians(77.45779628),
            longNode: degreesToRadians(48.33076593),
        }

    },



    {
        name: "VENUS",
        color: '#e1d99f',
        texture: IMG_FOLDER + "venus.jpg",
        radius: 6052,
        keplerianElements: {
            a: 0.72333566,
            e: 0.00677672,
            I: degreesToRadians(3.39467605),
            L: degreesToRadians(181.97909950),
            longPeri: degreesToRadians(131.60246718),
            longNode: degreesToRadians(76.67984255),
        }

    },



    {
        name: "MARS",
        color: '#c1440e',
        texture: IMG_FOLDER + "mars.jpg",
        radius: 3390,
        keplerianElements: {
            a: 1.52371034,
            e: 0.09339410,
            I: degreesToRadians(1.84969142),
            L: degreesToRadians(-4.55343205),
            longPeri: degreesToRadians(-23.94362959),
            longNode: degreesToRadians(49.55953891),
        }

    },



    {
        name: "JUPITER",
        color: '#d2b48c',
        texture: IMG_FOLDER + "jupiter.jpg",
        radius: 69911,
        keplerianElements: {
            a: 5.20288700,
            e: 0.04838624,
            I: degreesToRadians(1.30439695),
            L: degreesToRadians(34.39644051),
            longPeri: degreesToRadians(14.72847983),
            longNode: degreesToRadians(100.47390909),
        }

    },




    {
        name: "SATURN",
        color: '#f8e48b',
        texture: IMG_FOLDER + "saturn.jpg",
        radius: 58232,
        keplerianElements: {
            a: 9.53667594,
            e: 0.05386179,
            I: degreesToRadians(2.48599187),
            L: degreesToRadians(49.95424423),
            longPeri: degreesToRadians(92.59887831),
            longNode: degreesToRadians(113.66242448),
        }

    },




    {
        name: "URANUS",
        color: '#b2ffff',
        texture: IMG_FOLDER + "uranus.jpg",
        radius: 25362,
        keplerianElements: {
            a: 19.18916464,
            e: 0.04725744,
            I: degreesToRadians(0.77263783),
            L: degreesToRadians(313.23810451),
            longPeri: degreesToRadians(170.95427630),
            longNode: degreesToRadians(74.01692503),
        }

    },




    {
        name: "NEPTUNE",
        color: '#4166f5',
        texture: IMG_FOLDER + "neptune.jpg",
        radius: 24622,
        keplerianElements: {
            a: 30.06992276,
            e: 0.00859048,
            I: degreesToRadians(1.77004347),
            L: degreesToRadians(-55.12002969),
            longPeri: degreesToRadians(44.96476227),
            longNode: degreesToRadians(131.78422574),
        }

    },



]