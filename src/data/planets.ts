import { planetType } from "@/types/planet";



const IMG_FOLDER= "/textures/planets/"

export const planetsList: planetType[] = [
    {
        name: "Earth",
        color:'#2e3b92',
        texture:IMG_FOLDER+"earth.jpg", 
        radius: 6371,

        keplerianElements:{
            a: 1.00000261, 
            e: 0.01671123,  
            I: -0.00001531 * (Math.PI / 180),  
            L: 100.46457166 * (Math.PI / 180),  
            longPeri: 102.93768193 * (Math.PI / 180),  
            longNode: 0.0 * (Math.PI / 180),  
          }

    },

    {
        name: "Mercury",
        color:'#b5b5b5',
        texture:IMG_FOLDER+"mercury.jpg", 
        radius: 2440,
        keplerianElements:{
            a: 0.38709927      , 
            e: 0.20563593 ,  
            I: 7.00497902 * (Math.PI / 180),  
            L:  252.25032350  * (Math.PI / 180),  
            longPeri:  77.45779628  * (Math.PI / 180),  
            longNode:48.33076593 * (Math.PI / 180),  
          }

    },

/* //////////////////// */

    {
        name: "Venus",
        color:'#e1d99f',
        texture:IMG_FOLDER+"venus.jpg", 
        radius: 6052,
        keplerianElements:{
            a:  0.72333566, 
            e:  0.00677672 ,  
            I: 3.39467605 * (Math.PI / 180),  
            L: 181.97909950  * (Math.PI / 180),  
            longPeri: 131.60246718 * (Math.PI / 180),  
            longNode: 76.67984255 * (Math.PI / 180),  
          }

    },



    {
        name: "Mars",
        color:'#c1440e',
        texture:IMG_FOLDER+"mars.jpg", 
        radius: 3390,
        keplerianElements:{
            a: 1.52371034 , 
            e: 0.09339410 ,  
            I:1.84969142 * (Math.PI / 180),  
            L:  -4.55343205* (Math.PI / 180),  
            longPeri:   -23.94362959 * (Math.PI / 180),  
            longNode:49.55953891 * (Math.PI / 180),  
          }

    },



    {
        name: "Jupiter",
        color:'#d2b48c',
        texture:IMG_FOLDER+"jupiter.jpg", 
        radius: 69911,
        keplerianElements:{
            a:5.20288700, 
            e:  0.04838624   ,  
            I: 1.30439695 * (Math.PI / 180),  
            L: 34.39644051 * (Math.PI / 180),  
            longPeri: 14.72847983 * (Math.PI / 180),  
            longNode: 100.47390909 * (Math.PI / 180),  
          }

    },




    {
        name: "Saturn",
        color:'#f8e48b',
        texture:IMG_FOLDER+"saturn.jpg", 
        radius: 58232,
        keplerianElements:{
            a:  9.53667594  , 
            e: 0.05386179 ,  
            I: 2.48599187   * (Math.PI / 180),  
            L:  49.95424423 * (Math.PI / 180),  
            longPeri: 92.59887831    * (Math.PI / 180),  
            longNode:  113.66242448 * (Math.PI / 180),  
          }

    },




    {
        name: "Uranus",
        color:'#b2ffff',
        texture:IMG_FOLDER+"uranus.jpg", 
        radius: 25362,
        keplerianElements:{
            a: 19.18916464, 
            e:0.04725744 ,  
            I:   0.77263783 * (Math.PI / 180),  
            L: 313.23810451  * (Math.PI / 180),  
            longPeri: 170.95427630  * (Math.PI / 180),  
            longNode: 74.01692503 * (Math.PI / 180),  
          }

    },




    {
        name: "Neptune",
        color:'#4166f5',
        texture:IMG_FOLDER+"neptune.jpg", 
        radius: 24622,
        keplerianElements:{
            a: 30.06992276, 
            e:0.00859048      ,  
            I: 1.77004347       * (Math.PI / 180),  
            L: -55.12002969* (Math.PI / 180),  
            longPeri: 44.96476227 * (Math.PI / 180),  
            longNode: 131.78422574* (Math.PI / 180),  
          }

    },


 
]