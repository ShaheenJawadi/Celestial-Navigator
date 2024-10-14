import React from "react";

import { sunInfo } from "@/data/sunInformations";
import Image from "next/image";
import { ObjectsImages } from "@/utils/resourcePaths";
const DisplayData = () => {
  return (
    <>
    
        <div className="footage">
          <Image
            src={ObjectsImages("sun")}
            width={350}
            height={350}
            alt="https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html"
          />
          <small>Source : NASA </small>
        </div>
 
      <div className="subDataSep">
        <div className="tit">Fun Facts</div>
        <div className="separator"></div>
      </div>
      <div className="funFacts">
        <ul>
          <li>
            The Sun is essentially a giant nuclear fusion reactor. Every second,
            it fuses 600 million tons of hydrogen into helium, producing the
            light and heat that powers life on Earth!
          </li>
          <li>
            The Sun is so massive that it contains 99.86% of the total mass of
            the entire Solar System! It could fit around 1.3 million Earths
            inside it.
          </li>
        </ul>
      </div>
      <div className="units">
        <small>*Only metric values are provided</small>
      </div>

      {Object.keys(sunInfo).map((key, index) => {
        return (
          <div key={index} className="dataBox">
            <div className="subDataSep">
              <div className="tit">{key}</div>
              <div className="separator"></div>
            </div>
            {sunInfo[key]?.data?.map((planet, index) => {
              return (
                <div key={index} className="single">
                  <h4>
                    {planet.label}: {"  "}
                  </h4>
                  <span>
                    {planet.metric.value}{" "}
                    <DisplayUnit unit={planet.metric.unit as string} />{" "}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="dataBox">
        <div style={{ marginTop: 10 }} className="single">
          <h4>source:</h4>
          <span>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html"
            >
              NASA Sun Fact Sheet
            </a>
          </span>
        </div>{" "}
      </div>
    </>
  );
};

const DisplayUnit = ({ unit }: { unit: string }) => {
  let addMultiple = " ";
  if (unit.startsWith("10")) {
    addMultiple = " x ";
  }
  return (
    <span>
      {addMultiple}
      <span dangerouslySetInnerHTML={{ __html: unit }} />{" "}
    </span>
  );
};

export default DisplayData;
