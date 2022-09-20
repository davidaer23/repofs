import axios from "axios";
import React from 'react';
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { addEntry, findPatient, useStateValue } from "../state";
import {  Patient } from "../types";

import DescriptionPatient from "./DescriptionPatient";
import AddEntryModal from "../AddEntryModal";
import { NewEntry } from "../types";

const InforPatient =  () => {
  
  const { id } = useParams<{ id: string }>();
  const url = id?`${apiBaseUrl}/patients/${id}`: apiBaseUrl;

  const [{patient}, dispatch] = useStateValue();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {

    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          url
        );
        dispatch(findPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
 
  const submitNewEntry = async (values: NewEntry) => {

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


  return (
      <div className="App">
        
        {
          Object.values(patient).map(patient => (<>
            <DescriptionPatient key={patient.id} {...patient} />
            <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
            <Button variant="contained" color="primary" onClick={() => openModal()} >
              ADD NEW ENTRY
             </Button>
             </>
          ))
        }
        
        
      </div>
    );
  };
export default InforPatient;