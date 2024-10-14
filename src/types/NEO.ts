export type NEOTypes = {
  spkid: string;           // SPK-ID: Unique identifier for the object
  full_name: string;       // Object full name
  orbit_id: string;        // Orbit ID
  diameter: string | null; // Diameter (nullable)
  producer: string;        // Producer: name of person or institution that produced the data
  first_obs: string;       // First observation date (UTC)
  last_obs: string;        // Last observation date (UTC)
  n_obs_used: string;      // Number of observations used
  class: string;       // object  class name
  pdes: string;            // Primary designation
  /* ******************* */

  e: string;               // Eccentricity
  a: string;               // Semi-major axis (AU)
  i: string;               // Inclination (degrees)
  om: string;              // Longitude of the ascending node (degrees)
  w: string;               // Argument of periapsis (degrees)
  ma: string;              // Mean anomaly (degrees)

  /* ******************* */
  q: string;               // Perihelion distance (AU)
  ad: string;              // Aphelion distance (AU)
  tp: string;              // Time of perihelion passage (Julian Date) 
  moid: string;               // earth min orbit(AU)
};
