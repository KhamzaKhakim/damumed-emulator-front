import EmptyData from "../../components/EmptyData";
import { ExternalAppItem } from "./ExternalAppItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import classes from "./styles.module.css"
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllExternalApps } from "../../api/externalApps";
import { useQuery } from "react-query";
import { useState } from "react";



export default function ExternalApps() {

  const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;  

    const lastExternalAppIndex = currentPage * postsPerPage;
    const firstExternalAppIndex = lastExternalAppIndex - postsPerPage;

    const externalAppQuery = useQuery({
      queryKey: ["external_apps"],
      queryFn: getAllExternalApps,
    })
  
    if (externalAppQuery.status === "loading") return <h1>Loading...</h1>
    if (externalAppQuery.status === "error") {
      return <h1>{JSON.stringify(externalAppQuery.error)}</h1>
    }

    const currentExternalApps = externalAppQuery.data?.slice(firstExternalAppIndex, lastExternalAppIndex);

    return (
      <>
      <div className={classes.colFlex}>
        <Link to="/create-external-app" className={classes.createLink}>ADD NEW EXTERNAL APP<FontAwesomeIcon icon={faFileImport} size="xl"/></Link>
      </div>
      <div className={classes.colFlex}>
          {currentExternalApps?.map(item  => (
            <ExternalAppItem key={item.systemUsername} externalApp={item}/>
          ))}
          {externalAppQuery.data?.length === 0 && <EmptyData />}
      </div>
      <Pagination
                totalPosts={externalAppQuery.data?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
      </>
    )
  }