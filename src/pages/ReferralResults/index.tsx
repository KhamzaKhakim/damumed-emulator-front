import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { ReferralResultItem } from "./ReferralResultItem";
import classes from "./styles.module.css"
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllReferralResults } from "../../api/referralResults";
import { useQuery } from "react-query";
import { useState } from "react";



export default function ReferralResults() {

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;  

    const lastReferralResultIndex = currentPage * postsPerPage;
    const firstReferralResultIndex = lastReferralResultIndex - postsPerPage;


    const referralResultsQuery = useQuery({
      queryKey: ["referralResults"],
      queryFn: getAllReferralResults,
    })
  
    if (referralResultsQuery.status === "loading") return <h1>Loading...</h1>
    if (referralResultsQuery.status === "error") {
      return <h1>{JSON.stringify(referralResultsQuery.error)}</h1>
    }

    const currentReferralResults = referralResultsQuery.data?.slice(firstReferralResultIndex, lastReferralResultIndex);

    
    return (
      <>
      <div className={classes.colFlex}>
        <Link to="/create-referral-result" className={classes.createLink}>ADD NEW REFERRAL RSEULT<FontAwesomeIcon icon={faFileImport} size="xl"/></Link>
      </div>
      <div className={classes.colFlex}>
          {currentReferralResults?.map(item  => (
            <ReferralResultItem key={item.id} refferralResult={item}/>
          ))}
          {referralResultsQuery.data?.length === 0 && <EmptyData />}
      </div>
      <Pagination
                totalPosts={referralResultsQuery.data?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
      </>
    )
  }