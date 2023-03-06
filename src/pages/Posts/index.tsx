import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { PostItem } from "./PostItem";
import classes from "./styles.module.css"
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllPosts } from "../../api/posts";
import { useQuery } from "react-query";



export default function PostsList() {


    const postsQuery = useQuery({
      queryKey: ["posts"],
      queryFn: getAllPosts,
    })
  
    if (postsQuery.status === "loading") return <h1>Loading...</h1>
    if (postsQuery.status === "error") {
      return <h1>{JSON.stringify(postsQuery.error)}</h1>
    }
  
    return (
      <>
      <div className={classes.colFlex}>
        <Link to="/create-post" className={classes.createLink}>ADD NEW POST<FontAwesomeIcon icon={faFileImport} size="xl"/></Link>
      </div>
      <div className={classes.colFlex}>
          {postsQuery.data?.map(item  => (
            <PostItem key={item.postIIN} post={item}/>
          ))}
          {postsQuery.data?.length === 0 && <EmptyData />}
      </div>
      </>
    )
  }