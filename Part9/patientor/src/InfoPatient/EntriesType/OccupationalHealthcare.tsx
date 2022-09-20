import { OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = (entry: OccupationalHealthcareEntry) => {
  return (
    <div> 
    {entry.date} <WorkIcon /> <b>{entry.employerName}</b> <br />
    <i>{entry.description}</i>
  </div>
  );
};

export default OccupationalHealthcare;