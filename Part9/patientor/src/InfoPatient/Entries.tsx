import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { setDiagnosisList, useStateValue } from "../state";
import { Diagnosis, Entry} from "../types";
import HealtCheck from "./EntriesType/HealtCheck";
import OccupationalHealthcare from "./EntriesType/OccupationalHealthcare";
import HospitalEntryComponent from "./EntriesType/HospitalEntry";

interface Props {
  entries: Entry[];
}

const styleEntry = {
  border: "1px solid black",
   borderRadius: "10px" , 
   margin: "15px",
    padding:"0 10px"
};

const EntryDetails : React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "HealthCheck":
      return <HealtCheck {...entry}  />;
    case "Hospital":
      return <HospitalEntryComponent {...entry}  />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare {...entry}  />;
    default:
      return null;
  }
};


const Entries = ( {entries}: Props ) => {
  const [{diagnosis}, dispatch] = useStateValue();
  React.useEffect(() => {

      const fetchPatientList = async () => {
        try {
          const {data: diagnoseFromApi}  = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(setDiagnosisList(diagnoseFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
    }, [dispatch]);
  

  

  return (
    <div>
      
      {entries.map(
               e => <div  style={styleEntry} key={e.id} >
               <EntryDetails entry={e} />
               
                {e.diagnosisCodes ? <ul>
               {e.diagnosisCodes.map( 
                 code =>
                   (<li key={code} >{code} 
                     {
                      Object.values(diagnosis).find(
                         d => d.code===code
                         )?.name
                     } 
                       </li>
                       )
                     ) } </ul>
                     : null}
                  diagnose by {e.specialist}
                 </div>
               )}
          
    </div>
  );
};

export default Entries;