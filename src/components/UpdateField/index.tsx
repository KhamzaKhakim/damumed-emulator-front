import { ChangeEventHandler } from "react";
import classes from "./styles.module.css";


type propsValue = {
    name: string;
    value: string | number;
    type?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
  }

  
export default function UpdateField({name, value, type = "text", handleChange}: propsValue) {
    if(type === "boolean") {
        return (
            <div className={classes.inputFields}>
              <label>&quot;{name}&quot; : </label>
              <input defaultValue={value} type="radio" name={name} value="true" onChange={handleChange}/>
              <label className="classes.booleanLabel">True</label>
              <input defaultValue={value} type="radio" name={name} value="false" onChange={handleChange}/>
              <label className="classes.booleanLabel">False</label>
        </div>
        )
    }

    return (
        <div className={classes.inputFields}>
              <label>&quot;{name}&quot; : </label>
              <input defaultValue={value} type={type} name={name} onChange={handleChange}/>
        </div>
              
    )
}