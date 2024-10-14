import { NEOTypes } from "@/types/NEO";
import { convertAU, convertUSToMetricDistances, dateToJulian, julianToDate } from "@/utils/conversionHelpers";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { changeUnitSystem } from "@/store/generalState";
const DisplayData = ({
  neoData,
}: {
  neoData: { kind: string; objectData: NEOTypes };
}) => {
  const { kind, objectData } = neoData;
  const state = useSelector((state: RootState) => state.generalState);
  const dispatch = useDispatch<AppDispatch>();


  return (
    <>
    <div className="units">
        <button
          className={state.unitSystem == "us" ? "selected" : ""}
          onClick={() => dispatch(changeUnitSystem("us"))}
        >
          US
        </button>
        <button
          className={state.unitSystem == "metric" ? "selected" : ""}
          onClick={() => dispatch(changeUnitSystem("metric"))}
        >
          Metric
        </button>
      </div>
      <div className="dataBox">
        <div className="single">
          <h4>Object kind:</h4>
          <span>{kind}</span>
        </div>
        <>
          <div className="subDataSep">
            <div className="tit">Identification Information</div>
            <div className="separator"></div>
          </div>
          <div className="single">
            <h4>SPK-ID:</h4>
            <span>{objectData?.spkid}</span>
          </div>
          <div className="single">
            <h4>Object fullname:</h4>
            <span>{objectData?.full_name}</span>
          </div>
          <div className="single">
            <h4>Primary designation:</h4>
            <span>{objectData?.pdes}</span>
          </div>

          <div className="single">
            <h4>Orbit-ID:</h4>
            <span>{objectData?.orbit_id}</span>
          </div>
          <div className="single">
            <h4>Orbit Class:</h4>
            <span>{objectData?.class}</span>
          </div>
        </>

        <>
          <div className="subDataSep">
            <div className="tit">Observational Data</div>
            <div className="separator"></div>
          </div>

          <div className="single">
            <h4>Number of observations:</h4>
            <span>{objectData?.n_obs_used}</span>
          </div>
          <div className="single">
            <h4>Date of first observation:</h4>
            <span>{objectData?.first_obs}</span>
          </div>

          <div className="single">
            <h4>Date of last observation:</h4>
            <span>{objectData?.last_obs}</span>
          </div>

          <div className="single">
            <h4>Producer:</h4>
            <span>{objectData.producer}</span>
          </div>

          <div className="single">
            <h4>Diameter:</h4>
            <span>
              {objectData.diameter
                ? convertUSToMetricDistances(neoData?.objectData?.diameter ?? "0" ,"metric" , state.unitSystem).st 
                : "Data not available"}
            </span>
          </div>
        </>
        <>
          <div className="subDataSep">
            <div className="tit"> Distance and Critical Points</div>
            <div className="separator"></div>
          </div>

          <div className="single">
            <h4>Minimum Distance to Earth’s Orbit:</h4>
            <span>{convertAU(objectData.moid,state.unitSystem).st}</span>
          </div>

          <div className="single">
            <h4>Closest Distance to the Sun:</h4>
            <span> {convertAU(objectData.q,state.unitSystem).st}</span>
          </div>

          <div className="single">
            <h4>Farthest Distance from the Sun:</h4>
            
            <span> {convertAU(objectData.ad,state.unitSystem).st}</span>
          </div>

          <div className="single">
            <h4>Date of Closest Approach to Sun:</h4>
           
            <span>  {julianToDate(parseFloat(objectData.tp))}</span>
          </div>
        </>

        <>
          <div className="subDataSep">
            <div className="tit">More Informations</div>
            <div className="separator"></div>
          </div>

          <div className="single">
            <span>
              <a
                href={
                  "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr={" +
                  objectData?.spkid +
                  "}&view=VOPD"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {"https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr={" +
                  objectData?.spkid +
                  "}&view=VOPD"}
              </a>
            </span>
          </div>
        </>
      </div>
    </>
  );
};

export default DisplayData;
