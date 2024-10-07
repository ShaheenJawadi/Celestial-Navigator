 "use client";
import { useEffect, useState } from "react"; 
import dynamic from 'next/dynamic';
import { NEOTypes } from "@/types/NEO";
import Papa from 'papaparse';
const Orrery = dynamic(() => import('../components/main'), { ssr: false });


export default function Home() {

  const [neos, setNeos] = useState<NEOTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch('data/asteroids.csv');  
        
        const csvData = await response.text();

     
        Papa.parse<NEOTypes>(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
             
            setNeos(results.data);
            setLoading(false);
          },
          error: (error:any) => { 
            setLoading(false);
          },
        });
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchCSVData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div  > 
      <Orrery NEOList={neos}  />
    </div>
  );
}
