export type NEOTypes = {
  spkid: string;           // SPK-ID: Unique identifier for the object
  H: string;               // Absolute magnitude
  diameter: string | null; // Diameter (nullable)
  albedo: string | null;   // Albedo (nullable)
  rot_per: string;         // Rotation period (days)
  GM: string | null;       // Gravitational parameter (nullable)
  BV: string | null;       // B-V color index (nullable)
  UB: string | null;       // U-B color index (nullable)
  IR: string | null;       // I-R color index (nullable)
  epoch: string;           // Epoch date (Julian Date)
  epoch_mjd: string;       // Modified Julian Date
  e: string;               // Eccentricity
  a: string;               // Semi-major axis (AU)
  q: string;               // Perihelion distance (AU)
  i: string;               // Inclination (degrees)
  om: string;              // Longitude of the ascending node (degrees)
  w: string;               // Argument of periapsis (degrees)
  ma: string;              // Mean anomaly (degrees)
  ad: string;              // Aphelion distance (AU)
  tp: string;              // Time of perihelion passage (Julian Date)
  per: string;          // Orbital period (days)
};
