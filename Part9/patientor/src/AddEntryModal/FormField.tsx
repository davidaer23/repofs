import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { Diagnosis} from "../types";
import { InputLabel } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import { SelectChangeEvent } from "@mui/material";

// structure of a single option
export type TypeOption = {
  value: string;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
  setType: any;
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props}   />;

export const SelectField = ({ name, label, options, setType}: SelectFieldProps) => {
//  const [value, setValue]= useState(" ");
  const handleType = (event: SelectChangeEvent)=>{
     /* eslint-disable */ 
    setType(event.target.value);
    // setValue(event.target.value);
    console.log(event.target.value);
    
  };
  return(
    <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
      onClick={handleType}
      
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value }
        </MenuItem>
      ))}
    
    </Field>
    
  </>
);
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {

  return (
    <div style={{ marginBottom: "1em" }}>
     
      <TextFieldMUI 
      fullWidth
      label={label}
        placeholder={String(min)}
         type="number" 
         {...field}
         inputProps={{ min: "0", max: max, step: min }} />

      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {    
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])} input={<Input />}>
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
