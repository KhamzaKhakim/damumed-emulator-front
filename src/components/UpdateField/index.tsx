import { ChangeEventHandler } from "react";
import classes from "./styles.module.css";


type propsValue = {
    name: string;
    value: string | number;
    type?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
  }

  
export default function UpdateField({name, value, type = "text", handleChange}: propsValue) {
    return (
        <div className={classes.inputFields}>
              <label>&quot;{name}&quot; : </label>
              <input defaultValue={value} type={type} name={name} onChange={handleChange}/>
        </div>
              
    )
}