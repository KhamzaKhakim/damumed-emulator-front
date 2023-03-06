import { AppointmentItem } from "./AppointmentItem";
import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import classes from "./styles.module.css"
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllAppointments } from "../../api/appointments";
import { useQuery } from "react-query";



export default function Appointments() {


    const appointmentsQuery = useQuery({
      queryKey: ["appointments"],
      queryFn: getAllAppointments,
    })
  
    if (appointmentsQuery.status === "loading") return <h1>Loading...</h1>
    if (appointmentsQuery.status === "error") {
      return <h1>{JSON.stringify(appointmentsQuery.error)}</h1>
    }
  
    return (
      <>
      <div className={classes.colFlex}>
        <Link to="/create-appointment" className={classes.createLink}>ADD NEW APPOINTMENT<FontAwesomeIcon icon={faFileImport} size="xl"/></Link>
      </div>
      <div className={classes.colFlex}>
          {appointmentsQuery.data?.map(item  => (
            <AppointmentItem key={item.provisionalAppointmentRecordID} appointment={item}/>
          ))}
          {appointmentsQuery.data?.length === 0 && <EmptyData />}
      </div>
      </>
    )
  }