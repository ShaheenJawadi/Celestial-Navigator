import { planetInfoType } from "@/types/planet";
import { ObjectsImages } from "@/utils/resourcePaths";

/* source : https://nssdc.gsfc.nasa.gov/planetary/factsheet/  */
/* source : https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_british.html*/

export const planetsInformation: planetInfoType =
{
    "MERCURY": {
        image:{
            src: ObjectsImages("mercury"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html"
        },
       
        funfacts:  ["Mercury has no atmosphere, meaning temperatures can swing wildly from 430°C (800°F) during the day to -180°C (-290°F) at night.", "Mercury has ice! Despite being the closest planet to the Sun, scientists have found frozen water in permanently shadowed craters at its poles."], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "0.330",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "0.364",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "4879",
                    "unit": "km"
                },
                "us": {
                    "value": "3032",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "5429",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "339",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "3.7",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "12.1",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "4.3",
                    "unit": "km/s"
                },
                "us": {
                    "value": "2.7",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "1407.6",
                    "unit": "hours"
                },
                "us": {
                    "value": "1407.6",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "4222.6",
                    "unit": "hours"
                },
                "us": {
                    "value": "4222.6",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "57.9",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "36.0",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "46.0",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "28.6",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "69.8",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "43.4",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "88.0",
                    "unit": "days"
                },
                "us": {
                    "value": "88.0",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "47.4",
                    "unit": "km/s"
                },
                "us": {
                    "value": "29.4",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "7.0",
                    "unit": "degrees"
                },
                "us": {
                    "value": "7.0",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.206",
                    "unit": ""
                },
                "us": {
                    "value": "0.206",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "0.034",
                    "unit": "degrees"
                },
                "us": {
                    "value": "0.034",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "167",
                    "unit": "C"
                },
                "us": {
                    "value": "333",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "0",
                    "unit": "bars"
                },
                "us": {
                    "value": "0",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "0",
                    "unit": ""
                },
                "us": {
                    "value": "0",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            }
        ]
    },
    "VENUS": {
        image:{
            src: ObjectsImages("venus"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html"
        },
        funfacts:  ["Venus is often called Earth’s “sister planet” because of its similar size and composition. However, its surface is hot enough to melt lead due to the greenhouse effect, making it the hottest planet in the Solar System.", "Venus rotates backwards compared to most planets, so the Sun rises in the west and sets in the east! Its day is longer than its year."], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "4.87",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "5.37",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "12,104",
                    "unit": "km"
                },
                "us": {
                    "value": "7521",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "5243",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "327",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "8.9",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "29.1",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "10.4",
                    "unit": "km/s"
                },
                "us": {
                    "value": "6.4",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "-5832.5",
                    "unit": "hours"
                },
                "us": {
                    "value": "-5832.5",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "2802.0",
                    "unit": "hours"
                },
                "us": {
                    "value": "2802.0",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "108.2",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "67.2",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "107.5",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "66.8",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "108.9",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "67.7",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "224.7",
                    "unit": "days"
                },
                "us": {
                    "value": "224.7",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "35.0",
                    "unit": "km/s"
                },
                "us": {
                    "value": "21.8",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "3.4",
                    "unit": "degrees"
                },
                "us": {
                    "value": "3.4",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.007",
                    "unit": ""
                },
                "us": {
                    "value": "0.007",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "177.4",
                    "unit": "degrees"
                },
                "us": {
                    "value": "177.4",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "464",
                    "unit": "C"
                },
                "us": {
                    "value": "867",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "92",
                    "unit": "bars"
                },
                "us": {
                    "value": "91",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "0",
                    "unit": ""
                },
                "us": {
                    "value": "0",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            }
        ]
    },
    "EARTH": {
        image:{
            src: ObjectsImages("earth"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html"
        },
        funfacts:  ["Earth is the only planet in the Solar System known to have liquid water on its surface, which is essential for life as we know it.", "Earth's atmosphere contains just the right amount of oxygen (21%) for us to breathe. If it were much higher, fires could start much more easily, and if lower, life as we know it couldn’t exist."], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "5.97",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "6.58",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "12,756",
                    "unit": "km"
                },
                "us": {
                    "value": "7926",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "5514",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "344",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "9.8",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "32.1",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "11.2",
                    "unit": "km/s"
                },
                "us": {
                    "value": "7.0",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "23.9",
                    "unit": "hours"
                },
                "us": {
                    "value": "23.9",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "24.0",
                    "unit": "hours"
                },
                "us": {
                    "value": "24.0",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "149.6",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "93.0",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "147.1",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "91.4",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "152.1",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "94.5",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "365.2",
                    "unit": "days"
                },
                "us": {
                    "value": "365.2",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "29.8",
                    "unit": "km/s"
                },
                "us": {
                    "value": "18.5",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "0.0",
                    "unit": "degrees"
                },
                "us": {
                    "value": "0.0",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.017",
                    "unit": ""
                },
                "us": {
                    "value": "0.017",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "23.4",
                    "unit": "degrees"
                },
                "us": {
                    "value": "23.4",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "15",
                    "unit": "C"
                },
                "us": {
                    "value": "59",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "1",
                    "unit": "bars"
                },
                "us": {
                    "value": "1",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "1",
                    "unit": ""
                },
                "us": {
                    "value": "1",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            }
        ]
    },
    "MOON": {
        image:{
            src: ObjectsImages("moon"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html"
        },
        funfacts:  [], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "0.073",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "0.081",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "3475",
                    "unit": "km"
                },
                "us": {
                    "value": "2159",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "3340",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "209",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "1.6",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "5.3",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "2.4",
                    "unit": "km/s"
                },
                "us": {
                    "value": "1.5",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "655.7",
                    "unit": "hours"
                },
                "us": {
                    "value": "655.7",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "708.7",
                    "unit": "hours"
                },
                "us": {
                    "value": "708.7",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "0.384*",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "0.239*",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "0.363*",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "0.226*",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "0.406*",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "0.252*",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "27.3*",
                    "unit": "days"
                },
                "us": {
                    "value": "27.3*",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "1.0*",
                    "unit": "km/s"
                },
                "us": {
                    "value": "0.64*",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "5.1",
                    "unit": "degrees"
                },
                "us": {
                    "value": "5.1",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.055",
                    "unit": ""
                },
                "us": {
                    "value": "0.055",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "6.7",
                    "unit": "degrees"
                },
                "us": {
                    "value": "6.7",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "-20",
                    "unit": "C"
                },
                "us": {
                    "value": "-4",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "0",
                    "unit": "bars"
                },
                "us": {
                    "value": "0",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "0",
                    "unit": ""
                },
                "us": {
                    "value": "0",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            }
        ]
    },
    "MARS": {
        image:{
            src: ObjectsImages("mars"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html"
        },
        funfacts:  ["Mars has the tallest volcano in the Solar System, Olympus Mons, which is about three times the height of Mount Everest!", "Mars has seasons similar to Earth, but they last twice as long! This is because a Martian year is about 687 Earth days, meaning each season is more stretched out."], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "0.642",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "0.707",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "6792",
                    "unit": "km"
                },
                "us": {
                    "value": "4221",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "3934",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "246",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "3.7",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "12.1",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "5.0",
                    "unit": "km/s"
                },
                "us": {
                    "value": "3.1",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "24.6",
                    "unit": "hours"
                },
                "us": {
                    "value": "24.6",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "24.7",
                    "unit": "hours"
                },
                "us": {
                    "value": "24.7",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "228.0",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "141.6",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "206.7",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "128.4",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "249.3",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "154.9",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "687.0",
                    "unit": "days"
                },
                "us": {
                    "value": "687.0",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "24.1",
                    "unit": "km/s"
                },
                "us": {
                    "value": "15.0",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "1.8",
                    "unit": "degrees"
                },
                "us": {
                    "value": "1.8",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.094",
                    "unit": ""
                },
                "us": {
                    "value": "0.094",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "25.2",
                    "unit": "degrees"
                },
                "us": {
                    "value": "25.2",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "-65",
                    "unit": "C"
                },
                "us": {
                    "value": "-85",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "0.01",
                    "unit": "bars"
                },
                "us": {
                    "value": "0.01",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "2",
                    "unit": ""
                },
                "us": {
                    "value": "2",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "No",
                    "unit": ""
                },
                "us": {
                    "value": "No",
                    "unit": ""
                }
            }
        ]
    },
    "JUPITER": {
        image:{
            src: ObjectsImages("jupiter"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html"
        },
        funfacts:  ["Jupiter has 79 known moons, and its largest moon, Ganymede, is even bigger than Mercury! Ganymede is also the largest moon in the Solar System.", "Jupiter’s Great Red Spot is a giant storm that’s been raging for at least 350 years. It's so large that three Earths could fit inside it!"], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "1898",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "2092",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "142,984",
                    "unit": "km"
                },
                "us": {
                    "value": "88,846",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "1326",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "83",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "23.1",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "75.9",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "59.5",
                    "unit": "km/s"
                },
                "us": {
                    "value": "37.0",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "9.9",
                    "unit": "hours"
                },
                "us": {
                    "value": "9.9",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "9.9",
                    "unit": "hours"
                },
                "us": {
                    "value": "9.9",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "778.5",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "483.7",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "740.6",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "460.2",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "816.4",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "507.3",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "4331",
                    "unit": "days"
                },
                "us": {
                    "value": "4331",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "13.1",
                    "unit": "km/s"
                },
                "us": {
                    "value": "8.1",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "1.3",
                    "unit": "degrees"
                },
                "us": {
                    "value": "1.3",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.049",
                    "unit": ""
                },
                "us": {
                    "value": "0.049",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "3.1",
                    "unit": "degrees"
                },
                "us": {
                    "value": "3.1",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "-110",
                    "unit": "C"
                },
                "us": {
                    "value": "-166",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "Unknown*",
                    "unit": "bars"
                },
                "us": {
                    "value": "Unknown*",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "95",
                    "unit": ""
                },
                "us": {
                    "value": "95",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            }
        ]
    },
    "SATURN": {
        image:{
            src: ObjectsImages("saturn"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html"
        },
        funfacts:  ["If you could find a bathtub big enough, Saturn would float in it! Saturn’s density is lower than water, making it the only planet in the Solar System that would float.", "Saturn's rings are incredibly thin despite their size. They are only about 10 meters (30 feet) thick but stretch over 120,000 kilometers (75,000 miles) wide!"], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "568",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "626",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "120,536",
                    "unit": "km"
                },
                "us": {
                    "value": "74,897",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "687",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "43",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "9.0",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "29.4",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "35.5",
                    "unit": "km/s"
                },
                "us": {
                    "value": "22.1",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "10.7",
                    "unit": "hours"
                },
                "us": {
                    "value": "10.7",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "10.7",
                    "unit": "hours"
                },
                "us": {
                    "value": "10.7",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "1432.0",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "889.8",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "1357.6",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "843.5",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "1506.5",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "936.1",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "10,747",
                    "unit": "days"
                },
                "us": {
                    "value": "10,747",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "9.7",
                    "unit": "km/s"
                },
                "us": {
                    "value": "6.0",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "2.5",
                    "unit": "degrees"
                },
                "us": {
                    "value": "2.5",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.052",
                    "unit": ""
                },
                "us": {
                    "value": "0.052",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "26.7",
                    "unit": "degrees"
                },
                "us": {
                    "value": "26.7",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "-140",
                    "unit": "C"
                },
                "us": {
                    "value": "-220",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "Unknown*",
                    "unit": "bars"
                },
                "us": {
                    "value": "Unknown*",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "146",
                    "unit": ""
                },
                "us": {
                    "value": "146",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            }
        ]
    },
    "URANUS": {
        image:{
            src: ObjectsImages("uranus"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html"
        },
        funfacts:  ["Uranus is tipped over on its side, so it essentially rolls around the Sun! Its axis is tilted at 98 degrees, giving it extreme seasonal changes.", "Uranus is known as an 'ice giant' because its atmosphere contains a lot of icy materials like water, ammonia, and methane. The methane is what gives Uranus its distinctive blue-green color."], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "86.8",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "95.7",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "51,118",
                    "unit": "km"
                },
                "us": {
                    "value": "31,763",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "1270",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "79",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "8.7",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "28.5",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "21.3",
                    "unit": "km/s"
                },
                "us": {
                    "value": "13.2",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "-17.2",
                    "unit": "hours"
                },
                "us": {
                    "value": "-17.2",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "17.2",
                    "unit": "hours"
                },
                "us": {
                    "value": "17.2",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "2867.0",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "1781.5",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "2732.7",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "1698.0",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "3001.4",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "1865.0",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "30,589",
                    "unit": "days"
                },
                "us": {
                    "value": "30,589",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "6.8",
                    "unit": "km/s"
                },
                "us": {
                    "value": "4.2",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "0.8",
                    "unit": "degrees"
                },
                "us": {
                    "value": "0.8",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.047",
                    "unit": ""
                },
                "us": {
                    "value": "0.047",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "97.8",
                    "unit": "degrees"
                },
                "us": {
                    "value": "97.8",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "-195",
                    "unit": "C"
                },
                "us": {
                    "value": "-320",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "Unknown*",
                    "unit": "bars"
                },
                "us": {
                    "value": "Unknown*",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "28",
                    "unit": ""
                },
                "us": {
                    "value": "28",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            }
        ]
    },
    "NEPTUNE": {
        image:{
            src: ObjectsImages("neptune"),
            alt: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html"
        },
        funfacts:  ["Neptune is so far from the Sun that it takes 165 Earth years to complete one orbit. That means since its discovery in 1846, it’s only completed one full trip around the Sun!", "Neptune has the strongest winds in the Solar System, with speeds reaching up to 2,100 km/h (1,300 mph) — almost nine times faster than Earth's strongest hurricanes."], data: [
            {
                "label": "Mass",
                "metric": {
                    "value": "102",
                    "unit": "10<sup>24</sup>kg"
                },
                "us": {
                    "value": "113",
                    "unit": "10<sup>21</sup>tons"
                }
            },
            {
                "label": "Diameter",
                "metric": {
                    "value": "49,528",
                    "unit": "km"
                },
                "us": {
                    "value": "30,775",
                    "unit": "miles"
                }
            },
            {
                "label": "Density",
                "metric": {
                    "value": "1638",
                    "unit": "kg/m<sup>3</sup>"
                },
                "us": {
                    "value": "102",
                    "unit": "lbs/ft<sup>3</sup>"
                }
            },
            {
                "label": "Gravity",
                "metric": {
                    "value": "11.0",
                    "unit": "m/s<sup>2</sup>"
                },
                "us": {
                    "value": "36.0",
                    "unit": "ft/s<sup>2</sup>"
                }
            },
            {
                "label": "Escape Velocity",
                "metric": {
                    "value": "23.5",
                    "unit": "km/s"
                },
                "us": {
                    "value": "14.6",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Rotation Period",
                "metric": {
                    "value": "16.1",
                    "unit": "hours"
                },
                "us": {
                    "value": "16.1",
                    "unit": "hours"
                }
            },
            {
                "label": "Length of Day",
                "metric": {
                    "value": "16.1",
                    "unit": "hours"
                },
                "us": {
                    "value": "16.1",
                    "unit": "hours"
                }
            },
            {
                "label": "Distance from Sun",
                "metric": {
                    "value": "4515.0",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "2805.5",
                    "unit": "10<sup>6</sup>\n                        miles"
                }
            },
            {
                "label": "Perihelion",
                "metric": {
                    "value": "4471.1",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "2778.2",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Aphelion",
                "metric": {
                    "value": "4558.9",
                    "unit": "10<sup>6</sup> km"
                },
                "us": {
                    "value": "2832.7",
                    "unit": "10<sup>6</sup> miles"
                }
            },
            {
                "label": "Orbital Period",
                "metric": {
                    "value": "59,800",
                    "unit": "days"
                },
                "us": {
                    "value": "59,800",
                    "unit": "days"
                }
            },
            {
                "label": "Orbital Velocity",
                "metric": {
                    "value": "5.4",
                    "unit": "km/s"
                },
                "us": {
                    "value": "3.4",
                    "unit": "miles/s"
                }
            },
            {
                "label": "Orbital Inclination",
                "metric": {
                    "value": "1.8",
                    "unit": "degrees"
                },
                "us": {
                    "value": "1.8",
                    "unit": "degrees"
                }
            },
            {
                "label": "Orbital Eccentricity",
                "metric": {
                    "value": "0.010",
                    "unit": ""
                },
                "us": {
                    "value": "0.010",
                    "unit": ""
                }
            },
            {
                "label": "Obliquity to Orbit",
                "metric": {
                    "value": "28.3",
                    "unit": "degrees"
                },
                "us": {
                    "value": "28.3",
                    "unit": "degrees"
                }
            },
            {
                "label": "Mean Temperature",
                "metric": {
                    "value": "-200",
                    "unit": "C"
                },
                "us": {
                    "value": "-330",
                    "unit": "F"
                }
            },
            {
                "label": "Surface Pressure",
                "metric": {
                    "value": "Unknown*",
                    "unit": "bars"
                },
                "us": {
                    "value": "Unknown*",
                    "unit": "atmospheres"
                }
            },
            {
                "label": "Number of Moons",
                "metric": {
                    "value": "16",
                    "unit": ""
                },
                "us": {
                    "value": "16",
                    "unit": ""
                }
            },
            {
                "label": "Ring System?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            },
            {
                "label": "Global Magnetic Field?",
                "metric": {
                    "value": "Yes",
                    "unit": ""
                },
                "us": {
                    "value": "Yes",
                    "unit": ""
                }
            }
        ]
    }
}
