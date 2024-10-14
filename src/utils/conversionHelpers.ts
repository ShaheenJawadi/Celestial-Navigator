 
export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}


export function dateToJulian(date: Date): number {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth() is 0-indexed
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    // Calculate the Julian Date
    const A = Math.floor((14 - month) / 12);
    const y = year + 4800 - A;
    const m = month + 12 * A - 3;

    const julianDay = day + Math.floor((153 * m + 2) / 5) +
        365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    // Add fractional day
    const fractionalDay = (hour / 24) + (minute / 1440) + (second / 86400);
    
    return julianDay + fractionalDay;
}



  



export function julianToDate(julian: number): string {
    
    const julianDay = Math.floor(julian);
    const fractionalDay = julian - julianDay;

  
    const A = julianDay + 32044;
    const B = Math.floor((4 * A + 3) / 146097);
    const C = A - Math.floor((146097 * B) / 4);
    
    const D = Math.floor((4 * C + 3) / 1461);
    const E = C - Math.floor((1461 * D) / 4);
    const M = Math.floor((5 * E + 2) / 153);
    
   
    const day = E - Math.floor((153 * M + 2) / 5) + 1;
    const month = M + 3 - 12 * Math.floor(M / 10);
    const year = 100 * B + D - 4800 + Math.floor(M / 10);

 
    const dayFraction = fractionalDay * 24 * 60 * 60;  
    const hours = Math.floor(dayFraction / 3600);
    const minutes = Math.floor((dayFraction % 3600) / 60);
    const seconds = Math.floor(dayFraction % 60);

 
    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds)).toUTCString();

} 


export const AU_TO_KM = 149597870.7;  
export const KM_TO_MILES = 0.621371;  

 
function convertAU(au: number , unit:"us" | "metric"="us"): { num: number; st: string } {
  const kilometers = au * AU_TO_KM;

  const miles = kilometers * KM_TO_MILES;

  if(unit=="metric"){
    return { num: kilometers, st: kilometers+"km" };
  }
    return { num: miles, st: kilometers + "miles" };
 
}


 
function convertKmToMiles(km: number) {
   
   
      return { num: km*KM_TO_MILES, st: km*KM_TO_MILES+"km" };

   
   
  }

  function convertMilesToKm(miles: number ) {
    return { num: miles/KM_TO_MILES, st: miles/KM_TO_MILES+"miles" };
   
  }
  
  

