"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { NEOTypes } from "@/types/NEO";

import Papa from "papaparse";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import { noRender } from "@/utils/focus";
import UIPanels from "@/components/ui";
import { setObjectsCount } from "@/store/generalState";
import Loading from "@/components/loading";

const Orrery = dynamic(() => import("../components/main"), { ssr: false });

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [neas, setNeas] = useState<NEOTypes[]>([]);
  const [phas, setPhas] = useState<NEOTypes[]>([]);
  const [comets, setComets] = useState<NEOTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState<boolean>(true);

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
          fetchCSVData("data/nea.csv"),
          fetchCSVData("data/pha.csv"),
          fetchCSVData("data/comets.csv"),
        ]);

        setNeas(neaData);
        setPhas(phaData);
        setComets(cometData);
        dispatch(
          setObjectsCount({
            asteroid: neaData.length,
            pha: phaData.length,
            comet: cometData.length,
          })
        );

        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const mergedNEO = useMemo(() => {
    const merged = [
      ...neas.map((item) => ({ ...item, neoKind: "ASTEROID" })),
      ...phas.map((item) => ({ ...item, neoKind: "PHA" })),
      ...comets.map((item) => ({ ...item, neoKind: "COMET" })),
    ] as NEOTypes[];
    setIsMerging(false);
    return merged as NEOTypes[];
  }, [neas, phas, comets]);
  return <Loading/>;
  if (loading || isMerging) {
    return <Loading/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {noRender ? (
 
        <div style={{ height: "100vh", width: "100vw" }}>noRender</div>
      ) : (
        <Orrery mergedNeo={mergedNEO} />
      )}
      <UIPanels />
    </div>
  );
}
