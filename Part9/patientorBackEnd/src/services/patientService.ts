import patient from "../../data/patients";
import { v1 as uuid } from 'uuid';

import {  EntryWithoutId, NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";

const getEntries = (): Array<Patient> => {
    return patient;
}


const getNonSensitiveEntries = () : Array <NonSensitivePatientEntry> => {
    return patient.map(({id, name, dateOfBirth, gender, occupation, entries})=> ({
        id, name, dateOfBirth, gender, occupation, entries
    }))
}
  
const findById = (id: string): Patient | undefined => {
  const entry = patient.find(p => p.id === id);
  return entry;
}


const addedEntryPatient = (idPatient: string, entry: EntryWithoutId): Patient | undefined => {
  const patientFind = findById(idPatient);

   if(!patientFind) return undefined;

  switch (entry.type){
    case 'HealthCheck':
      if(entry.healthCheckRating<0 && entry.healthCheckRating>3) return undefined
      break
    case 'Hospital':
      if(!entry.discharge.criteria || !entry.discharge.date ) return undefined
      break
    case 'OccupationalHealthcare':
      if(!entry.employerName ) return undefined
      break
    default:
      return undefined
    
  }



   const idEntry = uuid(); 
  const newEntry = {
    id: idEntry,
    ...entry
  }

   patientFind.entries.push(newEntry)
   return patientFind
}
  
const addPatient = (entry: NewPatientEntry) => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
      entries: []
  };
  patient.push(newPatientEntry);
  return newPatientEntry;
}
  
  export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    addedEntryPatient,
    findById
  };
