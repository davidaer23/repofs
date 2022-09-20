import diagnose from '../../data/diagnoses';
import { Diagnose} from '../types';

const getEntries = (): Array<Diagnose> => {
    return diagnose;
  }

  
  
  const addDiagnose = () => {
    return null;
  }
  
  export default {
    getEntries,
    addDiagnose
  };
