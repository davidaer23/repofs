import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, TypeOption, NumberField, DiagnosisSelection } from "./FormField";
import { NewEntry } from "../types";
// import { useStateValue } from "../state";
import { useState } from "react";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */


interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];


const formType = (entry: string) => {
  switch(entry){
    case "HealthCheck":
      return(
        <Field
              label="HealthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />);
    case "Hospital":
      return(<>
        <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      /><Field
      label="Criteria"
      placeholder="criteria"
      name="discharge.criteria"
      component={TextField}
    />
    </>) ;
    case "OccupationalHealthcare":
      return(<>
        <Field
      label="Employer Name"
      placeholder="Employer Name"
      name="employerName"
      component={TextField}
    />
        <Field
        label="Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      /><Field
      label="End Date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.endDate"
      component={TextField}
    />
    </>);
    default:
      return null;
  }
};


export const AddEntryForm = ({ onSubmit, onCancel}: Props) => {
  const [{ diagnosis }] = useStateValue();

  const [type, setType] = useState("");

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: type,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if(type==="Hospital" && !values.discharge?.criteria){
          errors.discharge = requiredError;
        }
        if(type==="Hospital" && !values.discharge?.date){
          errors.discharge = requiredError;
        }
        if(type==="OccupationalHealthcare" && !values.employerName){
          errors.employerName = requiredError;
        }
        

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          /> 
            
            <SelectField label="Type" name="type" options={typeOptions} setType={setType} />

            {formType(type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
