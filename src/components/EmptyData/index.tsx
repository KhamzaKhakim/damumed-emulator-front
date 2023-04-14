import classes from "./styles.module.css";

export default function EmptyData() {
  return (
    <div className={classes.container}>
      <h2>The database is currently empty.</h2>
      <h2>Try adding new data.</h2>
    </div>
  );
}
