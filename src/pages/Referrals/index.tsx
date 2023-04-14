import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { ReferralItem } from "./ReferralItem";
import classes from "./styles.module.css";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllReferrals } from "../../api/referrals";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Referrals() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const lastReferralIndex = currentPage * postsPerPage;
  const firstReferralIndex = lastReferralIndex - postsPerPage;

  const referralQuery = useQuery({
    queryKey: ["referrals"],
    queryFn: getAllReferrals,
  });

  if (referralQuery.status === "loading") return <h1>Loading...</h1>;
  if (referralQuery.status === "error") {
    return <h1>Can not reach to backend</h1>;
  }

  const currentPosts = referralQuery.data?.slice(
    firstReferralIndex,
    lastReferralIndex
  );

  return (
    <>
      <div className={classes.colFlex}>
        <Link to="/create-referral" className={classes.createLink}>
          ADD NEW REFERRAL
          <FontAwesomeIcon icon={faFileImport} size="xl" />
        </Link>
      </div>
      <div className={classes.colFlex}>
        {currentPosts?.map((item) => (
          <ReferralItem key={item.id} referral={item} />
        ))}
        {referralQuery.data?.length === 0 && <EmptyData />}
      </div>
      <Pagination
        totalPosts={referralQuery.data?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
