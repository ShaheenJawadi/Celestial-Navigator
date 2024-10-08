 "use client";
import { useEffect, useState } from "react"; 
import dynamic from 'next/dynamic';
import { NEOTypes } from "@/types/NEO";
import Papa from 'papaparse';
const Orrery = dynamic(() => import('../components/main'), { ssr: false });


export default function Home() {

  const [neas, setNeas] = useState<NEOTypes[]>([]);
  const [phas, setPhas] = useState<NEOTypes[]>([]);
  const [comets, setComets] = useState<NEOTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCSVData = async (filePath: string) => {
      const response = await fetch(filePath);
      const csvData = await response.text();
      return new Promise<NEOTypes[]>((resolve, reject) => {
        Papa.parse<NEOTypes>(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (err: any) => reject(err),
        });
      });
    };
  
    const fetchAllData = async () => {
      try {
        const [neaData, phaData, cometData] = await Promise.all([
          fetchCSVData('data/nea.csv'),
          fetchCSVData('data/pha.csv'),
          fetchCSVData('data/comets.csv'),
        ]);
        
        setNeas(neaData);
        setPhas(phaData);
        setComets(cometData);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };
  
    fetchAllData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div  > 
      <Orrery NEOList={neas}  />
    </div>
  );
}
