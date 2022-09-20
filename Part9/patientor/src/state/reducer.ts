import { State } from "./state";
import { Diagnosis,  Patient } from "../types";

export type typePatient = "ADD_PATIENT" | "FIND_PATIENT";

export type Action =
  {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    } | 
    {
      type: typePatient;
      payload: Patient;
    } |
    {
      type: "SET_DIAGNOSIS_LIST"; 
      payload: Diagnosis[];
    }
    |{
      type: "ADD_ENTRY"; 
      payload: Patient;
    };


 export const setPatientList = (listPatient: Patient[]) :Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: listPatient
  };
};

export const setDiagnosisList = (listDiagnosis: Diagnosis[]) :Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: listDiagnosis
  };
};

export const addPatient = (patient: Patient) :Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addEntry = (entry: Patient) :Action => {
  return {
    type: "ADD_ENTRY",
    payload: entry
  };
};

export const findPatient = (patient: Patient) :Action => {
  return {
    type: "FIND_PATIENT",
    payload: patient
  };
};





export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FIND_PATIENT":
      return{
        ...state,
        patient:{
          [action.payload.id]: action.payload
      }}
      ;
    case "ADD_ENTRY":
      
      return{
        ...state,
        patient:{
          [action.payload.id]: action.payload
      }}
      ;
    default:
      return state;
  }
};
