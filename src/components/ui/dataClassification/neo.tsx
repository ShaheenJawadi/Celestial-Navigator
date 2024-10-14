import { NEOTypes } from "@/types/NEO";

const DisplayData = ({ neoData }: {neoData:{kind:string,objectData:NEOTypes}}) => {
  return (
    <>
      
      <div className="dataBox">
        <div className="single">
          
          <span>{neoData?.kind}</span>
        </div>
       
      </div>
    </>
  );
};

export default DisplayData;
