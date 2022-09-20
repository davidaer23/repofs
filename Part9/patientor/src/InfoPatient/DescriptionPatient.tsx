import { Gender, Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Entries from "./Entries";

const DescriptionPatient = (patient: Patient) => {
    
    const setIconGender = (gender: Gender) => {
        switch(gender){
          case 'male':
            return <MaleIcon/>;
          case 'female':
            return <FemaleIcon/>;
          case 'other':
            return <TransgenderIcon/>;
          default:
            break;
        }
      };

  return (
    <div>
        <div key={patient.id}>
             
             <h1>{patient.name}   
             {
               setIconGender(patient.gender)
             }
             </h1>
             <p>ssn: {patient.ssn} <br />
             occupation: {patient.occupation}</p>
             {patient.entries.length === 0? null : 
             <>
              <b>entries</b>
              <Entries entries={patient.entries} />
             </>
             }
             
             </div>
    </div>
  );
};

export default DescriptionPatient;