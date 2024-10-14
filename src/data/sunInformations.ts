import { planetInfoType } from "@/types/planet";
/* source : https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html */

export const sunInfo: planetInfoType = {
    "Bulk Parameters": {
        data: [

            {
                label: "Mass",
                us: { value: "1,988,400", unit: "10<sup>24</sup> kg" },
                metric: { value: "1,988,400", unit: "10<sup>24</sup> kg" }
            },
            {
                label: "Volume",
                us: { value: "1,412,000", unit: "10<sup>12</sup> km<sup>3</sup>" },
                metric: { value: "1,412,000", unit: "10<sup>12</sup> km<sup>3</sup>" }
            },
            {
                label: "Mean Density",
                us: { value: "1,408", unit: "kg/m<sup>3</sup>" },
                metric: { value: "1,408", unit: "kg/m<sup>3</sup>" }
            },
            {
                label: "Surface Gravity",
                us: { value: "274", unit: "m/s<sup>2</sup>" },
                metric: { value: "274", unit: "m/s<sup>2</sup>" }
            },
            {
                label: "Escape Velocity",
                us: { value: "617.6", unit: "km/s" },
                metric: { value: "617.6", unit: "km/s" }
            },

        ]
    },
    "Ratio to Earth": {
        data: [{
            label: "Mass Ratio to Earth",
            us: { value: "332,900", unit: "ratio" },
            metric: { value: "332,900", unit: "ratio" }
        },
        {
            label: "Volume Ratio to Earth",
            us: { value: "1,304,000", unit: "ratio" },
            metric: { value: "1,304,000", unit: "ratio" }
        },
        {
            label: "Mean Density Ratio to Earth",
            us: { value: "0.255", unit: "ratio" },
            metric: { value: "0.255", unit: "ratio" }
        },
        {
            label: "Surface Gravity Ratio to Earth",
            us: { value: "28.0", unit: "ratio" },
            metric: { value: "28.0", unit: "ratio" }
        },
        {
            label: "Escape Velocity Ratio to Earth",
            us: { value: "55.2", unit: "ratio" },
            metric: { value: "55.2", unit: "ratio" }
        },]
    },
    "Rotational and Orbital parameters": {
        data: [{
            label: "Sidereal Rotation Period  ",
            us: { value: "609.12", unit: "hrs" },
            metric: { value: "609.12", unit: "hrs" }
        },

        {
            label: "Obliquity to Ecliptic ",
            us: { value: "7.25", unit: "degrees" },
            metric: { value: "7.25", unit: "degrees" }
        },
        ]
    },
    "Solar Atmosphere": {
        data: [{
            label: "Effective Temperature",
            us: { value: "5772", unit: "K" },
            metric: { value: "5772", unit: "K" }
        },
        {
            label: "Surface Gas Pressure",
            us: { value: "0.868", unit: "mb" },
            metric: { value: "0.868", unit: "mb" }
        },
        {
            label: "Hydrogen Composition",
            us: { value: "90.965", unit: "%" },
            metric: { value: "90.965", unit: "%" }
        },
        {
            label: "Helium Composition",
            us: { value: "8.889", unit: "%" },
            metric: { value: "8.889", unit: "%" }
        }]
    }
};