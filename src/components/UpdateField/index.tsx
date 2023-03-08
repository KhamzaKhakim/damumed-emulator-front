import { ChangeEventHandler } from "react";
import classes from "./styles.module.css";


type propsValue = {
    name: string;
    value: string | number | boolean;
    type?: string;
    readonly?: boolean;
    handleChange: ChangeEventHandler<HTMLInputElement>;
  }

  
export default function UpdateField({name, value, type = "text", readonly = false,  handleChange}: propsValue) {
    if(type === "boolean") {
        return (
            <div className={classes.inputFields}>
              <label>&quot;{name}&quot; : </label>
              <input type="radio" name={name} value="true" id="true" checked={value == true || value === "true"} onChange={handleChange}/>
              <label htmlFor="true" className={classes.booleanLabel}>True</label>
              <input type="radio" name={name} value="false" id="false" checked={value === false || value === "false"} onChange={handleChange}/>
              <label htmlFor="false" className={classes.booleanLabel}>False</label>
        </div>
        )
    }

    return (
        <div className={classes.inputFields}>
              <label>&quot;{name}&quot; : </label>
              <input defaultValue={value} type={type} name={name} onChange={handleChange} readOnly={readonly}/>
        </div>
              
    )
}