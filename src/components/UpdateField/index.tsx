import { ChangeEventHandler } from "react";
import classes from "./styles.module.css";

type Props = {
  name: string;
  value?: string | number | boolean;
  type?: string;
  readonly?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function UpdateField({
  name,
  value,
  type = "text",
  readonly = false,
  onChange,
}: Props) {
  if (type === "boolean") {
    return (
      <div className={classes.inputFields}>
        <label>&quot;{name}&quot; : </label>
        <input
          type="radio"
          name={name}
          value="true"
          id="true"
          checked={value === true || value === "true"}
          onChange={onChange}
        />
        <label htmlFor="true" className={classes.booleanLabel}>
          True
        </label>
        <input
          type="radio"
          name={name}
          value="false"
          id="false"
          checked={value === false || value === "false"}
          onChange={onChange}
        />
        <label htmlFor="false" className={classes.booleanLabel}>
          False
        </label>
      </div>
    );
  }

  if (typeof value === "boolean") {
    value = value.toString();
  }

  return (
    <div className={classes.inputFields}>
      <label>&quot;{name}&quot; : </label>
      <input
        defaultValue={value}
        type={type}
        name={name}
        onChange={onChange}
        multiple
        readOnly={readonly}
      />
    </div>
  );
}
