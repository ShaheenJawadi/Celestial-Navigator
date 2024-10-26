import { mdiCardSearchOutline, mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { SetStateAction, useState } from "react";

const SearchObject = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(searchTerm);
  };
  return (
    <div className="searchObject">
      <form className={"searchForm"} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for an object"
          value={searchTerm}
          onChange={handleInputChange}
          className={"searchInput"}
        />
        <button type="submit" className={"searchButton"}>
          <Icon path={mdiMagnify} size={1} />
        </button>
      </form>
      <small>
        *Search for planet and NEO by Designation or SPK-ID or Object full name
      </small>

      <div className="objList">
       <SingleSearchGrid kind="PHA"/>
       <SingleSearchGrid kind=""/>

       <SingleSearchGrid kind="COMET"/>
       <SingleSearchGrid kind="PHA"/>

      </div>

     
    </div>
  );
};

const SingleSearchGrid = ({kind} : {kind:string}) => {
  return (
    <div className={`singleObj ${kind}`}>
      <div className="dataBox g">
        <div className="single">
          <h4>SPK-ID:</h4>
          <span>dsfdsdfsdfs</span>
        </div>
        <div className="single">
          <h4>Object fullname:</h4>
          <span>dsfdsdfsdfs</span>
        </div>
        <div className="single">
          <h4>Primary designation:</h4>
          <span>dsfdsdfsdfs</span>
        </div>
      </div>
    </div>
  );
}
export default SearchObject;
