import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ReferralItem } from "./ReferralItem";
import classes from "./styles.module.css"
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllReferrals } from "../../api/referrals";
import { useQuery } from "react-query";



export default function Referrals() {


    const referralQuery = useQuery({
      queryKey: ["referrals"],
      queryFn: getAllReferrals,
    })
  
    if (referralQuery.status === "loading") return <h1>Loading...</h1>
    if (referralQuery.status === "error") {
      return <h1>{JSON.stringify(referralQuery.error)}</h1>
    }
  
    return (
      <>
      <div className={classes.colFlex}>
        <Link to="/create-referral" className={classes.createLink}>ADD NEW REFERRAL<FontAwesomeIcon icon={faFileImport} size="xl"/></Link>
      </div>
      <div className={classes.colFlex}>
          {referralQuery.data?.map(item  => (
            <ReferralItem key={item.id} referral={item}/>
          ))}
          {referralQuery.data?.length === 0 && <EmptyData />}
      </div>
      </>
    )
  }