import { HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryComponent = (entry: HospitalEntry) => {
  return (
    <div>
      {entry.date} <LocalHospitalIcon /> <br />
    <i>{entry.description}</i> <br />
    <b>Discharge</b>
    <b>date: </b> {entry.discharge.date}
    <b>criteria: </b> {entry.discharge.criteria}
    </div>
  );
};

export default HospitalEntryComponent;