import { planetType } from "@/types/planet";

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
            I: -0.00001531,
            L: 100.46457166,
            longPeri: 102.93768193,
            longNode: 0.0,
        },
        rates:{ 
            a: 0.00000562,
            e: -0.00004392,
            I: -0.01294668,
            L: 35999.37244981,
            longPeri: 0.32327364,
            longNode: 0.0,
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
            I: 7.00497902,
            L: 252.25032350,
            longPeri: 77.45779628,
            longNode: 48.33076593,
        },
        rates:{
            a: 0.00000037 ,
            e: 0.00001906 ,
            I:  -0.00594749,
            L: 149472.67411175,
            longPeri: 0.16047689,
            longNode: -0.12534081,
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
            I: 3.39467605,
            L: 181.97909950,
            longPeri: 131.60246718,
            longNode: 76.67984255,
        },
        rates:{ 
            a: 0.00000390,
            e: -0.00004107,
            I: -0.00078890,
            L: 58517.81538729,
            longPeri: 0.00268329,
            longNode: -0.27769418,
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
            I: 1.84969142,
            L: -4.55343205,
            longPeri: -23.94362959,
            longNode: 49.55953891,
        },
        rates:{
            a: 0.00001847,
            e: 0.00007882,
            I: -0.00813131,
            L: 19140.30268499,
            longPeri: 0.44441088,
            longNode: -0.29257343,
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
            I: 1.30439695,
            L: 34.39644051,
            longPeri: 14.72847983,
            longNode: 100.47390909,
        },
        rates:{
            a: -0.00011607,
            e: -0.00113671,
            I: -0.00183714,
            L: 3034.74612775,
            longPeri: 0.21252668,
            longNode: 0.20469106,

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
            I: 2.48599187,
            L: 49.95424423,
            longPeri: 92.59887831,
            longNode: 113.66242448,
        },
        rates:{
            a: -0.00125060,
            e: -0.00050991,
            I: 0.00193609,
            L: 1222.49362201,
            longPeri: -0.41897216,
            longNode: -0.28867794,
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
            I: 0.77263783,
            L: 313.23810451,
            longPeri: 170.95427630,
            longNode: 74.01692503,
        },
        rates:{
            a: -0.00196176,
            e: -0.00004397,
            I: -0.00242939,
            L: 428.48202785,
            longPeri: 0.40805281,
            longNode: 0.04240589,
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
            I: 1.77004347,
            L: -55.12002969,
            longPeri: 44.96476227,
            longNode: 131.78422574,
        },
        rates:{
            a: 0.00026291,
            e: 0.00005105,
            I: 0.00035372,
            L: 218.45945325,
            longPeri: -0.32241464,
            longNode: -0.00508664,
        }

    },



]