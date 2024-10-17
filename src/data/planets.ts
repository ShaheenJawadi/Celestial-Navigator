import { planetType } from "@/types/planet";
import { degreesToRadians } from "@/utils/conversionHelpers";
 
import { IMG_FOLDER } from "@/utils/resourcePaths";




 

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
        },
        rates:{ 
            a: 0.00000562,
            e: -0.00004392,
            I: degreesToRadians(-0.01294668),
            L: degreesToRadians(35999.37244981),
            longPeri: degreesToRadians(0.32327364),
            longNode: degreesToRadians(0.0),
        }

    },

    {
        name: "MERCURY",
        color: '#b5b5b5',
        texture: IMG_FOLDER + "mercury.jpg",
        radius: 2440,
        keplerianElements: {
            a:  0.38709927,
            e: 0.20563593,
            I: degreesToRadians(7.00497902),
            L: degreesToRadians(252.25032350),
            longPeri: degreesToRadians(77.45779628),
            longNode: degreesToRadians(48.33076593),
        },
        rates:{
            a: 0.00000037 ,
            e: 0.00001906 ,
            I: degreesToRadians( -0.00594749),
            L: degreesToRadians(149472.67411175),
            longPeri: degreesToRadians(0.16047689),
            longNode: degreesToRadians(-0.12534081),
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
        },
        rates:{ 
            a: 0.00000390,
            e: -0.00004107,
            I: degreesToRadians(-0.00078890),
            L: degreesToRadians(58517.81538729),
            longPeri: degreesToRadians(0.00268329),
            longNode: degreesToRadians(-0.27769418),
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
        },
        rates:{
            a: 0.00001847,
            e: 0.00007882,
            I: degreesToRadians(-0.00813131),
            L: degreesToRadians(19140.30268499),
            longPeri: degreesToRadians(0.44441088),
            longNode: degreesToRadians(-0.29257343),
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
        },
        rates:{
            a: -0.00011607,
            e: -0.00113671,
            I: degreesToRadians(-0.00183714),
            L: degreesToRadians(3034.74612775),
            longPeri: degreesToRadians(0.21252668),
            longNode: degreesToRadians(0.20469106),

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
        },
        rates:{
            a: -0.00125060,
            e: -0.00050991,
            I: degreesToRadians(0.00193609),
            L: degreesToRadians(1222.49362201),
            longPeri: degreesToRadians(-0.41897216),
            longNode: degreesToRadians(-0.28867794),
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
        },
        rates:{
            a: -0.00196176,
            e: -0.00004397,
            I: degreesToRadians(-0.00242939),
            L: degreesToRadians(428.48202785),
            longPeri: degreesToRadians(0.40805281),
            longNode: degreesToRadians(0.04240589),
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
        },
        rates:{
            a: 0.00026291,
            e: 0.00005105,
            I: degreesToRadians(0.00035372),
            L: degreesToRadians(218.45945325),
            longPeri: degreesToRadians(-0.32241464),
            longNode: degreesToRadians(-0.00508664),
        }

    },



]