import { Link } from "react-router-dom";
import classes from "./styles.module.css";

export default function Navbar() {
    return (
        <div className={classes.navbar}>
            <Link to="/external-apps" className={classes.link}>External Apps</Link>
            <Link to="/external-app-sessions" className={classes.link}>Sessions</Link>
            <Link to="/posts" className={classes.link}>Posts</Link>
            <Link to="/appointments" className={classes.link}>Appointments</Link>
            <Link to="/referrals" className={classes.link}>Referrals</Link>
            <Link to="/referral-results" className={classes.link}>Referral Results</Link>
        </div>
    )
}