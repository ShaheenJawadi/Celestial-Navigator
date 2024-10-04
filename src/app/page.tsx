 "use client";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
 
const Orrery = dynamic(() => import('../components/main'), { ssr: false });


export default function Home() {
  return (
    <div  > 
      <Orrery />
    </div>
  );
}
