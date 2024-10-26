import Image from "next/image";
import { RiseLoader } from "react-spinners";


const Loading = () => {
  return (
    <div className="loadingScreen">
      <Image src={"./logo.svg"} width={450} height={400} alt={"logo "} />

      <div className="loadingBox">
        <div className="loadingInd">
            <RiseLoader /> 
        </div>
        <div className="loadingMessage" >
        Gathering celestial body data ...
        </div>
     
      </div>
    </div>
  );
};

export default Loading;
