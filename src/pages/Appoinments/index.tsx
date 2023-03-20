import { AppointmentItem } from "./AppointmentItem";
import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import classes from "./styles.module.css"
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllAppointments } from "../../api/appointments";
import { useQuery } from "react-query";
import { useState } from "react";



export default function Appointments() {

  const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;  

    const lastAppointmentIndex = currentPage * postsPerPage;
    const firstAppointmentIndex = lastAppointmentIndex - postsPerPage;

    const appointmentsQuery = useQuery({
      queryKey: ["appointments"],
      queryFn: getAllAppointments,
    })
  
    if (appointmentsQuery.status === "loading") return <h1>Loading...</h1>
    if (appointmentsQuery.status === "error") {
      return <h1>Can not reach to backend</h1>
    }

    const currentAppointments = appointmentsQuery.data?.slice(firstAppointmentIndex, lastAppointmentIndex);

    return (
      <>
      <div className={classes.colFlex}>
        <Link to="/create-appointment" className={classes.createLink}>ADD NEW APPOINTMENT<FontAwesomeIcon icon={faFileImport} size="xl"/></Link>
      </div>
      <div className={classes.colFlex}>
          {currentAppointments?.map(item  => (
            <AppointmentItem key={item.provisionalAppointmentRecordID} appointment={item}/>
          ))}
          {appointmentsQuery.data?.length === 0 && <EmptyData />}
      </div>
      <Pagination
                totalPosts={appointmentsQuery.data?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
      </>
    )
  }